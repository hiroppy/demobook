import { END } from 'redux-saga';
import { take, put, takeLatest } from 'redux-saga/effects';
import { fetchOwners, fetchRepos } from '../actions/demos';
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
    yield take('FETCH_OWNERS_SUCCESS');
    yield put(runTopPagePipelineSuccess());
  } catch (e) {
    yield put(runTopPagePipelineFailure());
  } finally {
    if (!process.env.BROWSER) yield put(END);
  }
}

function* runOwnerPagePipeline(action: RunOwnerPagePipeline) {
  try {
    yield put(fetchRepos(action.payload.owner));
    yield take('FETCH_REPOS_SUCCESS');
    yield put(runOwnerPagePipelineSuccess());
  } catch (e) {
    yield put(runOwnerPagePipelineFailure());
  } finally {
    if (!process.env.BROWSER) yield put(END);
  }
}

export function* pipelinesProcess() {
  yield takeLatest('RUN_TOP_PAGE_PIPELINE', runTopPagePipeline);
  yield takeLatest('RUN_OWNER_PAGE_PIPELINE', runOwnerPagePipeline);
}
