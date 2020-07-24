import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { useApi } from '@/presentation/contexts/api/api-context';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { getCurrentAccount } = useApi();

  return getCurrentAccount()?.accessToken ? (
    <Route {...props} />
  ) : (
    <Route {...props} component={() => <Redirect to="/login" />} />
  );
};

export default PrivateRoute;
