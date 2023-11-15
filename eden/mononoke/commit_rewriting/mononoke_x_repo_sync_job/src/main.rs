/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This software may be used and distributed according to the terms of the
 * GNU General Public License version 2.
 */

#![feature(auto_traits)]
#![feature(trait_alias)]

//! Mononoke Cross Repo sync job
//!
//! This is a special job used to tail "small" Mononoke repo into "large" Mononoke repo when
//! small repo is a source of truth (i.e. "hg push" go directly to small repo).
//! At the moment there two main limitations:
//! 1) Syncing of some merge commits is not supported
//! 2) Root commits and their descendants that are not merged into a main line
//! aren't going to be synced. For example,
//
//! ```text
//!   O <- main bookmark
//!   |
//!   O
//!   |   A <- new_bookmark, that added a new root commit
//!   O   |
//!    ...
//!
//!   Commit A, its ancestors and new_bookmark aren't going to be synced to the large repo.
//!   However if commit A gets merged into a mainline e.g.
//!   O <- main bookmark
//!   | \
//!   O  \
//!   |   A <- new_bookmark, that added a new root commit
//!   O   |
//!    ...
//!
//!   Then commit A and all of its ancestors WILL be synced to the large repo, however
//!   new_bookmark still WILL NOT be synced to the large repo.
//!
//! This job does tailing by following bookmark update log of the small repo and replaying
//! each commit into the large repo. Note that some bookmarks called "common_pushrebase_bookmarks"
//! are treated specially, see comments in the code for more details
//! ```

use std::collections::HashSet;
use std::sync::Arc;
use std::time::Duration;

use anyhow::anyhow;
use anyhow::format_err;
use anyhow::Error;
use anyhow::Result;
use backsyncer::format_counter as format_backsyncer_counter;
use bonsai_git_mapping::BonsaiGitMappingArc;
use bonsai_hg_mapping::BonsaiHgMappingArc;
use bookmarks::BookmarkKey;
use bookmarks::BookmarkUpdateLogRef;
use bookmarks::Freshness;
use cached_config::ConfigStore;
use changesets::ChangesetsArc;
use clap_old::ArgMatches;
use clientinfo::ClientEntryPoint;
use clientinfo::ClientInfo;
use cmdlib::args;
use cmdlib::args::MononokeMatches;
use cmdlib::helpers;
use cmdlib::monitoring;
use cmdlib_x_repo::create_commit_syncer_from_matches;
use commit_graph::CommitGraphArc;
use commit_graph::CommitGraphRef;
use context::CoreContext;
use context::SessionContainer;
use cross_repo_sync::types::Source;
use cross_repo_sync::CommitSyncer;
use cross_repo_sync::ConcreteRepo as CrossRepo;
use cross_repo_sync::PushrebaseRewriteDates;
use derived_data_utils::derive_data_for_csids;
use fbinit::FacebookInit;
use filenodes::FilenodesArc;
use futures::future;
use futures::future::try_join;
use futures::stream;
use futures::stream::TryStreamExt;
use futures::StreamExt;
use futures_stats::TimedFutureExt;
use live_commit_sync_config::CfgrLiveCommitSyncConfig;
use live_commit_sync_config::LiveCommitSyncConfig;
use metaconfig_types::CommitSyncConfigVersion;
use metadata::Metadata;
use mononoke_api_types::InnerRepo;
use mononoke_hg_sync_job_helper_lib::wait_for_latest_log_id_to_be_synced;
use mononoke_types::ChangesetId;
use mononoke_types::RepositoryId;
use mutable_counters::ArcMutableCounters;
use mutable_counters::MutableCountersArc;
use mutable_counters::MutableCountersRef;
use regex::Regex;
use repo_derived_data::RepoDerivedDataArc;
use repo_derived_data::RepoDerivedDataRef;
use repo_identity::RepoIdentityRef;
use scuba_ext::MononokeScubaSampleBuilder;
use slog::debug;
use slog::error;
use slog::info;
use slog::warn;
use synced_commit_mapping::SyncedCommitMapping;

