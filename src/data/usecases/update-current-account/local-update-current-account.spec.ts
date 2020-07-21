import { SetStorageMock } from '@/data/test';
import { LocalUpdateCurrentAccount } from './local-update-current-account';
import { UnexpectedError } from '@/domain/errors';
import { mockAccountModel } from '@/domain/test';

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe('LocalSaveAccessToken', () => {
  it('should calls setStorage with correct values', async () => {
    const { sut, setStorageMock } = makeSut();
    const account = mockAccountModel();
    await sut.save(account);
    expect(setStorageMock.key).toBe('account');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });
  it('should throw if setStorage throws', () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(mockAccountModel());
    expect(promise).rejects.toThrow();
  });
  it('should throw if accessToken is falsy', () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
