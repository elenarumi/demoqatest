describe('Automation demo qa tools', () => {
  beforeEach(() => {
    // Prevent Cypress from failing on uncaught exceptions (e.g., from ads, analytics)
    cy.on('uncaught:exception', (err, runnable) => {
      // Return false to prevent the test from failing
      return false;
    });
  });

//TCS
  it('TC1 Submit form with credentials', () => {
   
    // Arrange
    
    const firstName = "Elenia";
    const lastName = "Buss";
    const email = "kakerbet@gmail.com";
    const mobile = "568778890";
    const subjects = "Jira, Cypress";
    const fileName = 'example.json'; 
    const myAddress = "Plaza Ciudad de Viena, 6, 1822, Madrid"
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
 cy.get('#currentAddress').type(myAddress);

  //prueba de la lista desplegable State
  cy.get('#state').click(); // Abre el menú de estados
  cy.contains('Uttar Pradesh').click(); // Selecciona "Uttar Pradesh" del menú desplegable

  //prueba de la lista desplegable city
  cy.get('#city .css-1wa3eu0-placeholder').click(); // Abre el menú desplegable de ciudades
  cy.contains('Agra').click({ force: true }); // Selecciona la opción "Agra" del menú desplegable
  
  //Subir el formulario

  cy.get('#submit').click();
});

  //TC2 Checkbox
it.only('TC2 Checkbox: Should check and display the labels', () => {
 
  let randomNodeIndex;
  cy.visit("https://demoqa.com/checkbox");
  cy.get('[for^=tree-node]').should('have.length', 1);
  cy.get('.rct-option-expand-all'). click();
  cy.get('.rct-checkbox') // Selector para los nodos de interés
  .then((nodes) => {
    const count = nodes.length; // Número total de nodos encontrados
    const randomNodeIndex = Cypress._.random(0, count - 1); // Genera un índice aleatorio entre 0 y count - 1
    cy.wrap(nodes).eq(randomNodeIndex).click();
    
    cy.get('[type=checkbox]').eq(randomNodeIndex).check({ force: true });
    cy.get('[type=checkbox]').eq(randomNodeIndex).should('be.checked');

    cy.get('[type=checkbox]').eq(0).check({ force: true });
    cy.get('[type=checkbox]').eq(0).should('be.checked');


  cy.get('[type=checkbox]').eq(randomNodeIndex).uncheck({ force: true });
  cy.get('[type=checkbox]').eq(randomNodeIndex).should('not.be.checked'); // Selecciona y hace clic en el nodo aleatorio
 
});

    
     const labels = [];
     cy.get('.rct-checkbox').find('.rct-icon.rct-icon-check').then((elements) => {
      // Itera sobre los nodos seleccionados
      elements.each((index, element) => {
        // Encuentra el texto asociado al checkbox marcado
        const text = Cypress.$(element).closest('.rct-node').find('.rct-title').text();
        labels.push(text);
      });

    
      const successTexts =[];
      cy.get('#result .text-success').each(element => {
      
        successTexts.push(element.text());
      })

     it('Validates selected and displayed items match', () => {
    const checkedLabels = labels.map(text => text.toLowerCase().replace(".doc", "").replace(" ", ""));
    const displayedTexts = successTexts.map(text => text.toLowerCase());

    cy.log('Checked Labels:', checkedLabels);
    cy.log('Displayed Texts:', displayedTexts);

    // Enhanced assertion to avoid strict order dependency
    expect(displayedTexts).to.have.members(checkedLabels);
});

    });
  });
});

