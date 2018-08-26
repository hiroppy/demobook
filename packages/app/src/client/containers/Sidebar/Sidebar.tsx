import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Sidebar as SidebarComponent } from '../../components/organisms/Sidebar';
import { fetchDemosTimeSequence } from '../../actions/stream';

const mapStateToProps = (state: State) => ({
  refreshedTime: state.steam.refreshedTime,
  demos: state.steam.demos,
  isFetching: state.steam.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: () => {
    dispatch(fetchDemosTimeSequence());
  }
});

export const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);
