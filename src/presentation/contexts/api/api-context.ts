import { createContext, useContext } from 'react';

import { AccountModel } from '@/domain/models';

type Props = {
  setCurrentAccount?: (account: AccountModel) => void;
  getCurrentAccount?: () => AccountModel;
};

export const ApiContext = createContext<Props>(null);

export const useApi = (): Props => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('Invalid API context');
  }

  return context;
};
