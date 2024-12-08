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

    cy.get('.auto-complete__menu') // Selecciona el menú desplegable
    .find('div') // Busca las opciones dentro del menú
    .eq(1) // Selecciona la segunda opción (índice 1)
    .invoke('text') // Extrae el texto de la opción
    .then((text) => {
      cy.log(text); // Registra el texto extraído
    });
        
    });
    });



