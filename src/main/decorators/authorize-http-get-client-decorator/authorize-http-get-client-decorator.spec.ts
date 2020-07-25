import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { mockGetRequest, GetStorageSpy } from '@/data/test';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
  return {
    sut,
    getStorageSpy,
  };
};

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should calls GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    const mockRequest = mockGetRequest();
    await sut.get(mockRequest);
    expect(getStorageSpy.key).toBe('account');
  });
});
