import faker from 'faker';

import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from './current-account-adapter';
import { mockAccountModel } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';
import { UnexpectedError } from '@/domain/errors';

jest.mock('@/infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  it('should calls LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });
  it('should throws UnexpectedError if invalid account is provided', () => {
    expect(() => setCurrentAccountAdapter(undefined)).toThrow(
      new UnexpectedError()
    );
  });
  it('should calls LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel();
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('account');
    expect(result).toEqual(account);
  });
});
