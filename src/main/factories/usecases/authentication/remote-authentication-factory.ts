import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { Authentication } from '@/domain/usecases';
import { makeApiUrlFactory } from '@/main/factories/http/api-url-factory';

export const makeRemoteAuthenticationFactory = (): Authentication => {
  const axiosHttpClient = new AxiosHttpClient();
  return new RemoteAuthentication(
    `${makeApiUrlFactory()}/login`,
    axiosHttpClient
  );
};
