import faker from 'faker';

import { Authentication } from '../usecases/authentication';
import { AccountModel } from '../models/account-model';

export const makeMockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
