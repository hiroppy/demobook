import { all, fork } from 'redux-saga/effects';
import { demosProcess } from './demos';
import { streamProcess } from './steam';

/**
 * Root for saga
 */
export function* rootSaga() {
  yield all([fork(demosProcess)]);
  yield all([fork(streamProcess)]);
}
