import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { makeLocalStorageAdatper } from '@/main/factories/cache/local-storage-adapter-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { HttpGetClient } from '@/data/protocols/http';

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdatper(),
    makeAxiosHttpClient()
  );
};
