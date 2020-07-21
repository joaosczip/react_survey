import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  return <Route {...props} component={() => <Redirect to="/login" />} />;
};

export default PrivateRoute;
