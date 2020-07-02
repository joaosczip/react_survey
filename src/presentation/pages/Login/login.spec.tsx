import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';

import Login from './';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import FormContext from '@/presentation/contexts/form/form-context';

const Sut = () => {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
};

describe('LoginPage', () => {
  it('should not render spinner and error on start', () => {
    render(<Sut />);
    const errorContainer = screen.getByTestId('error-container');
    expect(errorContainer.childElementCount).toBe(0);
  });
});
