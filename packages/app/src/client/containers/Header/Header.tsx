import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Header as HeaderComponent } from '../../components/organisms/Header';
import { updateStatusOfCommandModal } from '../../actions/pages';

const mapStateToProps = (state: State) => ({
  isOpenCommandModal: state.pages.isOpenCommandModal
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateStatusOfCommandModal: (isOpen: boolean) => {
    dispatch(updateStatusOfCommandModal(isOpen));
  }
});

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);
