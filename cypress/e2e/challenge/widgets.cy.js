describe('AutoComplete Widget', () => {
    it('should autocomplete values in the text input', () => {
      cy.visit('https://demoqa.com/auto-complete');
  
      // Wait for the input to load and type "Red"
      cy.get('#autoCompleteMultipleInput', { timeout: 10000 })
        .should('be.visible')
        .type('Red{enter}');
  
      // Assert the label with the autocomplete value exists
      cy.get('.auto-complete__multi-value__label').should('contain', 'Red');
      });
  
      // Log and verify multiple container elements

    });
  
  