use crate::sync::SyncResult;

mod cli;
mod reporting;
mod setup;
mod sync;

use crate::cli::create_app;
use crate::cli::ARG_BACKSYNC_BACKPRESSURE_REPOS_IDS;
use crate::cli::ARG_BOOKMARK_REGEX;
use crate::cli::ARG_CATCH_UP_ONCE;
use crate::cli::ARG_DERIVED_DATA_TYPES;
use crate::cli::ARG_HG_SYNC_BACKPRESSURE;
use crate::cli::ARG_INITIAL_IMPORT;
use crate::cli::ARG_NEW_BOOKMARK;
use crate::cli::ARG_ONCE;
use crate::cli::ARG_PUSHREBASE_REWRITE_DATES;
use crate::cli::ARG_SYNC_CONFIG_VERSION_NAME;
use crate::cli::ARG_TAIL;
use crate::cli::ARG_TARGET_BOOKMARK;
use crate::reporting::add_common_fields;
use crate::reporting::log_bookmark_update_result;
use crate::reporting::log_noop_iteration;
use crate::setup::get_scuba_sample;
use crate::setup::get_sleep_duration;
use crate::setup::get_starting_commit;
use crate::sync::sync_commit_and_ancestors;
use crate::sync::sync_commits_for_initial_import;
use crate::sync::sync_single_bookmark_update_log;

pub trait Repo = cross_repo_sync::Repo
    + RepoDerivedDataArc
    + RepoDerivedDataRef
    + ChangesetsArc
    + FilenodesArc
    + BonsaiHgMappingArc
    + BonsaiGitMappingArc
    + MutableCountersRef
    + RepoIdentityRef
    + CommitGraphRef
    + CommitGraphArc;

fn print_error(ctx: CoreContext, error: &Error) {
    error!(ctx.logger(), "{}", error);
    for cause in error.chain().skip(1) {
        error!(ctx.logger(), "caused by: {}", cause);
    }
}

async fn run_in_single_commit_mode<M: SyncedCommitMapping + Clone + 'static, R: Repo>(
    ctx: &CoreContext,
    bcs: ChangesetId,
    commit_syncer: CommitSyncer<M, R>,
    scuba_sample: MononokeScubaSampleBuilder,
    maybe_bookmark: Option<BookmarkKey>,
    common_bookmarks: HashSet<BookmarkKey>,
    pushrebase_rewrite_dates: PushrebaseRewriteDates,
) -> Result<(), Error> {
    info!(
        ctx.logger(),
        "Checking if {} is already synced {}->{}",
        bcs,
        commit_syncer.repos.get_source_repo().repo_identity().id(),
        commit_syncer.repos.get_target_repo().repo_identity().id()
    );
    if commit_syncer
        .commit_sync_outcome_exists(ctx, Source(bcs))
        .await?
    {
        info!(ctx.logger(), "{} is already synced", bcs);
        return Ok(());
    }

    let res = sync_commit_and_ancestors(
        ctx,
        &commit_syncer,
        None, // from_cs_id,
        bcs,
        maybe_bookmark,
        &common_bookmarks,
        scuba_sample,
        pushrebase_rewrite_dates,
        None,
    )
    .await;

    if res.is_ok() {
        info!(ctx.logger(), "successful sync");
    }
    res.map(|_| ())
}

/// Run the initial import of a small repo into a large repo.
/// It will sync a specific commit (i.e. head commit) and all of its ancestors
/// and optionally bookmark the head commit.
async fn run_in_initial_import_mode<M: SyncedCommitMapping + Clone + 'static, R: Repo>(
    ctx: &CoreContext,
    bcs: ChangesetId,
    commit_syncer: CommitSyncer<M, R>,
    config_version: CommitSyncConfigVersion,
    new_bookmark: Option<BookmarkKey>,
    scuba_sample: MononokeScubaSampleBuilder,
) -> Result<()> {
    info!(
        ctx.logger(),
        "Checking if {} is already synced {}->{}",
        bcs,
        commit_syncer.repos.get_source_repo().repo_identity().id(),
        commit_syncer.repos.get_target_repo().repo_identity().id()
    );
    if commit_syncer
        .commit_sync_outcome_exists(ctx, Source(bcs))
        .await?
    {
        info!(ctx.logger(), "{} is already synced", bcs);
        return Ok(());
    }

    let res = sync_commits_for_initial_import(
        ctx,
        &commit_syncer,
        scuba_sample,
        bcs,
        config_version,
        new_bookmark,
    )
    .await;

    if res.is_ok() {
        info!(ctx.logger(), "successful sync");
    }
    res.map(|_| ())
}

