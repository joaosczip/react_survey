import React from 'react';
import {
  render,
  screen,
  RenderResult,
  cleanup,
  fireEvent,
} from '@testing-library/react';

import Login from './';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import { Validation } from '@/presentation/protocols/validation';

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(
    <ThemeProvider>
      <Login validation={validationSpy} />
    </ThemeProvider>
  );
  return { sut, validationSpy };
};

describe('LoginPage', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    makeSut();
    const errorContainer = screen.getByTestId('error-container');
    expect(errorContainer.childElementCount).toBe(0);
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('Error');
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('Error');
  });
  it('should calls validation with correct email', () => {
    const { validationSpy } = makeSut();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });
    expect(validationSpy.input).toEqual({
      email: 'any_email',
    });
  });
  it('should calls validation with correct password', () => {
    const { validationSpy } = makeSut();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });
    expect(validationSpy.input).toEqual({
      password: 'any_password',
    });
  });
});
