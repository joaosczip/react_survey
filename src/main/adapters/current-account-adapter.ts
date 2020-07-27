import { AccountModel } from '@/domain/models';
import { makeLocalStorageAdatper } from '../factories/cache/local-storage-adapter-factory';

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  makeLocalStorageAdatper().set('account', account);
};

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdatper().get('account');
};
