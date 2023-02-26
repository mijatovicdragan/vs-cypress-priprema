/// <reference types="Cypress" />

import { addOrganization } from "../page_objects/addOrganization";
import { faker } from "@faker-js/faker";

describe("add organization test", () => {
  before("log into the app", () => {
    cy.intercept({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/my-organizations`,
    }).as("getMyOrganizations");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/organizations-data`,
    }).as("organizations-data");

    cy.loginBefore();
    cy.visit("/");

    cy.wait("@getMyOrganizations").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    cy.wait("@organizations-data").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    cy.url().should("include", "my-organizations");

    addOrganization.myOrganizationTitle
      .should("be.visible")
      .and("have.text", "My Organizations");
  });

  it("create organization with valid data", () => {
    cy.intercept({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/organizations`,
    }).as("createOrganization");

    let randomOrgName = faker.company.name();
    addOrganization.createOrganization(randomOrgName);

    cy.wait("@createOrganization").then((interception) => {
      expect(interception.response.statusCode).eq(201);
      expect(interception.response.body.name).eq(randomOrgName);
    });
  });
});
