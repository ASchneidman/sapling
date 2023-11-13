/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This software may be used and distributed according to the terms of the
 * GNU General Public License version 2.
 */

//! Implement traits from other crates.

use async_trait::async_trait;
use futures::stream::BoxStream;
use futures::stream::StreamExt;
use hgstore::split_hg_file_metadata;
use hgstore::strip_hg_file_metadata;
use storemodel::types;
use storemodel::FileStore;
use storemodel::InsertOpts;
use storemodel::KeyStore;
use storemodel::SerializationFormat;
use storemodel::TreeStore;
use types::HgId;
use types::Key;
use types::RepoPath;

use crate::EagerRepoStore;

// storemodel traits

#[async_trait]
impl KeyStore for EagerRepoStore {
    fn get_local_content(
        &self,
        _path: &RepoPath,
        id: HgId,
    ) -> anyhow::Result<Option<minibytes::Bytes>> {
        match self.get_content(id)? {
            Some(data) => Ok(Some(split_hg_file_metadata(&data)?.0)),
            None => Ok(None),
        }
    }

    fn insert_data(
        &self,
        mut opts: InsertOpts,
        _path: &RepoPath,
        data: &[u8],
    ) -> anyhow::Result<HgId> {
        let mut sha1_data = Vec::with_capacity(data.len() + HgId::len() * 2);

        // Calculate the "hg" text: sorted([p1, p2]) + data
        opts.parents.sort_unstable();
        let mut iter = opts.parents.iter().rev();
        let p2 = iter.next().copied().unwrap_or_else(|| *HgId::null_id());
        let p1 = iter.next().copied().unwrap_or_else(|| *HgId::null_id());
        sha1_data.extend_from_slice(p1.as_ref());
        sha1_data.extend_from_slice(p2.as_ref());
        sha1_data.extend_from_slice(data);
        drop(iter);

        if let Some(id) = opts.forced_id {
            let id = *id;
            self.add_arbitrary_blob(id, &sha1_data)?;
            Ok(id)
        } else {
            let id = self.add_sha1_blob(&sha1_data, &opts.parents)?;
            Ok(id)
        }
    }

    fn flush(&self) -> anyhow::Result<()> {
        let mut inner = self.inner.write();
        inner.flush()?;
        Ok(())
    }

    fn refresh(&self) -> anyhow::Result<()> {
        let mut inner = self.inner.write();
        inner.flush()?;
        Ok(())
    }

    fn format(&self) -> SerializationFormat {
        SerializationFormat::Hg
    }

    fn maybe_as_any(&self) -> Option<&dyn std::any::Any> {
        Some(self)
    }
}

#[async_trait]
impl FileStore for EagerRepoStore {
    async fn get_rename_stream(&self, keys: Vec<Key>) -> BoxStream<anyhow::Result<(Key, Key)>> {
        let iter = keys.into_iter().filter_map(|k| {
            let id = k.hgid;
            match self.get_content(id) {
                Err(e) => Some(Err(e.into())),
                Ok(Some(data)) => match strip_hg_file_metadata(&data) {
                    Err(e) => Some(Err(e)),
                    Ok((_, Some(copy_from))) => Some(Ok((k, copy_from))),
                    Ok((_, None)) => None,
                },
                Ok(None) => Some(Err(anyhow::format_err!("no such file: {:?}", &k))),
            }
        });
        futures::stream::iter(iter).boxed()
    }
}

impl TreeStore for EagerRepoStore {}
