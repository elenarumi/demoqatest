

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
  it('TC2 Checkbox: Should check and display random labels', () => {
    cy.visit("https://demoqa.com/checkbox");
  
    // Expande todos los nodos
    cy.get('.rct-option-expand-all').click();
  
    // Encuentra todos los checkboxes disponibles y selecciona uno aleatorio
    cy.get('.rct-node input[type="checkbox"]').then(($checkboxes) => {
      const randomNodeIndex = Math.floor(Math.random() * $checkboxes.length);
  
      // Selecciona el checkbox aleatorio
      cy.wrap($checkboxes.eq(randomNodeIndex))
        .check({ force: true })
        .should('be.checked');
  
      // Obtén el texto del checkbox seleccionado
      const selectedLabel = Cypress.$($checkboxes.eq(randomNodeIndex))
        .closest('.rct-node')
        .find('.rct-title')
        .text()
        .trim();
  
      cy.log('Randomly Selected Label:', selectedLabel);
  
      // Normaliza el texto esperado dividiéndolo en palabras clave
      const expectedWords = selectedLabel.toLowerCase().split(/\s+/);
  
      // Verifica que las palabras seleccionadas aparezcan en los resultados
      cy.get('#result .text-success')
        .should(($result) => {
          // Normaliza el texto del resultado transformándolo a minúsculas
          const resultText = $result.text().toLowerCase();
  
          // Asegura que al menos una palabra esperada aparece en el texto del resultado
          const matchedWords = expectedWords.filter((word) =>
            resultText.includes(word)
          );
  
          expect(matchedWords).to.have.length.greaterThan(0, `Expected to find at least one match for: ${expectedWords.join(', ')}`);
        })
        .and('be.visible');
    });
  });
  
  
  // TC3 Radio buttons
  it('TC3 Radio buttons', () => {
    const radioYes = "Yes";
    const radioImpressive = "Impressive";
    const radioNo = "No";
    cy.visit('https://demoqa.com/radio-button');


    function getRadio(radioName) {
      // Encuentra el radio button por su etiqueta
      return cy.contains('.custom-control-label', radioName).siblings('input');
    }
  
    // Selecciona el radio button "Yes"
    getRadio(radioYes)
        .check({ force: true })
        .then(() => {
          cy.get('.text-success').should('have.text', radioYes);
        });

    getRadio(radioImpressive)
       .check({ force: true })
       .then(() => {
           cy.get('.text-success').should('have.text', radioImpressive);
    });
  
    // Verifica que el radio button "Yes" está seleccionado
    getRadio(radioNo).should('be.disabled');
  });

  it('TC4 Buttons', () => {

    cy.visit('https://demoqa.com/buttons');
    cy.contains ('Double Click Me').dblclick();
    cy.contains ('Right Click Me').rightclick();
    cy.get('button.btn:not([id$=Btn])').click();


});

it('TC5 Dynamic buttons', () => {
  cy.visit('https://demoqa.com/dynamic-properties');
  cy.get("#enableAfter").should('not.be.enabled');
  cy.get("#visibleAfter").should('not.exist');
  cy.wait(5000);
  cy.get("#enableAfter").should('be.enabled');
  cy.get("#visibleAfter").should('be.visible');
  //traducir dc3545 en rgb
  cy.get("#colorChange").should('have.css', 'color', 'rgb(220, 53, 69)');
});

it('TC6 Upload and download a file', () => {
  cy.visit('https://demoqa.com/upload-download');

  // Verify and log the download file name
  cy.get('#downloadButton')
    .invoke('attr', 'download')
    .should('eq', 'sampleFile.jpeg')
    .then((fileName) => {
      cy.log(`File to download: ${fileName}`);

      // Click the download button
      cy.get('#downloadButton').click();

      const downloadPath = "cypress/downloads";

      // Verify the file exists in the downloads folder
      cy.readFile(downloadPath, { timeout: 10000 }).should('exist');

      // Upload the file
      cy.get('#uploadFile').selectFile(downloadPath);

      // Verify the uploaded file path
      cy.get('#uploadedFilePath').should('contain.text', fileName);
    });
});
});
