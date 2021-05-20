import { INotebookState } from './INotebookState';

export interface IState {
  notebook: INotebookState;
  showNotebookDetailDrawer: boolean;
  showNotebookCreationDrawer: boolean;
}
