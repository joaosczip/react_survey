import * as FormHelper from '../support/form-helper';

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
});
