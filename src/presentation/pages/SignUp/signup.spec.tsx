import React from 'react';
import faker from 'faker';
import {
  RenderResult,
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import ThemeProvider from '@/presentation/components/ThemeProvider';

import SignUp from '.';
import { helper, ValidationStub, AddAccountSpy } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const addAccountSpy = new AddAccountSpy();

  const sut = render(
    <ThemeProvider>
      <SignUp validation={validationStub} addAccount={addAccountSpy} />
    </ThemeProvider>
  );
  return { sut, addAccountSpy };
};

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  helper.populateField('name', name);
  helper.populateField('email', email);
  helper.populateField('password', password);
  helper.populateField('passwordConfirmation', password);
  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('SignUp Page', () => {
  afterEach(cleanup);
  it('should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.testChildCount('error-container', 0);
    helper.testButtonIsDisabled('submit', true);
    helper.testStatusForField('name-status', validationError);
    helper.testStatusForField('email-status', validationError);
    helper.testStatusForField('password-status', validationError);
    helper.testStatusForField('passwordConfirmation-status', validationError);
  });
  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('name');
    const nameStatus = screen.getByTestId('name-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('Error');
  });
  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('email');
    const nameStatus = screen.getByTestId('email-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('Error');
  });
  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('password');
    const nameStatus = screen.getByTestId('password-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('Error');
  });
  it('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('passwordConfirmation');
    const nameStatus = screen.getByTestId('passwordConfirmation-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('Error');
  });
  it('should show valid name state if Validation succeds', () => {
    makeSut();
    helper.populateField('name');
    const nameStatus = screen.getByTestId('name-status');
    expect(nameStatus.title).toBe('Tudo certo!');
    expect(nameStatus.textContent).toBe('OK');
  });
  it('should show valid email state if Validation succeds', () => {
    makeSut();
    helper.populateField('email');
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('OK');
  });
  it('should show valid password state if Validation succeds', () => {
    makeSut();
    helper.populateField('password');
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('OK');
  });
  it('should show valid passwordConfirmation state if Validation succeds', () => {
    makeSut();
    helper.populateField('passwordConfirmation');
    const passwordConfirmationStatus = screen.getByTestId(
      'passwordConfirmation-status'
    );
    expect(passwordConfirmationStatus.title).toBe('Tudo certo!');
    expect(passwordConfirmationStatus.textContent).toBe('OK');
  });
  it('should enable submit button if form is valid', () => {
    makeSut();
    helper.populateField('name');
    helper.populateField('email');
    helper.populateField('password');
    helper.populateField('passwordConfirmation');
    helper.testButtonIsDisabled('submit', false);
  });
  it('should shows spinner on submit', () => {
    makeSut();
    simulateValidSubmit();
    helper.testElementExists('spinner');
  });
  it('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const nameField = screen.getByTestId('name');
    fireEvent.input(nameField, { target: { value: name } });

    const emailField = screen.getByTestId('email');
    fireEvent.input(emailField, { target: { value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.input(passwordField, { target: { value: password } });

    const passwordConfirmationField = screen.getByTestId(
      'passwordConfirmation'
    );
    fireEvent.input(passwordConfirmationField, { target: { value: password } });

    const form = screen.getByTestId('form') as HTMLFormElement;
    form.submit();
    await waitFor(() => form);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });
  it('should calls AddAccount only once', () => {
    const { addAccountSpy } = makeSut();
    simulateValidSubmit();
    simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(1);
  });
  it('should not calls AddAccount if form is invalid', () => {
    const { addAccountSpy } = makeSut({
      validationError: faker.random.words(),
    });

    const form = screen.getByTestId('form') as HTMLFormElement;
    form.submit();

    expect(addAccountSpy.callsCount).toBe(0);
  });
});
