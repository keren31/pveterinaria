const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    projectId: "pjv1yv",
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
  },
});