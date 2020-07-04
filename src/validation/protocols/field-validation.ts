export interface FieldValidation {
  field: string;
  validate(Value: string): Error;
}
