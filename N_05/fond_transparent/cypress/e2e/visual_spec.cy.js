// N_05/fond_transparent/cypress/e2e/visual_spec.cy.js

describe('Visual Regression for Snake Loader', () => {
  beforeEach(() => {
    // The path is simplified to just the filename
    cy.visit('index.html');
  });

  // Test 1: Checks the final state after the loader disappears.
  it('should match the main content after loading is complete', () => {
    // Wait for the loader to become invisible
    cy.get('#loader-wrapper', { timeout: 6000 }).should('not.be.visible');
    
    // Take a snapshot of just the main content area
    cy.get('#main-content').matchImageSnapshot('main-content-final-state');
  });
  
  // Test 2: Checks the loader itself during the loading phase.
  it('should match the snake loader animation element', () => {
    // Ensure the loader is visible initially
    cy.get('#snake-loader').should('be.visible');

    // Take a snapshot of the loader element
    cy.get('#snake-loader').matchImageSnapshot('snake-loader-element');
  });
});