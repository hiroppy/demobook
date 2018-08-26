import { combineReducers } from 'redux';
import { reducer as pagesReducer, State as PagesState } from './pages';
import { reducer as demosReducer, State as DemosState } from './demos';
import { reducer as steamReducer, State as SteamState } from './stream';

export interface State {
  pages: PagesState;
  demos: DemosState;
  steam: SteamState;
}

export const rootReducer = combineReducers({
  pages: pagesReducer,
  demos: demosReducer,
  steam: steamReducer
});
