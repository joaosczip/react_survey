import { AccountModel } from '@/domain/models';
import { UnexpectedError } from '@/domain/errors';
import { makeLocalStorageAdatper } from '../factories/cache/local-storage-adapter-factory';

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdatper().set('account', account);
};

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdatper().get('account');
};
