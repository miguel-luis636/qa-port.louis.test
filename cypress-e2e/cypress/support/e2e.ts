import "cypress-xpath";
import "./commands";

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("input stream")) {
    return false;
  }
});
