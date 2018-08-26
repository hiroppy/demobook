import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Top as TopComponent } from '../../components/pages/Top';
import { fetchOwners } from '../../actions/demos';

const mapStateToProps = (state: State) => ({
  owners: state.demos.owners
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: () => {
    dispatch(fetchOwners());
  }
});

export const Top = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopComponent);
