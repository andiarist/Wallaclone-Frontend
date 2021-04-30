import React from 'react';
import { Router } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';

const Root = ({ children, store, history }) => (
  <Provider store={store}>
    <Router history={history}>{children}</Router>
  </Provider>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Root;
