import React from 'react';
import { render, screen } from '@testing-library/react';

import Login from './';
import ThemeProvider from '@/presentation/components/ThemeProvider';

const Sut = () => {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
};

describe('LoginPage', () => {
  it('should start with initial state', () => {
    render(<Sut />);
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
});
