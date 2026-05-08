require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
  },

  env: {
    LOGIN_GITHUB_EMAIL: process.env.LOGIN_GITHUB_EMAIL,
    LOGIN_GITHUB_PASSWORD: process.env.LOGIN_GITHUB_PASSWORD,
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
