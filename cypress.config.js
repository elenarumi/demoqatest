const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Reemplaza con la URL base de tu aplicación
    setupNodeEvents(on, config) {
      // Configuración adicional de eventos si es necesaria
    },
    supportFile: 'cypress/support/e2e.js', // Asegúrate de que este archivo exista
  },
  downloadsFolder: 'cypress/downloads', // Ruta para archivos descargados
});
