describe("[Cenario-003] - Logout e finalização", () => {
  beforeEach(() => {
    cy.loginGithub(
      Cypress.env("LOGIN_GITHUB_EMAIL"),
      Cypress.env("LOGIN_GITHUB_PASSWORD"),
    );

    cy.get('[data-testid="github-avatar"]').should("be.visible").click();
    cy.get(`[title="miguel-testes"]`).should("be.visible");
  });
  it("[CT-07] — Logout do sistema", () => {
    cy.contains("a", "Sign out").should("be.visible").click();
    cy.url().should("include", "/logout");

    cy.contains("input", "Sign out").should("be.visible").click();

    cy.url().should("eq", "https://github.com/");

    cy.contains("Sign in").should("be.visible");

    cy.get('[data-testid="github-avatar"]').should("not.exist")
  });
});
