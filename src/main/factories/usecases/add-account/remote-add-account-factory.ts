import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { AddAccount } from '@/domain/usecases';
import { makeApiUrlFactory } from '@/main/factories/http/api-url-factory';
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account';

export const makeRemoteAddAccountFactory = (): AddAccount => {
  const axiosHttpClient = new AxiosHttpClient();
  return new RemoteAddAccount(
    `${makeApiUrlFactory('/signup')}`,
    axiosHttpClient
  );
};
