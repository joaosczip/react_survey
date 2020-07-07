import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './index';
import Context from '@/presentation/contexts/form/form-context';

const makeSut = () =>
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field" />
    </Context.Provider>
  );

describe('InputComponent', () => {
  it('should begin with readOnly', () => {
    makeSut();
    const input = screen.getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
