import { INotebookState } from '../../states/INotebookState';
import ActionTypes from '../actions/ActionTypes';
import { IAction } from '../actions/IAction';

const initialState: INotebookState = {
  notebooks: [],
};

export default function device(state: INotebookState = initialState, action: IAction): INotebookState {
  switch (action.type) {
    default:
      return state;
  }
}
