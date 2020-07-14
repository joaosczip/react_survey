import { makeSignUpValidation } from './signup-validation-factory';
import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/validation/validators';

describe('SignUpValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').required().min(5).build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().email().build(),
        ...Builder.field('passwordConfirmation').required().min(5).build(),
      ])
    );
  });
});
