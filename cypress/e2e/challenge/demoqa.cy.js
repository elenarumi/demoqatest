describe('Automation demo qa tools', () => {
  beforeEach(() => {
    // Prevent Cypress from failing on uncaught exceptions (e.g., from ads, analytics)
    cy.on('uncaught:exception', (err, runnable) => {
      // Return false to prevent the test from failing
      return false;
    });
  });

  // TCS
  it('TC1 Submit form with credentials', () => {
    // Arrange
    const firstName = "Elenia";
    const lastName = "Buss";
    const email = "kakerbet@gmail.com";
    const mobile = "568778890";
    const subjects = "Jira, Cypress";
    const fileName = 'example.json';
    const myAddress = "Plaza Ciudad de Viena, 6, 1822, Madrid";

    cy.visit('https://demoqa.com/automation-practice-form');

    // ACT
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('input[id="gender-radio-2"]').check({ force: true });
    cy.get('#userNumber').type(mobile);

    // Date of birth picker
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('November');
    cy.get('.react-datepicker__year-select').select('2024');
    cy.get('div.react-datepicker__day--025').click();
    cy.get('#dateOfBirthInput').should('have.value', '25 Nov 2024');

    // Subjects
    cy.get('div.subjects-auto-complete__value-container.subjects-auto-complete__value-container--is-multi.css-1hwfws3').type(subjects);

    // Pruebas de checkboxes de Hobbies
    cy.get('#hobbies-checkbox-1').check({ force: true }).should('be.checked');
    cy.get('#hobbies-checkbox-2').check({ force: true }).should('be.checked');
    cy.get('#hobbies-checkbox-3').check({ force: true }).should('be.checked');
    cy.get('#hobbies-checkbox-1').uncheck({ force: true }).should('not.be.checked');
    cy.get('#hobbies-checkbox-2').uncheck({ force: true }).should('not.be.checked');
    cy.get('#hobbies-checkbox-3').uncheck({ force: true }).should('not.be.checked');
    cy.get('#hobbies-checkbox-1').check({ force: true });
    cy.get('#hobbies-checkbox-2').check({ force: true });
    cy.get('#hobbies-checkbox-1').should('be.checked');

    // Adjuntar el archivo al input de tipo file
    cy.get('#uploadPicture').attachFile(fileName);
    cy.get('#uploadPicture').then((input) => {
      const filePath = input.val();
      expect(filePath).to.include(fileName);
    });

    cy.get('#currentAddress').type(myAddress);

    // Prueba de la lista desplegable State
    cy.get('#state').click();
    cy.contains('Uttar Pradesh').click();

    // Prueba de la lista desplegable City
    cy.get('#city .css-1wa3eu0-placeholder').click();
    cy.contains('Agra').click({ force: true });

    // Subir el formulario
    cy.get('#submit').click();
  });

  // TC2 Checkbox
  it('TC2 Checkbox: Should check and display the labels', () => {
    cy.visit("https://demoqa.com/checkbox");
    cy.get('[for^=tree-node]').should('have.length', 1);
    cy.get('.rct-option-expand-all').click();

    cy.get('.rct-checkbox').then((nodes) => {
      const count = nodes.length;
      const randomNodeIndex = Cypress._.random(0, count - 1);
      cy.wrap(nodes).eq(randomNodeIndex).click();

      cy.get('[type=checkbox]').eq(randomNodeIndex).check({ force: true });
      cy.get('[type=checkbox]').eq(randomNodeIndex).should('be.checked');

      cy.get('[type=checkbox]').eq(0).check({ force: true });
      cy.get('[type=checkbox]').eq(0).should('be.checked');

      cy.get('[type=checkbox]').eq(randomNodeIndex).uncheck({ force: true });
      cy.get('[type=checkbox]').eq(randomNodeIndex).should('not.be.checked');
    });

    const labels = [];
    cy.get('.rct-checkbox').find('.rct-icon.rct-icon-check').then((elements) => {
      elements.each((index, element) => {
        const text = Cypress.$(element).closest('.rct-node').find('.rct-title').text();
        labels.push(text);
      });

      const successTexts = [];
      cy.get('#result .text-success').each((index, element) => {
        successTexts.push(Cypress.$(element).text());
      });

      const checkedLabels = labels.map(text => text.toLowerCase().replace(".doc", "").replace(" ", ""));
      const displayedTexts = successTexts.map(text => text.toLowerCase());

      cy.log('Checked Labels:', checkedLabels);
      cy.log('Displayed Texts:', displayedTexts);

      expect(displayedTexts).to.have.members(checkedLabels);
    });
  });

  // TC3 Radio buttons
  it.only('TC3 Radio buttons', () => {
    cy.visit('https://demoqa.com/radio-button');

    function getRadio(radioName) {
      // Encuentra el radio button por su etiqueta
      return cy.contains('.custom-control-label', radioName).siblings('input');
    }
  
    // Selecciona el radio button "Yes"
    getRadio('Yes').check({ force: true });
  
    // Verifica que el radio button "Yes" está seleccionado
    getRadio('Yes').should('be.checked');
  });
});
