import faker from 'faker';

import { RequiredFieldValidation } from './required-field-validation';
import { RequiredFieldError } from '../../errors';

const makeSut = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field);

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });
  it('should return falsy if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.words() });
    expect(error).toBeFalsy();
  });
});
