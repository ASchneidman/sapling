/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {CommitCloudSyncState, Hash, Result} from './types';

import serverAPI from './ClientToServerAPI';
import {Commit} from './Commit';
import {FlexSpacer} from './ComponentUtils';
import {ErrorNotice, InlineErrorBadge} from './ErrorNotice';
import {Tooltip} from './Tooltip';
import {T, t} from './i18n';
import {CommitCloudChangeWorkspaceOperation} from './operations/CommitCloudChangeWorkspaceOperation';
import {CommitCloudSyncOperation} from './operations/CommitCloudSyncOperation';
import {CommitPreview, treeWithPreviews, useMostRecentPendingOperation} from './previews';
import {RelativeDate} from './relativeDate';
import {useRunOperation} from './serverAPIState';
import {CommitCloudBackupStatus} from './types';
import {VSCodeButton, VSCodeDropdown, VSCodeOption} from '@vscode/webview-ui-toolkit/react';
import {useCallback, useEffect} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {Icon} from 'shared/Icon';
import {notEmpty} from 'shared/utils';

import './CommitCloud.css';

const cloudSyncStateAtom = atom<Result<CommitCloudSyncState> | null>({
  key: 'cloudSyncStateAtom',
  default: null,
  effects: [
    ({setSelf}) => {
      const disposable = serverAPI.onMessageOfType('fetchedCommitCloudState', event => {
        setSelf(event.state);
      });
      return () => disposable.dispose();
    },
  ],
});

const REFRESH_INTERVAL = 30 * 1000;

export function CommitCloudInfo() {
  const [cloudSyncState, setCloudSyncState] = useRecoilState(cloudSyncStateAtom);
  const runOperation = useRunOperation();
  const pendingOperation = useMostRecentPendingOperation();
  const isRunningSync = pendingOperation?.trackEventName === 'CommitCloudSyncOperation';
  const isLoading = cloudSyncState?.value?.isFetching === true;

  const refreshCommitCloudStatus = useCallback(() => {
    setCloudSyncState(old =>
      old?.value != null ? {value: {...old.value, isFetching: true}} : old,
    );
    serverAPI.postMessage({
      type: 'fetchCommitCloudState',
    });
  }, [setCloudSyncState]);

  useEffect(() => {
    const interval = setInterval(refreshCommitCloudStatus, REFRESH_INTERVAL);
    // also call immediately on mount
    refreshCommitCloudStatus();
    return () => clearInterval(interval);
  }, [refreshCommitCloudStatus]);

  return (
    <div className="commit-cloud-info">
      <div className="dropdown-fields-header commit-cloud-header">
        <Icon icon="cloud" size="M" />
        <strong role="heading">{<T>Commit Cloud</T>}</strong>
        <Tooltip
          title={t(
            'Commit Cloud backs up your draft commits automatically across all your devices.',
          )}>
          <Icon icon="info" />
        </Tooltip>
        {isLoading && <Icon icon="loading" />}
      </div>

      {cloudSyncState?.value?.syncError == null ? null : (
        <div className="commit-cloud-row">
          <InlineErrorBadge error={cloudSyncState?.value?.syncError}>
            <T>Failed to fetch commit cloud backup statuses</T>
          </InlineErrorBadge>
        </div>
      )}
      {cloudSyncState?.value?.workspaceError == null ? null : (
        <div className="commit-cloud-row">
          <InlineErrorBadge error={cloudSyncState?.value?.workspaceError}>
            <T>Failed to fetch commit cloud status</T>
          </InlineErrorBadge>
        </div>
      )}
      {cloudSyncState?.value?.commitStatuses == null ? null : (
        <CommitCloudSyncStatusBadge statuses={cloudSyncState?.value?.commitStatuses} />
      )}
      <div className="commit-cloud-row">
        {cloudSyncState == null ? (
          <Icon icon="loading" />
        ) : cloudSyncState.error != null ? (
          <ErrorNotice
            error={cloudSyncState.error}
            title={t('Failed to check Commit Cloud state')}
          />
        ) : cloudSyncState.value.lastBackup == null ? null : (
          <>
            <T
              replace={{
                $relTimeAgo: (
                  <Tooltip title={cloudSyncState.value.lastBackup.toLocaleString()}>
                    <RelativeDate date={cloudSyncState.value.lastBackup} />
                  </Tooltip>
                ),
              }}>
              Last meaningful sync: $relTimeAgo
            </T>
            <FlexSpacer />
            <VSCodeButton
              onClick={async () => {
                runOperation(new CommitCloudSyncOperation()).then(() => {
                  refreshCommitCloudStatus();
                });
              }}
              disabled={isRunningSync}
              appearance="secondary">
              {isRunningSync && <Icon icon="loading" slot="start" />}
              <T>Sync now</T>
            </VSCodeButton>
          </>
        )}
      </div>

      <div className="commit-cloud-row">
        {cloudSyncState?.value?.currentWorkspace == null ? null : (
          <div className="commit-cloud-dropdown-container">
            <label htmlFor="stack-file-dropdown">
              <T>Current Workspace</T>
            </label>
            <VSCodeDropdown
              value={cloudSyncState?.value.currentWorkspace}
              disabled={pendingOperation?.trackEventName === 'CommitCloudChangeWorkspaceOperation'}
              onChange={event => {
                const newChoice = (event.target as HTMLOptionElement).value;
                runOperation(new CommitCloudChangeWorkspaceOperation(newChoice)).then(() => {
                  refreshCommitCloudStatus();
                });
                if (cloudSyncState?.value) {
                  // optimistically set the workspace choice
                  setCloudSyncState({
                    value: {...cloudSyncState?.value, currentWorkspace: newChoice},
                  });
                }
              }}>
              {cloudSyncState?.value.workspaceChoices?.map(name => (
                <VSCodeOption key={name} value={name}>
                  {name}
                </VSCodeOption>
              ))}
            </VSCodeDropdown>
          </div>
        )}
      </div>
    </div>
  );
}

