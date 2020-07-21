import React from 'react';

import Login from '@/presentation/pages/Login';
import { makeRemoteAuthenticationFactory } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { makeLoginValidation } from './login-validation-factory';
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/update-current-account-factory';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticationFactory()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};
