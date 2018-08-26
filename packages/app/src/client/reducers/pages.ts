import { Actions } from '../actions/pages';
import { Actions as PipelinesActions } from '../actions/pipelines';

export interface State {
  isOpenCommandModal: boolean;
  isFetching: boolean;
  isLoadCompletion: boolean;
}

export const initialState: State = {
  isOpenCommandModal: false,
  isFetching: false,
  isLoadCompletion: false
};

export const reducer = (state: State = initialState, action: Actions & PipelinesActions): State => {
  switch (action.type) {
    case 'UPDATE_STATUS_OF_COMMAND_MODAL':
      return { ...state, isOpenCommandModal: action.payload.isOpen };
    case 'RUN_TOP_PAGE_PIPELINE':
    case 'RUN_OWNER_PAGE_PIPELINE':
      return { ...state, isFetching: true, isLoadCompletion: false };
    case 'RUN_TOP_PAGE_PIPELINE_SUCCESS':
    case 'RUN_OWNER_PAGE_PIPELINE_SUCCESS':
      return { ...state, isFetching: false, isLoadCompletion: true };
    case 'RUN_TOP_PAGE_PIPELINE_FAILURE':
    case 'RUN_OWNER_PAGE_PIPELINE_FAILURE':
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
