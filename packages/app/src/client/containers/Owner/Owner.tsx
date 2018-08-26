import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Owner as OwnerComponent } from '../../components/pages/Owner';
import { runOwnerPagePipeline } from '../../actions/pipelines';

const mapStateToProps = (state: State) => ({
  owner: state.demos.currentOwner,
  repos: state.demos.repos,
  isLoadCompletion: state.pages.isLoadCompletion
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (owner: string) => {
    dispatch(runOwnerPagePipeline(owner));
  }
});

export const Owner = connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerComponent);
