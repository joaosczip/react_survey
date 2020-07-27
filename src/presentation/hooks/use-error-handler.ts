import { AccessDeniedError } from '@/domain/errors';
import { useLogout } from './use-logout';

type CallbackFunc = (error: Error) => void;
type Result = CallbackFunc;

export const useErrorHandler = (callback: CallbackFunc): Result => {
  const handleLogout = useLogout();

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      handleLogout();
    } else {
      callback(error);
    }
  };
};
