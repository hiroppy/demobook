import { combineReducers } from 'redux';
import { reducer as demosReducer, State as DemosState } from './demos';
import { reducer as steamReducer, State as SteamState } from './stream';

export interface State {
  demos: DemosState;
  steam: SteamState;
}

export const rootReducer = combineReducers({
  demos: demosReducer,
  steam: steamReducer
});
