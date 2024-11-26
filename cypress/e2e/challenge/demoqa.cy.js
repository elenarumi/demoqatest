describe('Automation demo qa tools', () => {
  beforeEach(() => {
    // Prevent Cypress from failing on uncaught exceptions (e.g., from ads, analytics)
    cy.on('uncaught:exception', (err, runnable) => {
      // Return false to prevent the test from failing
      return false;
    });
  });


  it('TC1 Submit form with credentials', () => {
   
    // Arrange
    
    const firstName = "Elenia";
    const lastName = "Buss";
    const email = "kakerbet@gmail.com";

    cy.visit('https://demoqa.com/automation-practice-form');

    //ACT
    
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('input[id="gender-radio-2"]').check({ force: true });

  });
});

