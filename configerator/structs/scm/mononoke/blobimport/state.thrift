// @generated SignedSource<<9de64a6c5001156e157530bebc7ac1fe>>
// DO NOT EDIT THIS FILE MANUALLY!
// This file is a mechanical copy of the version in the configerator repo. To
// modify it, edit the copy in the configerator repo instead and copy it over by
// running the following in your fbcode directory:
//
// configerator-thrift-updater scm/mononoke/blobimport/state.thrift

namespace py configerator.blobimport_state.state

typedef i64 RepoId
typedef string RepoName
typedef string SourceRepoName

# TODO:  Remove after updating blobimport
struct BlobimportState {
  1: map<RepoId, bool> running;
}

# TODO:  Remove after updating blobimport
struct RepoNames {
  1: map<string, RepoId> mapping;
}

enum BlobimportStatus {
  STOPPED = 0,
  RUNNING = 1,
}

struct Repository {
  1: RepoId id;
  2: RepoName name;
  3: BlobimportStatus blobimport_status;
  # overrides shouldn't normally be used.
  # The main motivation for introducing them was to improt ovrsource repo
  # into fbsource
  4: optional map<SourceRepoName, BlobimportStatus> blobimport_status_overrides;
}

struct Blobimport {
  1: list<Repository> repositories;
}