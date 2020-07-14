import faker from 'faker';

import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';
import { ValidationBuilder as sut } from './validation-builder';
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation';

describe('ValidationBuilder', () => {
  let field: string;
  let length: number;

  beforeEach(() => {
    field = faker.database.column();
    length = faker.random.number();
  });

  it('should return RequiredFieldValidation', () => {
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });
  it('should return EmailValidation', () => {
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });
  it('should return MinLength', () => {
    const validations = sut.field(field).min(length).build();
    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });
  it('should return CompareFieldsValidation', () => {
    const fieldToCompare = faker.database.column();
    const validations = sut.field(field).sameAs(fieldToCompare).build();
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });
  it('should return a list of validations', () => {
    const validations = sut.field(field).required().min(length).email().build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});
