import React from 'react';
import faker from 'faker';
import { RenderResult, render, cleanup, screen } from '@testing-library/react';
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
    helper.testStatusForField('email-status', validationError);
    helper.testStatusForField('password-status', validationError);
    helper.testStatusForField('passwordConfirmation-status', validationError);
  });
  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('name');
    const nameStatus = screen.getByTestId('name-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('Error');
  });
  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('email');
    const nameStatus = screen.getByTestId('email-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('Error');
  });
  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('password');
    const nameStatus = screen.getByTestId('password-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('Error');
  });
  it('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('passwordConfirmation');
    const nameStatus = screen.getByTestId('passwordConfirmation-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('Error');
  });
});
