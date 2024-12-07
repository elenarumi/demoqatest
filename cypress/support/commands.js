// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
  
  Cypress.Commands.add('getAutoCompletedValues', () => {
    const autocompletedValues = [];
    return cy.get('.auto-complete__multi-value__label', { timeout: 10000 })
      .should(($elements) => {
        cy.log('Elementos encontrados:', $elements.length);
        expect($elements.length).to.be.greaterThan(0);
      })
      .each(($element) => {
        autocompletedValues.push($element.text().trim());
      })
      .then(() => autocompletedValues);
  });
  

