import { FieldValidation } from '@/validation/protocols/field-validation';
import faker from 'faker';

import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';

const makeSut = (field: string) => new EmailValidation(field);

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const field = faker.random.word();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toEqual(new InvalidFieldError(sut.field));
  });
  it('should return falsy if email is valid', () => {
    const field = faker.random.word();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.internet.email() });
    expect(error).toBeFalsy();
  });
  it('should return falsy if email is empty', () => {
    const field = faker.random.word();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toBeFalsy();
  });
});
