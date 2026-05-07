declare global {
  namespace Cypress {
    interface Chainable {
      loginGithub(email: string, password: string): Chainable<void>;
      navigateToRepositories(): Chainable<void>;
    }
  }
}


export {};
