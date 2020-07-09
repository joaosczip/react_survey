import faker from 'faker';

import { RemoteAddAccount } from './remote-add-account';
import { HttpPostClientSpy } from '@/data/test';
import { AddAccount } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { makeAddAccount } from '@/domain/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { EmailAddressAlreadyInUseError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccount.Params,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe('RemoteAddAccount', () => {
  it('should calls HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(makeAddAccount());
    expect(httpPostClientSpy.url).toBe(url);
  });
  it('should calls HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const body = makeAddAccount();
    await sut.add(body);
    expect(httpPostClientSpy.body).toEqual(body);
  });
  it('should throws EmailAddressAlreadyInUseError if HttpPostClient returns 403', () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const result = sut.add(makeAddAccount());
    expect(result).rejects.toThrow(new EmailAddressAlreadyInUseError());
  });
});
