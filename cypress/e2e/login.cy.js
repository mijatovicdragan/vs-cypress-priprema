/// <reference types="Cypress" />

import { authLogin } from "../page_objects/loginPage";

describe("login test", () => {
  beforeEach("visit app login page", () => {
    cy.visit("/login");
    cy.url().should("include", "/login");
  });

  it("login with valid credentials", () => {
    cy.intercept({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
    }).as("succesfulLogin");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/my-organizations`,
    }).as("getMyOrganizations");

    authLogin.login(
      Cypress.env("testUserEmail"),
      Cypress.env("testUserPassword")
    );

    cy.url().should("not.include", "login");
    authLogin.userName.should("contain", "Neki Korisnik");
    authLogin.loginPageHeading.should("not.exist");

    cy.wait("@succesfulLogin").then((interception) => {
      expect(interception.response.statusCode).eq(200);
      expect(interception.response.body.token).to.exist;
    });

    cy.wait("@getMyOrganizations").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    cy.url().should("include", "/my-organizations");
  });
});
