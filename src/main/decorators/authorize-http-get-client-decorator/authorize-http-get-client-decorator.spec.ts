import faker from 'faker';

import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { mockGetRequest, GetStorageSpy, HttpGetClientSpy } from '@/data/test';
import { HttpGetClient } from '@/data/protocols/http';
import { mockAccountModel } from '@/domain/test';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  );
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy,
  };
};

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should calls GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    const mockRequest = mockGetRequest();
    await sut.get(mockRequest);
    expect(getStorageSpy.key).toBe('account');
  });
  it('should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetClient.Params = {
      url: faker.internet.url(),
      headers: {
        [faker.database.column()]: faker.random.word(),
      },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });
  it('should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetClient.Params = {
      url: faker.internet.url(),
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });
  it('should merge headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const headers = {
      [faker.database.column()]: faker.random.word(),
    };
    const httpRequest: HttpGetClient.Params = {
      url: faker.internet.url(),
      headers,
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      ...headers,
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });
});
