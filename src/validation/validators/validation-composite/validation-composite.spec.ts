import faker from 'faker';

import { ValidationComposite } from './validation-composite';
import { FieldValidationSpy } from '@/validation/test/';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = ValidationComposite.build(fieldValidationSpy);

  return {
    sut,
    fieldValidationSpy,
  };
};

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationSpy } = makeSut(fieldName);
    fieldValidationSpy[0].error = new Error(faker.random.words());
    fieldValidationSpy[1].error = new Error(faker.random.words());
    const error = sut.validate(fieldName, {
      [fieldName]: faker.random.words(),
    });
    expect(error).toBe(fieldValidationSpy[0].error.message);
  });
  it('should returns falsy if validation is valid', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, {
      [fieldName]: faker.random.words(),
    });
    expect(error).toBeFalsy();
  });
});
