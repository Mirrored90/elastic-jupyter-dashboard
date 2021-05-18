import { combineReducers } from 'redux';
import { IState } from '../../states/IState';
import notebook from './notebook';
import showNotebookDetailDrawer from './showNotebookDetailDrawer';

const reducer = combineReducers({
  notebook,
  showNotebookDetailDrawer,
});

export default reducer;
