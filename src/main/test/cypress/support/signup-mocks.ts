import * as Helper from './http-mocks';

export const mockForbidden = () => Helper.mockForbidden(/signup/, 'POST');
export const mockUnexpectedError = () =>
  Helper.mockUnexpectedError(/signup/, 'POST');
