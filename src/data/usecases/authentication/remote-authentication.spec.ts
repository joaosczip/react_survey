import faker from 'faker';

import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import {
  makeMockAuthentication,
  mockAccountModel,
} from '@/domain/test/mock-account';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-reponse';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { Authentication } from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models/account-model';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClient: HttpPostClientSpy<Authentication.Params, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy<
    Authentication.Params,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClient);

  return { sut, httpPostClient };
};

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClient } = makeSut(url);
    await sut.auth(makeMockAuthentication());
    expect(httpPostClient.url).toBe(url);
  });
  it('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClient } = makeSut();
    const authenticationParams = makeMockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClient.body).toEqual(authenticationParams);
  });
  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClient } = makeSut();
    jest.spyOn(httpPostClient, 'post').mockImplementationOnce(() => {
      return Promise.resolve({
        statusCode: HttpStatusCode.unauthorized,
      });
    });
    const result = sut.auth(makeMockAuthentication());
    await expect(result).rejects.toThrow(new InvalidCredentialsError());
  });
  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClient } = makeSut();
    jest.spyOn(httpPostClient, 'post').mockImplementationOnce(() => {
      return Promise.resolve({
        statusCode: HttpStatusCode.badRequest,
      });
    });
    const result = sut.auth(makeMockAuthentication());
    await expect(result).rejects.toThrow(new UnexpectedError());
  });
  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClient } = makeSut();
    jest.spyOn(httpPostClient, 'post').mockImplementationOnce(() => {
      return Promise.resolve({
        statusCode: HttpStatusCode.serverError,
      });
    });
    const result = sut.auth(makeMockAuthentication());
    await expect(result).rejects.toThrow(new UnexpectedError());
  });
  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClient } = makeSut();
    jest.spyOn(httpPostClient, 'post').mockImplementationOnce(() => {
      return Promise.resolve({
        statusCode: HttpStatusCode.notFound,
      });
    });
    const result = sut.auth(makeMockAuthentication());
    await expect(result).rejects.toThrow(new UnexpectedError());
  });
  it('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClient } = makeSut();
    const httpResult = mockAccountModel();
    jest.spyOn(httpPostClient, 'post').mockImplementationOnce(() => {
      return Promise.resolve({
        statusCode: HttpStatusCode.ok,
        body: httpResult,
      });
    });
    const account = await sut.auth(makeMockAuthentication());
    expect(account).toEqual(httpResult);
  });
});
