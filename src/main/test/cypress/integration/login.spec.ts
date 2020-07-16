import faker from 'faker';

const baseUrl: string = Cypress.config().baseUrl;

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
    cy.server();
  });
  it('should load with correct initial state', () => {
    cy.getByTestId('email')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly');
    cy.getByTestId('email-label').should(
      'have.attr',
      'title',
      'Campo obrigatório'
    );
    cy.getByTestId('password')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly');
    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Campo obrigatório'
    );
    cy.getByTestId('submit').should('be.disabled');
    cy.getByTestId('error-container').should('not.have.descendants');
  });
  it('should present error state if form is invalid', () => {
    cy.getByTestId('email')
      .focus()
      .type(faker.random.word())
      .should('have.attr', 'title', 'Campo email inválido');
    cy.getByTestId('email-label').should(
      'have.attr',
      'title',
      'Campo email inválido'
    );
    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(4))
      .should('have.attr', 'title', 'Campo password inválido');
    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Campo password inválido'
    );
    cy.getByTestId('submit').should('be.disabled');
  });
  it('should present valid state if form is valid', () => {
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .should('not.have.attr', 'title');
    cy.getByTestId('email-label').should('not.have.attr', 'title');
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password())
      .should('not.have.attr', 'title');
    cy.getByTestId('password-label').should('not.have.attr', 'title');
    cy.getByTestId('submit').should('not.be.disabled');
    cy.getByTestId('error-container').should('not.have.descendants');
  });
  it('should present error if invalid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words(),
      },
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('submit').click();
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should('have.text', 'Credenciais inválidas!');
    cy.url().should('eq', `${baseUrl}/login`);
  });
  it('should present error if api returns 400', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 400,
      response: {
        error: faker.random.words(),
      },
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('submit').click();
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should(
      'have.text',
      'Algo de errado aconteceu! Tente novamente.'
    );
    cy.url().should('eq', `${baseUrl}/login`);
  });
  it('should present UnexpectedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalid: faker.random.words(),
      },
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password())
      .type('{enter}');
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should(
      'have.text',
      'Algo de errado aconteceu! Tente novamente.'
    );
    cy.url().should('eq', `${baseUrl}/login`);
  });
  it('should save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid(),
      },
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('submit').click();
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('error-container').should('not.exist');
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    );
  });
  it('should prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid(),
      },
    }).as('request');
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('submit').dblclick();
    cy.get('@request.all').should('have.length', 1);
  });
  it('should not call submit if form is invalid', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid(),
      },
    }).as('request');
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(4))
      .type('{enter}');
    cy.get('@request.all').should('have.length', 0);
  });
});
