import { ValidationComposite } from './validation-composite';
import { FieldValidationSpy } from '../test/mock-field-validation';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpy: FieldValidationSpy[];
};

const makeSut = (): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field'),
  ];
  const sut = new ValidationComposite(fieldValidationSpy);

  return {
    sut,
    fieldValidationSpy,
  };
};

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const { sut, fieldValidationSpy } = makeSut();
    fieldValidationSpy[0].error = new Error('first_error');
    fieldValidationSpy[1].error = new Error('second_message');
    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe('first_error');
  });
});
