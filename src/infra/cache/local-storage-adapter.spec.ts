import faker from 'faker';
import 'jest-localstorage-mock';

import { LocalStorageAdapter } from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe('LocalStorageAdapter', () => {
  beforeEach(() => localStorage.clear());

  it('should call localStorage.setItem with correct values', () => {
    const key = faker.database.column();
    const value = faker.random.word();
    const sut = makeSut();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });
  it('should call localStorage.getItem with correct key', () => {
    const key = faker.database.column();
    const value = faker.random.objectElement();
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));
    const sut = makeSut();
    const obj = sut.get(key);
    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
