import faker from 'faker';

import { RemoteAddAccount } from './remote-add-account';
import { HttpPostClientSpy } from '@/data/test';
import { AddAccount } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { makeAddAccount } from '@/domain/test';

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
});
