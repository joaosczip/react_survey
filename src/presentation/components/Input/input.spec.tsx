import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './index';
import Context from '@/presentation/contexts/form/form-context';

describe('InputComponent', () => {
  it('should begin with readOnly', () => {
    render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    );
    const input = screen.getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
