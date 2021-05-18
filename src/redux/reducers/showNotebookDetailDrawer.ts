import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/IAction';

const initialState = false;

export default function showNotebookDetailDrawer(state: boolean = initialState, action: IAction): boolean {
  switch (action.type) {
    case ActionTypes.OPEN_NOTEBOOK_DETAIL_DRAWER:
      return true;
    case ActionTypes.CLOSE_NOTEBOOK_DETAIL_DRAWER:
      return false;
    default:
      return state;
  }
}
