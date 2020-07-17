import faker from 'faker';

import * as Helper from './http-mocks';

export const mockInvalidCredentialsError = () =>
  Helper.mockUnauthorizedError(/login/);
export const mockUnexpectedError = () =>
  Helper.mockUnexpectedError(/login/, 'POST');
export const mockOk = () =>
  Helper.mockOkResponse(/login/, 'POST', {
    accessToken: faker.random.uuid(),
  });
export const mockInvalidOk = () =>
  Helper.mockOkResponse(/login/, 'POST', {
    invalid: faker.random.words(),
  });
