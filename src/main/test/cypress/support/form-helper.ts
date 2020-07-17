const baseUrl: string = Cypress.config().baseUrl;

export const testInputStatus = (
  testId: string,
  errorMessage?: string
): void => {
  const attr = `${errorMessage ? '' : 'not.'}have.attr`;
  cy.getByTestId(testId).should(attr, 'title', errorMessage);
  cy.getByTestId(`${testId}-label`).should(attr, 'title', errorMessage);
};

export const testMainError = (error: string) => {
  cy.getByTestId('spinner').should('not.exist');
  cy.getByTestId('main-error').should('have.text', error);
};

export const testHttpCallsCount = (count: number) => {
  cy.get('@request.all').should('have.length', count);
};

export const testUrl = (path: string) => {
  cy.url().should('eq', `${baseUrl}${path}`);
};

export const testLocalStorageItem = (key: string): void => {
  cy.window().then((window) => assert.isOk(window.localStorage.getItem(key)));
};
