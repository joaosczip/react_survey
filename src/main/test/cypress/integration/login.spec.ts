import faker from 'faker';

const baseUrl: string = Cypress.config().baseUrl;

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
  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('have.text', 'OK');
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('have.text', 'OK');
    cy.getByTestId('submit').should('not.be.disabled');
    cy.getByTestId('error-container').should('not.have.descendants');
  });
  it('should present error if invalid credentials are provided', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('submit').click();
    cy.getByTestId('error-container')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('have.text', 'Credenciais inválidas!');
    cy.url().should('eq', `${baseUrl}/login`);
  });
});
