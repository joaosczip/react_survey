import faker from 'faker';

import { Authentication } from 'domain/usecases/authentication';

export const makeMockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
