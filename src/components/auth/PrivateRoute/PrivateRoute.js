import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ isLogged, path, children }) =>
  isLogged ? (
    <Route path={path} exact>
      {children}
    </Route>
  ) : (
    <Redirect to="/login" />
  );

PrivateRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
