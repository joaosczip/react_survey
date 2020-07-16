import faker from 'faker';

import { SetStorageMock } from '@/data/test';
import { LocalSaveAccessToken } from './local-save-access-token';
import { UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe('LocalSaveAccessToken', () => {
  it('should calls setStorage with correct values', async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });
  it('should throw if setStorage throws', () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.random.uuid());
    expect(promise).rejects.toThrow();
  });
  it('should throw if accessToken is falsy', () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
