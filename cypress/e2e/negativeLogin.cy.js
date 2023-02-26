/// <reference types="Cypress" />

import { authLogin } from "../page_objects/loginPage";
import { negativeLogin } from "../page_objects/negativeLogin";

describe("negative login test", () => {
  beforeEach("visit app login page", () => {
    cy.visit("/login");
    cy.url().should("include", "/login");
  });

  it("login with invalid credentials", () => {
    cy.intercept({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
    }).as("negativeLogin");

    authLogin.login(
      Cypress.env("testUserEmail"),
      Cypress.env("invalidTestPassword")
    );

    negativeLogin.errorMessage.should("be.visible");

    cy.wait("@negativeLogin").then((interception) => {
      expect(interception.response.statusCode).eq(401);
    });
  });
});
