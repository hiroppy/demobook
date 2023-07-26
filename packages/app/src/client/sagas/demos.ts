import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GetOwnersResponse, GetReposResponse } from '../../types/apis/demos';
import {
  fetchOwnersSuccess,
  fetchOwnersFailure,
  fetchReposSuccess,
  fetchReposFailure,
  FetchRepos,
} from '../actions/demos';

if (!process.env.BROWSER) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const client = axios.create({
  baseURL: process.env.BROWSER ? process.env.URL : `http://localhost:${process.env.PORT || 3000}`,
  timeout: 3000,
});

function* fetchOwners() {
  try {
    // @ts-expect-error
    const res: GetOwnersResponse = (yield client('/api/demos')).data;

    yield put(fetchOwnersSuccess(res));
  } catch (e) {
    yield put(fetchOwnersFailure(e as Error));
  }
}

function* fetchRepos(action: FetchRepos) {
  try {
    const { owner } = action.paylaod;
    // @ts-expect-error
    const res: GetReposResponse = (yield client(`/api/demos/${owner}`)).data;

    yield put(fetchReposSuccess(res));
  } catch (e) {
    yield put(fetchReposFailure(e as Error));
  }
}

export function* demosProcess() {
  yield takeLatest('FETCH_OWNERS', fetchOwners);
  yield takeLatest('FETCH_REPOS', fetchRepos);
}
