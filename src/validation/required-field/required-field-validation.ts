import { FieldValidation } from '../protocols/field-validation';
import { RequiredFieldError } from '../errors/';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(Value: string): Error {
    return new RequiredFieldError();
  }
}
