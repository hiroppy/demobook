import { END } from 'redux-saga';
import { take, put, takeLatest } from 'redux-saga/effects';
import {
  fetchOwners,
  fetchRepos,
  FetchOwnersSuccess,
  FetchOwnersFailure,
  FetchReposSuccess,
  FetchReposFailure
} from '../actions/demos';
import {
  runTopPagePipelineSuccess,
  runTopPagePipelineFailure,
  RunOwnerPagePipeline,
  runOwnerPagePipelineSuccess,
  runOwnerPagePipelineFailure
} from '../actions/pipelines';

function* runTopPagePipeline() {
  try {
    yield put(fetchOwners());
    const res: FetchOwnersSuccess | FetchOwnersFailure = yield take([
      'FETCH_OWNERS_SUCCESS',
      'FETCH_OWNERS_FAILURE'
    ]);

    if (res.type === 'FETCH_OWNERS_FAILURE') throw new Error(res.payload.error.message);
    yield put(runTopPagePipelineSuccess());
  } catch (e) {
    yield put(runTopPagePipelineFailure(e));
  } finally {
    if (!process.env.BROWSER) yield put(END);
  }
}

function* runOwnerPagePipeline(action: RunOwnerPagePipeline) {
  try {
    yield put(fetchRepos(action.payload.owner));
    const res: FetchReposSuccess | FetchReposFailure = yield take([
      'FETCH_REPOS_SUCCESS',
      'FETCH_REPOS_FAILUER'
    ]);

    if (res.type === 'FETCH_REPOS_FAILURE') throw new Error(res.payload.error.message);
    yield put(runOwnerPagePipelineSuccess());
  } catch (e) {
    yield put(runOwnerPagePipelineFailure(e));
  } finally {
    if (!process.env.BROWSER) yield put(END);
  }
}

export function* pipelinesProcess() {
  yield takeLatest('RUN_TOP_PAGE_PIPELINE', runTopPagePipeline);
  yield takeLatest('RUN_OWNER_PAGE_PIPELINE', runOwnerPagePipeline);
}
