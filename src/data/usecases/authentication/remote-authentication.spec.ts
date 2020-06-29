import faker from 'faker';

import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import { makeMockAuthentication } from '@/domain/test/mock-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-reponse';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClient: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy();
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
});
