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
    const mobile = "568778890";
    const subjects = "Jira, Cypress";
    const fileName = 'example.json'; 
    cy.visit('https://demoqa.com/automation-practice-form');

    //ACT
    
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('input[id="gender-radio-2"]').check({ force: true });
    cy.get('#userNumber').type(mobile);
    //date of birth picker

    cy.get('#dateOfBirthInput').click(); // Replace with the actual selector if different

    // Navigate to the desired month and year (if necessary)
    // Example: Navigating to November 2024
    cy.get('.react-datepicker__month-select').select('November'); // Month dropdown
    cy.get('.react-datepicker__year-select').select('2024'); // Year dropdown

    // Select the specific day
    cy.get('div.react-datepicker__day--025').click(); 
    cy.get('#dateOfBirthInput').should('have.value', '25 Nov 2024'); 

  // Subjects
    cy.get('div.subjects-auto-complete__value-container.subjects-auto-complete__value-container--is-multi.css-1hwfws3').type(subjects)
  //Pruebas de checkboxes de Hobbies
    cy.get('#hobbies-checkbox-1').check({ force: true }) // Selector del checkbox "Sports"
      .should('be.checked'); 
    cy.get('#hobbies-checkbox-2').check({ force: true }) // Selector del checkbox "Reading"
      .should('be.checked'); // Verificar que está marcado
    cy.get('#hobbies-checkbox-3').check({ force: true }) // Selector del checkbox "Music"
      .should('be.checked'); 
// Desmarcar el checkbox de "Sports"
cy.get('#hobbies-checkbox-1').uncheck({ force: true }) // Selector del checkbox "Sports"
.should('not.be.checked'); // Verificar que está desmarcado
cy.get('#hobbies-checkbox-2').uncheck({ force: true }) // Selector del checkbox "Reading"
      .should('not.be.checked'); // Verificar que está desmarcad

cy.get('#hobbies-checkbox-3').uncheck({ force: true }) // Selector del checkbox "Music"
      .should('not.be.checked');

      // Seleccionar múltiples checkboxes
  cy.get('#hobbies-checkbox-1').check({ force: true }); // "Sports"
  cy.get('#hobbies-checkbox-2').check({ force: true }); // "Reading"

    // Verificar que ambos están seleccionados
  cy.get('#hobbies-checkbox-1').should('be.checked');


    // Adjuntar el archivo al input de tipo file
    cy.get('#uploadPicture').attachFile(fileName); // Adjuntar el archivo

    cy.get('#uploadPicture').then((input) => {
      // Extraer el valor del campo
      const filePath = input.val();
      // Validar que contiene el nombre del archivo
      expect(filePath).to.include(fileName);
    });

  });
});

