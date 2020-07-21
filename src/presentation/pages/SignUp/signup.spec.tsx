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
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import SignUp from '.';
import {
  helper,
  ValidationStub,
  AddAccountSpy,
  UpdateCurrentAccountMock,
} from '@/presentation/test';
import { EmailAddressAlreadyInUseError } from '@/domain/errors';

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
  updateCurrentAccount: UpdateCurrentAccountMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({
  initialEntries: ['/signup'],
});
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const addAccountSpy = new AddAccountSpy();
  const updateCurrentAccount = new UpdateCurrentAccountMock();

  const sut = render(
    <ThemeProvider>
      <Router history={history}>
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
          updateCurrentAccount={updateCurrentAccount}
        />
      </Router>
    </ThemeProvider>
  );
  return { sut, addAccountSpy, updateCurrentAccount };
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
    helper.testStatusForField('name-label', validationError);
    helper.testStatusForField('email-label', validationError);
    helper.testStatusForField('password-label', validationError);
    helper.testStatusForField('passwordConfirmation-label', validationError);
  });
  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('name');
    helper.testStatusForField('name-label', validationError);
  });
  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('email');
    helper.testStatusForField('email-label', validationError);
  });
  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('password');
    helper.testStatusForField('password-label', validationError);
  });
  it('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('passwordConfirmation');
    helper.testStatusForField('passwordConfirmation-label', validationError);
  });
  it('should show valid name state if Validation succeds', () => {
    makeSut();
    helper.populateField('name');
    helper.testStatusForField('name-label', '');
  });
  it('should show valid email state if Validation succeds', () => {
    makeSut();
    helper.populateField('email');
    helper.testStatusForField('email-label', '');
  });
  it('should show valid password state if Validation succeds', () => {
    makeSut();
    helper.populateField('password');
    helper.testStatusForField('password-label', '');
  });
  it('should show valid passwordConfirmation state if Validation succeds', () => {
    makeSut();
    helper.populateField('passwordConfirmation');
    helper.testStatusForField('passwordConfirmation-label', '');
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
  it('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut();
    const error = new EmailAddressAlreadyInUseError();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
    simulateValidSubmit();
    const mainError = await screen.findByTestId('main-error');
    expect(mainError.textContent).toBe(error.message);
    helper.testChildCount('error-container', 1);
  });
  it('should call SaveAccessToken on success', async () => {
    const { updateCurrentAccount, addAccountSpy } = makeSut();

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

    expect(updateCurrentAccount.account).toEqual(addAccountSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });
  it('should present error if SaveAccessToken fails', async () => {
    const { updateCurrentAccount } = makeSut();
    const error = new EmailAddressAlreadyInUseError();
    jest.spyOn(updateCurrentAccount, 'save').mockRejectedValueOnce(error);
    await simulateValidSubmit();
    const mainError = await screen.findByTestId('main-error');
    expect(mainError.textContent).toBe(error.message);
    helper.testChildCount('error-container', 1);
  });
  it('should go to login page', () => {
    makeSut();
    const loginLink = screen.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/login');
  });
});
