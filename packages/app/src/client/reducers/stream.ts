import { Actions } from '../actions/stream';
import { convertStringFromUnixTime } from '../../utils/format';
import { GetSequence } from '../../types/apis/demos';

export interface State {
  demos: GetSequence;
  isFetching: boolean;
  refreshedTime: string;
}

export const initialState: State = {
  demos: [],
  isFetching: true,
  refreshedTime: ''
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'FETCH_DEMOS_TIME_SEQUENCE':
      return { ...state, isFetching: true };
    case 'FETCH_DEMOS_TIME_SEQUENCE_SUCCESS':
      return {
        ...state,
        demos: action.payload.demos,
        isFetching: false,
        refreshedTime: convertStringFromUnixTime(Date.now())
      };
    case 'FETCH_DEMOS_TIME_SEQUENCE_FAILURE':
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
