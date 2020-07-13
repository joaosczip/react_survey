import { screen } from '@testing-library/react';

export const testChildCount = (testId: string, count: number) => {
  const element = screen.getByTestId(testId);
  expect(element.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (testId: string, isDisabled: boolean) => {
  const button = screen.getByTestId(testId) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusForField = (testId: string, validationError: string) => {
  const element = screen.getByTestId(testId);
  expect(element.title).toBe(validationError || 'Tudo certo!');
  expect(element.textContent).toBe(validationError ? 'Error' : 'OK');
};
