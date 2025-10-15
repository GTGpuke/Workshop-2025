// N_05/fond_transparent/cypress/e2e/visual_spec.cy.js

describe('Visual Regression for Snake Loader', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  // Test 1: Takes a screenshot of the final page state.
  it('should capture the main content after loading is complete', () => {
    // Wait for the loader to become invisible
    cy.get('#loader-wrapper', { timeout: 6000 }).should('not.be.visible');
    
    // Take a screenshot of the whole page and name it
    cy.screenshot('main-content-final-state');
  });
  
  // Test 2: Takes a screenshot of the loader element.
  it('should capture the snake loader animation element', () => {
    // Ensure the loader is visible initially
    cy.get('#snake-loader').should('be.visible');

    // Take a screenshot of just the loader element
    cy.get('#snake-loader').screenshot('snake-loader-element');
  });
});