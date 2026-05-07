Cypress.Commands.add("loginGithub", (email, password) => {
  cy.visit("/");

  cy.contains("a", "Sign in").should("be.visible").click();

  cy.url().should("include", "github.com/login");

  cy.get('[name="login"]').should("be.visible").type(email);

  cy.get('[name="password"]').should("be.visible").type(password);

  cy.get('[name="commit"]').click();

  cy.url().should("include", "github.com/");
});

Cypress.Commands.add("navigateToRepositories", () => {
  cy.url().should("include", "github.com/miguel-testes?tab=repositories");
  cy.get("h3.wb-break-all a").then(($repos) => {
    const reposArray = [...$repos];
    const randomRepo =
      reposArray[Math.floor(Math.random() * reposArray.length)];

    const repoName = randomRepo.innerText;

    cy.log(`Repositório escolhido: ${repoName}`);

    cy.wrap(randomRepo).click();
  });
});
