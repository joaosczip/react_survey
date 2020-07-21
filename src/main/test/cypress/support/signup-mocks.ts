import faker from 'faker';

import * as Helper from './http-mocks';

export const mockForbidden = () => Helper.mockForbidden(/signup/, 'POST');
export const mockUnexpectedError = () =>
  Helper.mockUnexpectedError(/signup/, 'POST');
export const mockInvalidOk = () =>
  Helper.mockOkResponse(/signup/, 'POST', {
    invalid: faker.random.words(),
  });
export const mockOk = () =>
  Helper.mockOkResponse(/signup/, 'POST', {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
  });