enum TailingArgs<M, R> {
    CatchUpOnce(CommitSyncer<M, R>),
    LoopForever(CommitSyncer<M, R>, ConfigStore),
}

async fn run_in_tailing_mode<M: SyncedCommitMapping + Clone + 'static, R: Repo>(
    ctx: &CoreContext,
    target_mutable_counters: ArcMutableCounters,
    common_pushrebase_bookmarks: HashSet<BookmarkKey>,
    base_scuba_sample: MononokeScubaSampleBuilder,
    backpressure_params: BackpressureParams,
    derived_data_types: Vec<String>,
    tailing_args: TailingArgs<M, R>,
    sleep_duration: Duration,
    maybe_bookmark_regex: Option<Regex>,
    pushrebase_rewrite_dates: PushrebaseRewriteDates,
) -> Result<(), Error> {
    match tailing_args {
        TailingArgs::CatchUpOnce(commit_syncer) => {
            let scuba_sample = MononokeScubaSampleBuilder::with_discard();
            tail(
                ctx,
                &commit_syncer,
                &target_mutable_counters,
                scuba_sample,
                &common_pushrebase_bookmarks,
                &backpressure_params,
                &derived_data_types,
                sleep_duration,
                &maybe_bookmark_regex,
                pushrebase_rewrite_dates,
            )
            .await?;
        }
        TailingArgs::LoopForever(commit_syncer, config_store) => {
            let live_commit_sync_config =
                Arc::new(CfgrLiveCommitSyncConfig::new(ctx.logger(), &config_store)?);
            let source_repo_id = commit_syncer.get_source_repo().repo_identity().id();

            loop {
                let scuba_sample = base_scuba_sample.clone();
                // We only care about public pushes because draft pushes are not in the bookmark
                // update log at all.
                let enabled =
                    live_commit_sync_config.push_redirector_enabled_for_public(source_repo_id);

                // Pushredirection is enabled - we need to disable forward sync in that case
                if enabled {
                    log_noop_iteration(scuba_sample);
                    tokio::time::sleep(sleep_duration).await;
                    continue;
                }

                let synced_something = tail(
                    ctx,
                    &commit_syncer,
                    &target_mutable_counters,
                    scuba_sample.clone(),
                    &common_pushrebase_bookmarks,
                    &backpressure_params,
                    &derived_data_types,
                    sleep_duration,
                    &maybe_bookmark_regex,
                    pushrebase_rewrite_dates,
                )
                .await?;

                if !synced_something {
                    log_noop_iteration(scuba_sample);
                    tokio::time::sleep(sleep_duration).await;
                }
            }
        }
    }

    Ok(())
}

