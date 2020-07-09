import faker from 'faker';

import { AddAccount } from '../usecases';

const password = faker.internet.password();

export const makeAddAccount = (): AddAccount.Params => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password,
  passwordConfirmation: password,
});
