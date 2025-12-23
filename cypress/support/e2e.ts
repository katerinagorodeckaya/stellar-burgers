import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      setTokens(): Chainable<void>;
      clearTokens(): Chainable<void>;
    }
  }
}
