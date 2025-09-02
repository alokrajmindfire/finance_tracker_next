describe('Authentication', () => {
  const testUser = {
    fullName: 'Cypress Test',
    email: 'cyprestest666611@test.com',
    password: 'TestPassword123',
  };

  it('should register a new user or login if user already exists', () => {
    cy.visit('http://localhost:3001/register');

    cy.get('input#fullName').type(testUser.fullName);
    cy.get('input#email').type(testUser.email);
    cy.get('input#password').type(testUser.password);

    cy.get('button[type="submit"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
  });

  it('should login an existing user', () => {
    cy.visit('http://localhost:3001/login');

    cy.get('input#email').type(testUser.email);
    cy.get('input#password').type(testUser.password);

    cy.get('button[type="submit"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
    cy.contains('Login successfully').should('exist');
  });

  it('should show validation errors on empty submit (login)', () => {
    cy.visit('http://localhost:3001/login');
    cy.get('button[type="submit"]').click();
    cy.get('p.text-red-600').should('contain.text', 'Email is required');
    cy.get('p.text-red-600').should('contain.text', 'Password is required');
  });

  it('should show validation errors on empty submit (register)', () => {
    cy.visit('http://localhost:3001/register');
    cy.get('button[type="submit"]').click();
    cy.get('p.text-red-600').should('contain.text', 'Full name is required');
    cy.get('p.text-red-600').should('contain.text', 'Email is required');
    cy.get('p.text-red-600').should('contain.text', 'Password is required');
  });
});
describe('Dashboard', () => {
  const testUser = {
    email: 'cyprestest666611@test.com',
    password: 'TestPassword123',
  };

  beforeEach(() => {
    // Login before each test
    cy.visit('http://localhost:3001/login');
    cy.get('input#email').type(testUser.email);
    cy.get('input#password').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
  });

  it('should display stats cards on dashboard', () => {
    cy.contains('Total Income').should('exist');
    cy.contains('Total Expense').should('exist');
    cy.contains('Balance').should('exist');
  });

  it('should display monthly chart', () => {
    cy.get("[data-testid='monthly-chart']").should('exist');
  });

  it('should display expense chart', () => {
    cy.get("[data-testid='expense-chart']").should('exist');
  });

  it('should display income chart', () => {
    cy.get("[data-testid='category-breakdown']").should('exist');
  });
});

describe('Transactions', () => {
  const testTransaction = {
    type: 'expense',
    amount: '123.45',
    description: 'Test transaction',
    category: 'rent',
    date: '2025-09-02',
  };

  beforeEach(() => {
    cy.login();
    cy.visit('http://localhost:3001/transaction');
  });

  it('should show loading state then table', () => {
    cy.contains('Loading transactions...').should('exist');
    cy.get('table', { timeout: 10000 }).should('exist');
  });

  it('should open add transaction form and show validation errors', () => {
    cy.contains('Add Transaction').click();
    cy.contains('Save Transaction').click();
    cy.contains('Amount must be positive');

    cy.contains('Description is required').should('exist');
    cy.contains('Category is required').should('exist');
    cy.contains('Date is required').should('exist');
  });

  it('should add a new transaction', () => {
    cy.contains('Add Transaction').click();

    cy.get('input#amount').type(testTransaction.amount);
    cy.get('input#description').type(testTransaction.description);

    cy.get('#category').click();

    cy.get('[role="listbox"]')
      .contains(testTransaction.category)
      .click({ force: true });

    cy.get('input#date').type(testTransaction.date);

    cy.contains('Save Transaction').click();

    cy.contains('Transaction added successfully', { timeout: 10000 }).should(
      'exist'
    );
    cy.contains(testTransaction.description).should('exist');
  });

  it('should edit an existing transaction', () => {
    cy.contains(testTransaction.description)
      .parents('tr')
      .within(() => {
        cy.get('button[data-slot="dialog-trigger"]').click({ force: true });
      });

    cy.get('input#description').clear().type('Updated transaction');
    cy.contains('Save Changes').click();

    cy.contains('Transaction updated successfully', { timeout: 10000 }).should(
      'exist'
    );
    cy.contains('Updated transaction').should('exist');
  });

  it('should delete a transaction', () => {
    cy.contains('Updated transaction')
      .parents('tr')
      .within(() => {
        cy.get('button.text-red-600').click({ force: true });
      });

    cy.contains('Transaction deleted successfully', { timeout: 10000 }).should(
      'exist'
    );
    cy.contains('Updated transaction').should('not.exist');
  });
});

describe('Categories', () => {
  const testCategory = {
    name: 'Test Category',
  };

  beforeEach(() => {
    cy.login();
    cy.visit('http://localhost:3001/categories');
  });

  it('should show loading state then categories grid', () => {
    cy.contains('Loading categories...').should('exist');
    cy.get('.grid', { timeout: 10000 }).should('exist');
  });

  it('should open add category form and show validation errors', () => {
    cy.contains('Add Category').click();
    cy.contains('Save Category').click();

    cy.contains('Name must be at least 2 characters').should('exist');
  });

  it('should add a new category', () => {
    cy.contains('Add Category').click();
    cy.get('input#name').type(testCategory.name);

    cy.contains('Save Category').click();

    cy.contains('Category added successfully', { timeout: 10000 }).should(
      'exist'
    );
    cy.contains(testCategory.name).should('exist');
  });
});
