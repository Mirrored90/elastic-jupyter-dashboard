import { combineReducers } from 'redux';
import notebook from './notebook';
import showNotebookDetailDrawer from './showNotebookDetailDrawer';
import showNotebookCreationDrawer from './showNotebookCreationDrawer';

const reducer = combineReducers({
  notebook,
  showNotebookDetailDrawer,
  showNotebookCreationDrawer,
});

export default reducer;
