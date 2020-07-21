import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account';
import { makeLocalStorageAdatper } from '@/main/factories/cache/local-storage-adapter-factory';
import { UpdateCurrentAccount } from '@/domain/usecases';

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdatper());
};
