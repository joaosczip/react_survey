import { useHistory } from 'react-router-dom';

import { AccessDeniedError } from '@/domain/errors';
import { useApi } from '@/presentation/contexts/api/api-context';

type CallbackFunc = (error: Error) => void;
type Result = CallbackFunc;

export const useErrorHandler = (callback: CallbackFunc): Result => {
  const { setCurrentAccount } = useApi();
  const history = useHistory();

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(null);
      history.replace('/login');
    } else {
      callback(error);
    }
  };
};
