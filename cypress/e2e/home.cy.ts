/// <reference types="cypress" />

const randomProjectCode = () => {
  const randomLetter = () =>
    String.fromCharCode(0 | (Math.random() * 26 + 97)).toUpperCase();
  const randomCode = Array.from({ length: 3 }, randomLetter).join('');
  const randomNumber = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `${randomCode}-${randomNumber}`;
};

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/'); // Visit the home page
  });

  it('renders the main heading', () => {
    cy.get('h1').contains('Project'); // Check for the main heading
  });

  it('submits the form successfully with valid data', () => {
    const projectCode = randomProjectCode();
    cy.get('input[name="projectCode"]').type(projectCode); // Fill in project code
    cy.get('textarea[name="projectDescription"]').type(
      'A new project description.',
    ); // Fill in project description
    cy.get('select').select('iPhone', { force: true }); // Select product line
    cy.get('input[name="wantNotifications"]').check({ force: true }); // Enable notifications
    cy.get('button[type="submit"]').click(); // Submit the form

    // Check for success message
    cy.contains(
      `Thank you for sending us this important information about ${projectCode}!`,
    ).should('be.visible');
  });

  it('displays validation errors when submitting invalid data', () => {
    cy.get('button[type="submit"]').click(); // Submit the form without filling in required fields

    // Check for validation error messages
    cy.contains('Failed to submit form. Please check the errors above.').should(
      'be.visible',
    );
  });

  it('shows loading state when submitting the form', () => {
    const projectCode = randomProjectCode();
    cy.get('input[name="projectCode"]').type(projectCode); // Fill in project code
    cy.get('textarea[name="projectDescription"]').type(
      'A new project description.',
    ); // Fill in project description
    cy.get('select').select('iPhone', { force: true }); // Select product line
    cy.get('button[type="submit"]').click(); // Submit the form

    // Check for loading state
    cy.get('button[type="submit"]').should(
      'have.attr',
      'aria-disabled',
      'true',
    ); // Button should be disabled
  });
});
