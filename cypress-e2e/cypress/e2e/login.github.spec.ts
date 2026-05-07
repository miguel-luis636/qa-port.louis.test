describe("[Cenario-001] - Autenticação e navegação", () => {
  it("[CT-01] — Login com credenciais válidas", () => {
    cy.loginGithub(
      Cypress.env("LOGIN_GITHUB_EMAIL"),
      Cypress.env("LOGIN_GITHUB_PASSWORD"),
    );

    cy.get('[data-testid="github-avatar"]').should("be.visible").click();
    cy.get(`[title="miguel-testes"]`).should("be.visible");
  });

  it("[CT-02] — Login com senha inválida", () => {
    cy.loginGithub(Cypress.env("LOGIN_GITHUB_EMAIL"), "senha_invalida-1334");

    cy.contains("Incorrect username or password").should("be.visible");
  });

  it("[CT-03] — Login com email inválido", () => {
    cy.loginGithub(
      "email_invalido@gmail.com",
      Cypress.env("LOGIN_GITHUB_PASSWORD"),
    );

    cy.contains("Incorrect username or password").should("be.visible");
  });
});
