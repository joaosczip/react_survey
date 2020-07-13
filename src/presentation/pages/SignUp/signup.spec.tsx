import React from 'react';
import { RenderResult, render, screen } from '@testing-library/react';
import ThemeProvider from '@/presentation/components/ThemeProvider';

import SignUp from '.';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(
    <ThemeProvider>
      <SignUp />
    </ThemeProvider>
  );
  return { sut };
};

const testChildCount = (testId: string, count: number) => {
  const element = screen.getByTestId(testId);
  expect(element.childElementCount).toBe(count);
};

const testButtonIsDisabled = (testId: string, isDisabled: boolean) => {
  const button = screen.getByTestId(testId) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

const testStatusForField = (testId: string, validationError: string) => {
  const element = screen.getByTestId(testId);
  expect(element.title).toBe(validationError || 'Tudo certo!');
  expect(element.textContent).toBe(validationError ? 'Error' : 'OK');
};

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    makeSut();
    testChildCount('error-container', 0);
    testButtonIsDisabled('submit', true);
    testStatusForField('name-status', validationError);
    testStatusForField('email-status', validationError);
    testStatusForField('password-status', validationError);
    testStatusForField('passwordConfirmation-status', validationError);
  });
});
