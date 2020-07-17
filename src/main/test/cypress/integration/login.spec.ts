import faker from 'faker';

import * as FormHelper from '../support/form-helper';
import * as Http from '../support/login-mocks';

const populateFormFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.internet.password());
};

const simulateValidSubmit = (): void => {
  populateFormFields();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });
  it('should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo obrigatório');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');
    cy.getByTestId('submit').should('be.disabled');
    cy.getByTestId('error-container').should('not.have.descendants');
  });
  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Campo email inválido');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus('password', 'Campo password inválido');
    cy.getByTestId('submit').should('be.disabled');
  });
  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    cy.getByTestId('password').focus().type(faker.internet.password());
    FormHelper.testInputStatus('password');
    cy.getByTestId('submit').should('not.be.disabled');
    cy.getByTestId('error-container').should('not.have.descendants');
  });
  it('should present error if invalid credentials are provided', () => {
    Http.mockInvalidCredentialsError();
    simulateValidSubmit();
    FormHelper.testMainError('Credenciais inválidas!');
    FormHelper.testUrl('/login');
  });
  it('should present error if api returns 400', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu! Tente novamente.');
    FormHelper.testUrl('/login');
  });
  it('should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidOk();
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password())
      .type('{enter}');
    FormHelper.testMainError('Algo de errado aconteceu! Tente novamente.');
    FormHelper.testUrl('/login');
  });
  it('should save accessToken if valid credentials are provided', () => {
    Http.mockOk();
    simulateValidSubmit();
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('error-container').should('not.exist');
    FormHelper.testUrl('/');
    FormHelper.testLocalStorageItem('accessToken');
  });
  it('should prevent multiple submits', () => {
    Http.mockOk();
    populateFormFields();
    cy.getByTestId('submit').dblclick();
    FormHelper.testHttpCallsCount(1);
  });
  it('should not call submit if form is invalid', () => {
    Http.mockOk();
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(4))
      .type('{enter}');
    FormHelper.testHttpCallsCount(0);
  });
});
