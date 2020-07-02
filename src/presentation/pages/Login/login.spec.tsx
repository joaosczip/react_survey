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

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const errorMessage = faker.random.words();
  validationStub.errorMessage = errorMessage;

  const sut = render(
    <ThemeProvider>
      <Login validation={validationStub} />
    </ThemeProvider>
  );
  return { sut, validationStub };
};

describe('LoginPage', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const { validationStub } = makeSut();
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
    const { validationStub } = makeSut();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('Error');
  });
  it('should show password error if validation fails', () => {
    const { validationStub } = makeSut();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('Error');
  });
  it('should shows valid email state if validation succeds', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('OK');
  });
  it('should shows valid password state if validation succeds', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('OK');
  });
});
