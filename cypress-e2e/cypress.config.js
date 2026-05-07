require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: true,
    html: true,
    json: true,
  },

  env: {
    GITHUB_EMAIL: process.env.GITHUB_EMAIL,
    GITHUB_PASSWORD: process.env.GITHUB_PASSWORD,
  },

  e2e: {
    baseUrl: "https://www.github.com",
    specPattern: "cypress/e2e/**/*.spec.ts",
    supportFile: "cypress/support/e2e.ts",

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
