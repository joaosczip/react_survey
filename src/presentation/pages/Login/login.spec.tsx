import React from 'react';
import { render } from '@testing-library/react';

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
  it('should ', () => {
    render(<Sut />);
  });
});
