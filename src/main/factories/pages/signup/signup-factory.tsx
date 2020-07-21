import React from 'react';

import SignUp from '@/presentation/pages/SignUp';
import { makeRemoteAddAccountFactory } from '@/main/factories/usecases/add-account/remote-add-account-factory';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/update-current-account-factory';

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccountFactory()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};
