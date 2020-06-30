import faker from 'faker';

import { Authentication } from '../usecases';
import { AccountModel } from '../models';

export const makeMockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
