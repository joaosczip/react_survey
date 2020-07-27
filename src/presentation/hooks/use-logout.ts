import { useHistory } from 'react-router-dom';

import { useApi } from '@/presentation/contexts/api/api-context';

type Result = () => void;

export const useLogout = (): Result => {
  const { setCurrentAccount } = useApi();
  const history = useHistory();

  return (): void => {
    setCurrentAccount(null);
    history.replace('/login');
  };
};
