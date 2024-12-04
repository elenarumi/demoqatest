module.exports = {
  e2e: {
    setupNodeEvents(on, config) {

      // implement node event listeners here
    },
    e2e: {
      pageLoadTimeout: 120000,  // Aumenta el tiempo a 2 minutos
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true
    }
  }
};

