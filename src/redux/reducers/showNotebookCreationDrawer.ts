import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/IAction';

const initialState = false;

export default function showNotebookCreationDrawer(state: boolean = initialState, action: IAction): boolean {
  switch (action.type) {
    case ActionTypes.OPEN_NOTEBOOK_CREATION_DRAWER:
      return true;
    case ActionTypes.CLOSE_NOTEBOOK_CREATION_DRAWER:
      return false;
    default:
      return state;
  }
}
