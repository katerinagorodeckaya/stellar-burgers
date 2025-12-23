Cypress.Commands.add('setTokens', () => {
  localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.setCookie('accessToken', 'test-access-token');
});

Cypress.Commands.add('clearTokens', () => {
  localStorage.removeItem('refreshToken');
  cy.clearCookie('accessToken');
});
