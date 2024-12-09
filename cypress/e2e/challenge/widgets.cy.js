describe('AutoComplete Widget', () => {
  beforeEach(() => {
    // Interceptar y bloquear scripts de terceros
    cy.intercept('https://serving.stat-rock.com/**', { statusCode: 200, body: {} }).as('ads');
    cy.intercept('https://ep1.adtrafficquality.google/**', { statusCode: 200, body: {} }).as('analytics');

    // Ignorar errores de scripts de terceros
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Script error')) {
        return false; // Ignorar errores no controlados
      }
    });
  });

  it('should autocomplete values in the text input', () => {
    cy.visit('https://demoqa.com/auto-complete', { failOnStatusCode: false });

    const availableColors = ['Red', 'Blue', 'White', 'Green', 'Voilet', 'Magenta'];

function selectRandomColor() {
// Genera un índice aleatorio entre 0 y availableColors.length - 1
const givenRandomOption = Cypress._.random(0, availableColors.length - 1);

const givenColor = availableColors[givenRandomOption];
availableColors.splice(givenRandomOption, 1);
return givenColor;
};

//TC1 select one color and press Enter
  const givenColor = selectRandomColor();
    cy.get('#autoCompleteMultipleInput', { timeout: 10000 }).type(`${givenColor}{enter}`);
      cy.getAutoCompletedValues().then(values => expect (values).includes(givenColor));

//TC2 Select various colors and press Enter
      const givenColor2 = selectRandomColor();
      const givenColor3 = selectRandomColor();
      const givenColor4 = selectRandomColor();
    cy.get('#autoCompleteMultipleInput', { timeout: 10000 }).type(`${givenColor2}{enter}`);
    cy.get('#autoCompleteMultipleInput', { timeout: 10000 }).type(`${givenColor3}{enter}`);
    cy.get('#autoCompleteMultipleInput', { timeout: 10000 }).type(`${givenColor4}{enter}`);
    
    cy.getAutoCompletedValues().then(values => expect (values).includes(givenColor2, givenColor3, givenColor4));
 
    
    //TC3 Select colors by clicking
    cy.get('#autoCompleteMultipleInput').type('A');

    // Paso 1: Guarda el texto de la segunda opción del menú como alias
// Paso 1: Selecciona el texto de la segunda opción del menú y guárdalo como alias
cy.get('.auto-complete__menu')
  .find('div')
  .eq(1)
  .invoke('text') // Extrae el texto
  .then((colorText) => {
    expect(colorText).to.be.a('string').and.not.be.empty;

    cy.contains('.auto-complete__menu div', colorText).click();

    // Guarda el texto seleccionado como alias para futuras verificaciones
    cy.wrap(colorText).as('selectedColorName');
  });

// Paso 2: Verifica que el texto seleccionado aparece en la lista de valores seleccionados
cy.get('@selectedColorName').then((selectedColorName) => {
  cy.get('.auto-complete__multi-value__label') // Encuentra los valores seleccionados
    .then((elements) => {
      // Extrae los textos de los elementos
      const values = Array.from(elements, (el) => el.textContent.trim());
      
      // Verifica que el valor seleccionado esté en la lista
      expect(values).to.include(selectedColorName);
    });
});

//TC5 select single color
// Paso 1: Escribe 'E' en el campo de texto
cy.get('#autoCompleteSingleContainer').type('E');

// Paso 2: Obtén todos los colores visibles en el menú desplegable
cy.get('.auto-complete__menu')
  .find('div')
  .as('displayedColors'); // Alias para los colores visibles

// Paso 3: Obtén el número de colores visibles
cy.get('@displayedColors').its('length').then((colorCount) => {
  // Genera un índice aleatorio basado en el número de colores visibles
  const colorRandomIndex = Cypress._.random(0, colorCount - 1);

  // Selecciona un color aleatorio basado en el índice generado
  cy.get('@displayedColors')
    .eq(colorRandomIndex)
    .invoke('text') // Obtén el texto del color seleccionado
    .then((colorText) => {
      // Guarda el color seleccionado como alias
      cy.wrap(colorText.trim()).as('singleColorName');

      // Haz clic en el color seleccionado
      cy.get('@displayedColors').eq(colorRandomIndex).click();
    });
});

// Paso 4: Verifica que el color seleccionado aparece en el campo de texto
cy.get('@singleColorName').then((singleColorName) => {
  cy.get('.auto-complete__single-value').should('contain', singleColorName);
});
    });
    });



