import faker from 'faker';

import { InvalidFieldError } from '@/validation/errors';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), valueToCompare);

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError(sut.field));
  });
  it('should return falsy if compare if valid', () => {
    const value = faker.random.word();
    const sut = makeSut(value);
    const error = sut.validate(value);
    expect(error).toBeFalsy();
  });
});
