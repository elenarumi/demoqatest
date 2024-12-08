describe('AutoComplete Widget', () => {
    it('should autocomplete values in the text input', () => {
      cy.visit('https://demoqa.com/auto-complete');
  
      const availableColors = ['Red', 'Blue', 'White', 'Green', 'Violet', 'Magenta'];

function selectRandomColor() {
  // Genera un índice aleatorio entre 0 y availableColors.length - 1
  const givenRandomOption = Cypress._.random(0, availableColors.length - 1);

  const givenColor = availableColors[givenRandomOption];
  availableColors.splice(givenRandomOption, 1);
  return givenColor;
};


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

  
  