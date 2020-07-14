import React from 'react';
import faker from 'faker';
import { RenderResult, render, cleanup } from '@testing-library/react';
import ThemeProvider from '@/presentation/components/ThemeProvider';

import SignUp from '.';
import { helper, ValidationStub } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <ThemeProvider>
      <SignUp validation={validationStub} />
    </ThemeProvider>
  );
  return { sut };
};

describe('SignUp Page', () => {
  afterEach(cleanup);
  it('should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.testChildCount('error-container', 0);
    helper.testButtonIsDisabled('submit', true);
    helper.testStatusForField('name-status', validationError);
    helper.testStatusForField('email-status', 'Campo obrigatório');
    helper.testStatusForField('password-status', 'Campo obrigatório');
    helper.testStatusForField(
      'passwordConfirmation-status',
      'Campo obrigatório'
    );
  });
  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('name', validationError);
  });
});
