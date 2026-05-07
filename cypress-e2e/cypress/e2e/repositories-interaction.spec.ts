describe("[Cenario-002] - Interação com os repositórios", () => {
  beforeEach(() => {
    cy.loginGithub(
      Cypress.env("LOGIN_GITHUB_EMAIL"),
      Cypress.env("LOGIN_GITHUB_PASSWORD"),
    );
    cy.get('[data-testid="github-avatar"]').should("be.visible").click();
    cy.contains("a", "Repositories").should("be.visible").click();
  });

  it("[CT-04] — Navegação para aba Repositories", () => {
    cy.navigateToRepositories();

    cy.contains("a", "Pull requests").click();
    cy.url().should("include", "/pulls");
  });

  it("[CT-05] — Criação de novo repositório", () => {
    cy.xpath("//div[contains(@class,'flex-md-justify-end')]//a[@href='/new']").should("be.visible").click();

    cy.url().should("include", "/new");

    cy.xpath("//input[@id='repository-name-input']").should("be.visible").type(`test-repo-${Date.now()}`);

    cy.contains("is available").should("be.visible");

    cy.xpath("//button[.//span[text()='Create repository']]").should("be.visible").click();

  });

   it("[CT-06] — Criação de repositório com nome duplicado", () => {
    cy.xpath("//div[contains(@class,'flex-md-justify-end')]//a[@href='/new']").should("be.visible").click();

    cy.url().should("include", "/new");

    cy.xpath("//input[@id='repository-name-input']").should("be.visible").type(`pull-test`);

    cy.contains("pull-test already exists in this account").should("be.visible");

  });
});
