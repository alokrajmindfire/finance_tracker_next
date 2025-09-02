/// <reference types="cypress" />

// ✅ Define custom login command
Cypress.Commands.add('login', (email?: string, password?: string) => {
  const testUser = {
    email: email || 'cyprestest666611@test.com',
    password: password || 'TestPassword123',
  };

  cy.visit('http://localhost:3001/login');

  cy.get('input#email').type(testUser.email);
  cy.get('input#password').type(testUser.password);
  cy.get("button[type='submit']").click();

  // ✅ wait until dashboard is loaded
  cy.location('pathname', { timeout: 10000 }).should('eq', '/');
  cy.contains('Login successfully', { timeout: 10000 }).should('exist');
});

// Extend TypeScript definitions
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in a user.
       * @example cy.login()
       * @example cy.login("user@example.com", "password123")
       */
      login(email?: string, password?: string): Chainable<void>;
    }
  }
}

export {};
