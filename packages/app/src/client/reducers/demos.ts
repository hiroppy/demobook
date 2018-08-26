import { Actions } from '../actions/demos';
import { GetOwnersResponse, GetReposResponse } from '../../types/apis/demos';

export interface State {
  owners: GetOwnersResponse;
  repos: GetReposResponse['repos'];
  isFetching: boolean;
  currentOwner: GetReposResponse['owner'];
}

export const initialState: State = {
  owners: {},
  repos: {},
  isFetching: false,
  currentOwner: {
    url: '',
    name: '',
    totalSize: 0,
    demosNum: 0,
    updatedAt: 0
  }
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'FETCH_OWNERS_SUCCESS':
      return { ...state, owners: action.payload.owners, isFetching: false };
    case 'FETCH_REPOS_SUCCESS':
      return {
        ...state,
        repos: action.payload.repos,
        currentOwner: action.payload.owner,
        isFetching: false
      };
    case 'FETCH_OWNERS':
    case 'FETCH_REPOS':
      return { ...state, isFetching: true };
    case 'FETCH_OWNERS_FAILURE':
    case 'FETCH_REPOS_FAILURE':
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
