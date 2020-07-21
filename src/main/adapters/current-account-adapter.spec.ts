import { setCurrentAccountAdapter as sut } from './current-account-adapter';
import { mockAccountModel } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';

jest.mock('@/infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  it('should calls LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    sut(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });
});
