import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './index';
import Context from '@/presentation/contexts/form/form-context';
import ThemeProvider from '../ThemeProvider';

const makeSut = () =>
  render(
    <ThemeProvider>
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    </ThemeProvider>
  );

describe('InputComponent', () => {
  it('should begin with readOnly', () => {
    makeSut();
    const input = screen.getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
  it('should remove readOnly on focus', () => {
    makeSut();
    const input = screen.getByTestId('field') as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});
