import React from 'react';
import {
  render,
  screen,
  RenderResult,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import faker from 'faker';

import Login from './';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import { ValidationStub } from '@/presentation/test/mock-validation';
import { AuthenticationSpy } from '@/presentation/test/mock-authentication';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const authenticationSpy = new AuthenticationSpy();

  const sut = render(
    <ThemeProvider>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </ThemeProvider>
  );
  return { sut, validationStub, authenticationSpy };
};

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(email);
  populatePasswordField(password);
  const submitButton = screen.getByTestId('submit');
  submitButton.click();
};

const populateEmailField = (email = faker.internet.email()) => {
  const emailInput = screen.getByTestId('email');
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordField = (password = faker.internet.password()) => {
  const passwordInput = screen.getByTestId('password');
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

describe('LoginPage', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const { validationStub } = makeSut({
      validationError: faker.random.words(),
    });
    const errorContainer = screen.getByTestId('error-container');
    expect(errorContainer.childElementCount).toBe(0);
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('Error');
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('Error');
  });
  it('should show email error if validation fails', () => {
    const { validationStub } = makeSut({
      validationError: faker.random.words(),
    });
    validationStub.errorMessage = faker.random.words();
    populateEmailField();
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('Error');
  });
  it('should show password error if validation fails', () => {
    const { validationStub } = makeSut({
      validationError: faker.random.words(),
    });
    validationStub.errorMessage = faker.random.words();
    populatePasswordField();
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('Error');
  });
  it('should shows valid email state if validation succeds', () => {
    makeSut();
    populateEmailField();
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('OK');
  });
  it('should shows valid password state if validation succeds', () => {
    makeSut();
    populatePasswordField();
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('OK');
  });
  it('should enable submit button if form is valid', () => {
    makeSut();
    populateEmailField();
    populatePasswordField();
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
  it('should shows spinner on submit', () => {
    makeSut();
    simulateValidSubmit();
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });
  it('should calls Authentication with correct values', () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});