async fn tail<M: SyncedCommitMapping + Clone + 'static, R: Repo>(
    ctx: &CoreContext,
    commit_syncer: &CommitSyncer<M, R>,
    target_mutable_counters: &ArcMutableCounters,
    mut scuba_sample: MononokeScubaSampleBuilder,
    common_pushrebase_bookmarks: &HashSet<BookmarkKey>,
    backpressure_params: &BackpressureParams,
    derived_data_types: &[String],
    sleep_duration: Duration,
    maybe_bookmark_regex: &Option<Regex>,
    pushrebase_rewrite_dates: PushrebaseRewriteDates,
) -> Result<bool, Error> {
    let source_repo = commit_syncer.get_source_repo();
    let bookmark_update_log = source_repo.bookmark_update_log();
    let counter = format_counter(commit_syncer);

    let maybe_start_id = target_mutable_counters.get_counter(ctx, &counter).await?;
    let start_id = maybe_start_id.ok_or_else(|| format_err!("counter not found"))?;
    let limit = 10;
    let log_entries = bookmark_update_log
        .read_next_bookmark_log_entries(ctx.clone(), start_id as u64, limit, Freshness::MaybeStale)
        .try_collect::<Vec<_>>()
        .await?;

    let remaining_entries = commit_syncer
        .get_source_repo()
        .bookmark_update_log()
        .count_further_bookmark_log_entries(ctx.clone(), start_id as u64, None)
        .await?;

    if log_entries.is_empty() {
        log_noop_iteration(scuba_sample.clone());
        Ok(false)
    } else {
        scuba_sample.add("queue_size", remaining_entries);
        info!(ctx.logger(), "queue size is {}", remaining_entries);

        for entry in log_entries {
            let entry_id = entry.id;
            scuba_sample.add("entry_id", entry.id);

            let mut skip = false;
            if let Some(regex) = maybe_bookmark_regex {
                if !regex.is_match(entry.bookmark_name.as_str()) {
                    skip = true;
                }
            }

            if !skip {
                let (stats, res) = sync_single_bookmark_update_log(
                    ctx,
                    commit_syncer,
                    entry,
                    common_pushrebase_bookmarks,
                    scuba_sample.clone(),
                    pushrebase_rewrite_dates,
                )
                .timed()
                .await;

                log_bookmark_update_result(ctx, entry_id, scuba_sample.clone(), &res, stats);
                let maybe_synced_css = res?;

                if let SyncResult::Synced(synced_css) = maybe_synced_css {
                    derive_data_for_csids(
                        ctx,
                        commit_syncer.get_target_repo(),
                        synced_css,
                        derived_data_types,
                    )?
                    .await?;

                    maybe_apply_backpressure(
                        ctx,
                        backpressure_params,
                        commit_syncer.get_target_repo(),
                        scuba_sample.clone(),
                        sleep_duration,
                    )
                    .await?;
                }
            } else {
                info!(
                    ctx.logger(),
                    "skipping log entry #{} for {}", entry.id, entry.bookmark_name
                );
                let mut scuba_sample = scuba_sample.clone();
                scuba_sample.add("source_bookmark_name", format!("{}", entry.bookmark_name));
                scuba_sample.add("skipped", true);
                scuba_sample.log();
            }

            // Note that updating the counter might fail after successful sync of the commits.
            // This is expected - next run will try to update the counter again without
            // re-syncing the commits.
            target_mutable_counters
                .set_counter(ctx, &counter, entry_id, None)
                .await?;
        }
        Ok(true)
    }
}

async fn maybe_apply_backpressure(
    ctx: &CoreContext,
    backpressure_params: &BackpressureParams,
    target_repo: &impl Repo,
    scuba_sample: MononokeScubaSampleBuilder,
    sleep_duration: Duration,
) -> Result<(), Error> {
    let target_repo_id = target_repo.repo_identity().id();
    let limit = 10;
    loop {
        let max_further_entries = stream::iter(&backpressure_params.backsync_repos)
            .map(Ok)
            .map_ok(|repo| {
                async move {
                    let repo_id = repo.repo_identity().id();
                    let backsyncer_counter = format_backsyncer_counter(&target_repo_id);
                    let maybe_counter = repo
                        .mutable_counters()
                        .get_counter(ctx, &backsyncer_counter)
                        .await?;

                    match maybe_counter {
                        Some(counter) => {
                            let bookmark_update_log = repo.bookmark_update_log();
                            debug!(ctx.logger(), "repo {}, counter {}", repo_id, counter);
                            bookmark_update_log
                                .count_further_bookmark_log_entries(
                                    ctx.clone(),
                                    counter as u64,
                                    None, // exclude_reason
                                )
                                .await
                        }
                        None => {
                            warn!(
                                ctx.logger(),
                                "backsyncer counter not found for repo {}!", repo_id,
                            );
                            Ok(0)
                        }
                    }
                }
            })
            .try_buffer_unordered(100)
            .try_fold(0, |acc, x| future::ready(Ok(::std::cmp::max(acc, x))))
            .await?;

        if max_further_entries > limit {
            reporting::log_backpressure(ctx, max_further_entries, scuba_sample.clone());
            tokio::time::sleep(sleep_duration).await;
        } else {
            break;
        }
    }

    if backpressure_params.wait_for_target_repo_hg_sync {
        wait_for_latest_log_id_to_be_synced(ctx, target_repo, sleep_duration).await?;
    }
    Ok(())
}

