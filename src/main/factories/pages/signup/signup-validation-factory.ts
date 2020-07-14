import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols/validation';

export const makeSignUpValidation = (): Validation => {
  return ValidationComposite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().email().build(),
    ...Builder.field('passwordConfirmation').required().min(5).build(),
  ]);
};
