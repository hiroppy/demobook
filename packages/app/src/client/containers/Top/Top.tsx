import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Top as TopComponent } from '../../components/pages/Top';
import { runTopPagePipeline } from '../../actions/pipelines';
import { updateStatusOfCommandModal } from '../../actions/pages';

const mapStateToProps = (state: State) => ({
  owners: state.demos.owners,
  isLoadCompletion: state.pages.isLoadCompletion
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: () => {
    dispatch(runTopPagePipeline());
  },
  openCommandModal: () => {
    dispatch(updateStatusOfCommandModal(true));
  }
});

export const Top = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopComponent);
