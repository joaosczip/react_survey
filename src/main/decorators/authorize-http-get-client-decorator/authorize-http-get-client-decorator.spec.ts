import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { mockGetRequest, GetStorageSpy } from '@/data/test';

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should calls GetStorage with correct value', async () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
    const mockRequest = mockGetRequest();
    await sut.get(mockRequest);
    expect(getStorageSpy.key).toBe('account');
  });
});
