import * as React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomePage from './HomePage/HomePage';
import reducer from './redux/reducers/index';

const store = createStore(reducer);

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
        <HomePage />
      </Router>
    </Provider>
  );
}

export default App;