fn format_counter<M: SyncedCommitMapping + Clone + 'static, R: Repo>(
    commit_syncer: &CommitSyncer<M, R>,
) -> String {
    let source_repo_id = commit_syncer.get_source_repo_id();
    format!("xreposync_from_{}", source_repo_id)
}

async fn run<'a>(
    fb: FacebookInit,
    ctx: CoreContext,
    matches: &'a MononokeMatches<'a>,
) -> Result<(), Error> {
    let config_store = matches.config_store();
    let mut scuba_sample = get_scuba_sample(ctx.clone(), matches);

    let source_repo_id =
        args::not_shardmanager_compatible::get_source_repo_id(config_store, matches)?;
    let target_repo_id =
        args::not_shardmanager_compatible::get_target_repo_id(config_store, matches)?;

    let logger = ctx.logger();
    let source_repo = args::open_repo_with_repo_id(fb, logger, source_repo_id, matches);
    let target_repo = args::open_repo_with_repo_id(fb, logger, target_repo_id, matches);

    let (source_repo, target_repo): (InnerRepo, InnerRepo) =
        try_join(source_repo, target_repo).await?;

    let commit_syncer = create_commit_syncer_from_matches::<InnerRepo>(&ctx, matches, None).await?;

    let live_commit_sync_config = Arc::new(CfgrLiveCommitSyncConfig::new(logger, config_store)?);
    let common_commit_sync_config =
        live_commit_sync_config.get_common_config(source_repo.blob_repo.repo_identity().id())?;

    let pushrebase_rewrite_dates = if matches.is_present(ARG_PUSHREBASE_REWRITE_DATES) {
        PushrebaseRewriteDates::Yes
    } else {
        PushrebaseRewriteDates::No
    };

    let common_bookmarks: HashSet<_> = common_commit_sync_config
        .common_pushrebase_bookmarks
        .clone()
        .into_iter()
        .collect();

    let target_mutable_counters = target_repo.mutable_counters_arc();
    match matches.subcommand() {
        (ARG_ONCE, Some(sub_m)) => {
            add_common_fields(&mut scuba_sample, &commit_syncer);
            let maybe_target_bookmark = sub_m
                .value_of(ARG_TARGET_BOOKMARK)
                .map(BookmarkKey::new)
                .transpose()?;
            let bcs = get_starting_commit(&ctx, sub_m, source_repo.blob_repo.clone()).await?;

            run_in_single_commit_mode(
                &ctx,
                bcs,
                commit_syncer,
                scuba_sample,
                maybe_target_bookmark,
                common_bookmarks,
                pushrebase_rewrite_dates,
            )
            .await
        }
        (ARG_INITIAL_IMPORT, Some(sub_m)) => {
            add_common_fields(&mut scuba_sample, &commit_syncer);
            let sync_config_version_name = sub_m
                .value_of(ARG_SYNC_CONFIG_VERSION_NAME)
                .ok_or(anyhow!("Failed to get sync config version name from args"))?
                .to_string();
            let config_version = CommitSyncConfigVersion(sync_config_version_name);
            let maybe_new_bookmark = sub_m
                .value_of(ARG_NEW_BOOKMARK)
                .map(BookmarkKey::new)
                .transpose()?;

            let bcs = get_starting_commit(&ctx, sub_m, source_repo.blob_repo.clone()).await?;

            run_in_initial_import_mode(
                &ctx,
                bcs,
                commit_syncer,
                config_version,
                maybe_new_bookmark,
                scuba_sample,
            )
            .await
        }
        (ARG_TAIL, Some(sub_m)) => {
            add_common_fields(&mut scuba_sample, &commit_syncer);

            let sleep_duration = get_sleep_duration(sub_m)?;
            let tailing_args = if sub_m.is_present(ARG_CATCH_UP_ONCE) {
                TailingArgs::CatchUpOnce(commit_syncer)
            } else {
                let config_store = matches.config_store();

                TailingArgs::LoopForever(commit_syncer, config_store.clone())
            };

            let backpressure_params = BackpressureParams::new(&ctx, matches, sub_m).await?;

            let derived_data_types: Vec<String> = match sub_m.values_of(ARG_DERIVED_DATA_TYPES) {
                Some(derived_data_types) => derived_data_types
                    .into_iter()
                    .map(String::from)
                    .collect::<Vec<_>>(),
                None => vec![],
            };

            let maybe_bookmark_regex = match sub_m.value_of(ARG_BOOKMARK_REGEX) {
                Some(regex) => Some(Regex::new(regex)?),
                None => None,
            };

            run_in_tailing_mode(
                &ctx,
                target_mutable_counters,
                common_bookmarks,
                scuba_sample,
                backpressure_params,
                derived_data_types,
                tailing_args,
                sleep_duration,
                maybe_bookmark_regex,
                pushrebase_rewrite_dates,
            )
            .await
        }
        (incorrect, _) => Err(format_err!(
            "Incorrect mode of operation specified: {}",
            incorrect
        )),
    }
}

