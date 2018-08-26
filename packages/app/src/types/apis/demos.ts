export interface GetOwnersResponse {
  [owner: string]: {
    url: string;
    demosNum: number;
    updatedAt: number;
    totalSize: number;
  };
}

export interface RepoSchema {
  key: string;
  url: string;
  prNum: null | number;
  projectName: string;
  date: string;
  dateNum: number;
  totalSize: number;
}

export interface GetReposResponse {
  owner: {
    url: string;
    name: string;
    demosNum: number;
    totalSize: number;
    updatedAt: number;
  };
  repos: {
    [repo: string]: Array<RepoSchema & { prUrl: string | null }>;
  };
}

export type GetSequence = Array<
  RepoSchema & {
    owner: string;
    repo: string;
  }
>;
