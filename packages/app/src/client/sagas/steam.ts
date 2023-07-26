import { cancel, call, put, race, take, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import { GetSequence } from '../../types/apis/demos';
import { fetchDemosTimeSequenceSuccess, fetchDemosTimeSequenceFailure } from '../actions/stream';

function* poll() {
  while (true) {
    try {
      // @ts-expect-error
      const res: GetSequence = (yield axios('/api/demos/sequence')).data;

      yield put(fetchDemosTimeSequenceSuccess(res));
      yield call(delay, 30000);
    } catch (e) {
      yield cancel();
      yield put({ type: 'POLL_ERROR' });
    }
  }
}

function* fetchDemosTimeSequence() {
  try {
    while (true) {
      const { end } = yield race({
        poll: call(poll),
        end: take('POLL_END'),
      });

      if (end) {
        yield cancel();
      }
    }
  } catch (e) {
    yield put({ type: 'POLL_END' });
    yield put(fetchDemosTimeSequenceFailure());
  }
}

export function* streamProcess() {
  yield takeLatest('FETCH_DEMOS_TIME_SEQUENCE', fetchDemosTimeSequence);
}
