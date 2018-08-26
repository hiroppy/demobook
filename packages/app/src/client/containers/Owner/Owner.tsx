import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Owner as OwnerComponent } from '../../components/pages/Owner';
import { fetchRepos } from '../../actions/demos';

const mapStateToProps = (state: State) => ({
  owner: state.demos.currentOwner,
  repos: state.demos.repos,
  isFetching: state.demos.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (owner: string) => {
    dispatch(fetchRepos(owner));
  }
});

export const Owner = connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerComponent);
