import { Action, AnyAction } from 'redux';
import { INotebookState } from './INotebookState';

export interface IState {
  notebook: INotebookState;
  showNotebookDetailDrawer: boolean;
}
