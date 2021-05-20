import { INotebookState } from '../../states/INotebookState';
import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/IAction';

const initialState: INotebookState = {
  notebooks: [],
  selectedNotebook: undefined,
};

export default function device(state: INotebookState = initialState, action: IAction): INotebookState {
  switch (action.type) {
    case ActionTypes.UPDATE_NOTEBOOK_TABLE:
      if (action.payload.notebooks) {
        return {
          ...state,
          notebooks: action.payload.notebooks,
        };
      }
      return state;

    case ActionTypes.UPDATE_SELECTED_NOTEBOOK:
      if (action.payload.selectedNotebook) {
        return {
          ...state,
          selectedNotebook: action.payload.selectedNotebook,
        };
      }
      return state;

    default:
      return state;
  }
}