function CommitCloudSyncStatusBadge({statuses}: {statuses: Map<Hash, CommitCloudBackupStatus>}) {
  const statusValues = [...statuses.entries()];
  const pending = statusValues.filter(
    ([_hash, status]) =>
      status === CommitCloudBackupStatus.Pending || status === CommitCloudBackupStatus.InProgress,
  );
  const failed = statusValues.filter(
    ([_hash, status]) => status === CommitCloudBackupStatus.Failed,
  );

  let icon;
  let content;
  let renderTooltip;
  if (pending.length > 0) {
    icon = 'sync';
    content = <T count={pending.length}>commitsBeingBackedUp</T>;
    renderTooltip = () => <BackupList commits={pending.map(([hash]) => hash)} />;
  } else if (failed.length > 0) {
    icon = 'sync';
    content = (
      <div className="inline-error-badge">
        <span>
          <Icon icon="error" slot="start" />
          <T count={failed.length}>commitsFailedBackingUp</T>
        </span>
      </div>
    );
    renderTooltip = () => <BackupList commits={failed.map(([hash]) => hash)} />;
  } else {
    // Empty means all commits were backed up, since we don't fetch successfully backed up hashes.
    // Note: this does mean we can't tell the difference between a commit we don't know about and a commit that is backed up.
    icon = 'check';
    content = <T>All commits backed up</T>;
  }

  return (
    <div className="commit-cloud-row commit-cloud-sync-status-badge">
      {renderTooltip == null ? (
        <div>
          <Icon icon={icon} />
          {content}
        </div>
      ) : (
        <Tooltip component={renderTooltip}>
          <Icon icon={icon} />
          {content}
        </Tooltip>
      )}
    </div>
  );
}

function BackupList({commits}: {commits: Array<Hash>}) {
  const treeMap = useRecoilValue(treeWithPreviews).treeMap;
  const infos = commits.map(hash => treeMap.get(hash)?.info).filter(notEmpty);
  return (
    <div className="commit-cloud-backup-list">
      {infos.map(commit => (
        <Commit
          commit={commit}
          key={commit.hash}
          hasChildren={false}
          previewType={CommitPreview.NON_ACTIONABLE_COMMIT}
        />
      ))}
    </div>
  );
}