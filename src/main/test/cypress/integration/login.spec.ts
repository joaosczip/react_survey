import faker from 'faker';

describe('Login', () => {
  beforeEach(() => cy.visit('login'));
  it('should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', 'Error');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', 'Error');
    cy.getByTestId('submit').should('be.disabled');
    cy.getByTestId('error-container').should('not.have.descendants');
  });
  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo email inválido')
      .should('contain.text', 'Error');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4));
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo password inválido')
      .should('contain.text', 'Error');
    cy.getByTestId('submit').should('be.disabled');
  });
});