struct BackpressureParams {
    backsync_repos: Vec<CrossRepo>,
    wait_for_target_repo_hg_sync: bool,
}

impl BackpressureParams {
    async fn new<'a>(
        ctx: &CoreContext,
        matches: &'a MononokeMatches<'a>,
        sub_m: &'a ArgMatches<'a>,
    ) -> Result<Self, Error> {
        let backsync_repos_ids = sub_m.values_of(ARG_BACKSYNC_BACKPRESSURE_REPOS_IDS);
        let backsync_repos = match backsync_repos_ids {
            Some(backsync_repos_ids) => {
                let backsync_repos = stream::iter(backsync_repos_ids.into_iter().map(|repo_id| {
                    let repo_id = repo_id.parse::<i32>()?;
                    Ok(repo_id)
                }))
                .map_ok(|repo_id| {
                    args::open_repo_with_repo_id(
                        ctx.fb,
                        ctx.logger(),
                        RepositoryId::new(repo_id),
                        matches,
                    )
                })
                .try_buffer_unordered(100)
                .try_collect::<Vec<_>>();
                backsync_repos.await?
            }
            None => vec![],
        };

        let wait_for_target_repo_hg_sync = sub_m.is_present(ARG_HG_SYNC_BACKPRESSURE);
        Ok(Self {
            backsync_repos,
            wait_for_target_repo_hg_sync,
        })
    }
}

#[fbinit::main]
fn main(fb: FacebookInit) -> Result<()> {
    let app = create_app();
    let (matches, _runtime) = app.get_matches(fb)?;
    let logger = matches.logger();
    let mut metadata = Metadata::default();
    metadata.add_client_info(ClientInfo::default_with_entry_point(
        ClientEntryPoint::MegarepoForwardsyncer,
    ));
    let session = SessionContainer::builder(fb)
        .metadata(Arc::new(metadata))
        .build();
    let ctx = session.new_context_with_scribe(
        logger.clone(),
        MononokeScubaSampleBuilder::with_discard(),
        args::get_scribe(fb, &matches)?,
    );

    let res = helpers::block_execute(
        run(fb, ctx.clone(), &matches),
        fb,
        "x_repo_sync_job",
        ctx.logger(),
        &matches,
        monitoring::AliveService,
    );

    if let Err(ref err) = res {
        print_error(ctx, err);
    }
    res
}
