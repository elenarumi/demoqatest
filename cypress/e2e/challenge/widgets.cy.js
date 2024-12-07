describe('AutoComplete Widget', () => {
    it('should autocomplete values in the text input', () => {
      cy.visit('https://demoqa.com/auto-complete');
  
      const availableColors = ['Red', 'Blue', 'White', 'Green', 'Violet', 'Magenta'];

     function selectRandomColor() {
      const givenRandomOption = Cypress._.random(availableColors.length);
      const givenColor = availableColors[givenRandomOption];
      availableColors.splice(givenRandomOption, 1);
      return givenColor;
    }

    const givenColor = selectRandomColor();

      cy.get('#autoCompleteMultipleInput', { timeout: 10000 })
        .should('be.visible')
        .type(`${givenColor}{enter}`);
  
      

        cy.getAutoCompletedValues().then(values => expect (values).includes(givenColor));


        const givenColor2 = selectRandomColor();

      cy.get('#autoCompleteMultipleInput', { timeout: 10000 })
        .should('be.visible')
        .type(`${givenColor2}{enter}`);
  
      

        cy.getAutoCompletedValues().then(values => expect (values).includes(givenColor2));


        const givenColor3 = selectRandomColor();

      cy.get('#autoCompleteMultipleInput', { timeout: 10000 })
        .should('be.visible')
        .type(`${givenColor3}{enter}`);
  
      

        cy.getAutoCompletedValues().then(values => expect (values).includes(givenColor3));
      });

    });

  
  