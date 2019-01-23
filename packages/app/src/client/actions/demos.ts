import { Action } from 'redux';
import { GetOwnersResponse, GetReposResponse } from '../../types/apis/demos';

export type Actions =
  | FetchOwners
  | FetchOwnersSuccess
  | FetchOwnersFailure
  | FetchRepos
  | FetchReposSuccess
  | FetchReposFailure;

export interface FetchOwners extends Action {
  type: 'FETCH_OWNERS';
}

export const fetchOwners = (): FetchOwners => ({
  type: 'FETCH_OWNERS'
});

export interface FetchOwnersSuccess extends Action {
  type: 'FETCH_OWNERS_SUCCESS';
  payload: {
    owners: GetOwnersResponse;
  };
}

export const fetchOwnersSuccess = (owners: GetOwnersResponse): FetchOwnersSuccess => ({
  type: 'FETCH_OWNERS_SUCCESS',
  payload: {
    owners
  }
});

export interface FetchOwnersFailure extends Action {
  type: 'FETCH_OWNERS_FAILURE';
  payload: {
    error: Error;
  };
}

export const fetchOwnersFailure = (error: Error): FetchOwnersFailure => ({
  type: 'FETCH_OWNERS_FAILURE',
  payload: {
    error
  }
});

export interface FetchRepos extends Action {
  type: 'FETCH_REPOS';
  paylaod: {
    owner: string;
  };
}

export const fetchRepos = (owner: string): FetchRepos => ({
  type: 'FETCH_REPOS',
  paylaod: {
    owner
  }
});

export interface FetchReposSuccess extends Action {
  type: 'FETCH_REPOS_SUCCESS';
  payload: {
    owner: GetReposResponse['owner'];
    repos: GetReposResponse['repos'];
  };
}

export const fetchReposSuccess = ({
  owner,
  repos
}: FetchReposSuccess['payload']): FetchReposSuccess => ({
  type: 'FETCH_REPOS_SUCCESS',
  payload: {
    owner,
    repos
  }
});

export interface FetchReposFailure extends Action {
  type: 'FETCH_REPOS_FAILURE';
  payload: {
    error: Error;
  };
}

export const fetchReposFailure = (error: Error): FetchReposFailure => ({
  type: 'FETCH_REPOS_FAILURE',
  payload: {
    error
  }
});
