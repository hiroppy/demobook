import { Action } from 'redux';
import { GetSequence } from '../../types/apis/demos';

export type Actions =
  | FetchDemosTimeSequence
  | FetchDemosTimeSequenceSuccess
  | FetchDemosTimeSequenceFailure;

export interface FetchDemosTimeSequence extends Action {
  type: 'FETCH_DEMOS_TIME_SEQUENCE';
}

export const fetchDemosTimeSequence = (): FetchDemosTimeSequence => ({
  type: 'FETCH_DEMOS_TIME_SEQUENCE'
});

export interface FetchDemosTimeSequenceSuccess extends Action {
  type: 'FETCH_DEMOS_TIME_SEQUENCE_SUCCESS';
  payload: {
    demos: GetSequence;
  };
}

export const fetchDemosTimeSequenceSuccess = (
  demos: GetSequence
): FetchDemosTimeSequenceSuccess => ({
  type: 'FETCH_DEMOS_TIME_SEQUENCE_SUCCESS',
  payload: {
    demos
  }
});

export interface FetchDemosTimeSequenceFailure extends Action {
  type: 'FETCH_DEMOS_TIME_SEQUENCE_FAILURE';
}

export const fetchDemosTimeSequenceFailure = (): FetchDemosTimeSequenceFailure => ({
  type: 'FETCH_DEMOS_TIME_SEQUENCE_FAILURE'
});
