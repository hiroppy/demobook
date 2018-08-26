import { Action } from 'redux';

export type Actions = UpdateStatusOfCommandModal;

export interface UpdateStatusOfCommandModal extends Action {
  type: 'UPDATE_STATUS_OF_COMMAND_MODAL';
  payload: {
    isOpen: boolean;
  };
}

export const updateStatusOfCommandModal = (isOpen: boolean): UpdateStatusOfCommandModal => ({
  type: 'UPDATE_STATUS_OF_COMMAND_MODAL',
  payload: {
    isOpen
  }
});
