import faker from 'faker';

import * as FormHelper from '../support/form-helper';
import * as Http from '../support/signup-mocks';

const populateFormFields = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName());
  cy.getByTestId('email').focus().type(faker.internet.email());
  const password = faker.internet.password();
  cy.getByTestId('password').focus().type(password);
  cy.getByTestId('passwordConfirmation').focus().type(password);
};

const simulateValidSubmit = (): void => {
  populateFormFields();
  cy.getByTestId('submit').click();
};

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup');
  });
  it('should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('name', 'Campo obrigatório');
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo obrigatório');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório');
    cy.getByTestId('submit').should('be.disabled');
    cy.getByTestId('error-container').should('not.have.descendants');
  });
  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(2));
    FormHelper.testInputStatus('name', 'Campo name inválido');
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Campo email inválido');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus('password', 'Campo password inválido');
    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus(
      'passwordConfirmation',
      'Campo passwordConfirmation inválido'
    );
    cy.getByTestId('submit').should('be.disabled');
  });
  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName());
    FormHelper.testInputStatus('name');
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    const password = faker.internet.password();
    cy.getByTestId('password').focus().type(password);
    FormHelper.testInputStatus('password');
    cy.getByTestId('passwordConfirmation').focus().type(password);
    FormHelper.testInputStatus('passwordConfirmation');
    cy.getByTestId('submit').should('not.be.disabled');
    cy.getByTestId('error-container').should('not.have.descendants');
  });
  it('should present email error on 403', () => {
    Http.mockForbidden();
    simulateValidSubmit();
    FormHelper.testMainError('Endereço de E-mail já está em uso.');
    FormHelper.testUrl('/signup');
  });
  it('should present error if api returns 400, 404 or 500', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu! Tente novamente.');
    FormHelper.testUrl('/signup');
  });
  it('should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidOk();
    simulateValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu! Tente novamente.');
    FormHelper.testUrl('/signup');
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
});
