import React from 'react';
import { RenderResult, render, screen } from '@testing-library/react';
import ThemeProvider from '@/presentation/components/ThemeProvider';

import SignUp from '.';
import { helper } from '@/presentation/test';

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

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    makeSut();
    helper.testChildCount('error-container', 0);
    helper.testButtonIsDisabled('submit', true);
    helper.testStatusForField('name-status', validationError);
    helper.testStatusForField('email-status', validationError);
    helper.testStatusForField('password-status', validationError);
    helper.testStatusForField('passwordConfirmation-status', validationError);
  });
});
