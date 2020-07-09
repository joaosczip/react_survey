import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token';
import { makeLocalStorageAdatper } from '@/main/factories/cache/local-storage-adapter-factory';

export const makeLocalSaveAccessToken = (): LocalSaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdatper());
};
