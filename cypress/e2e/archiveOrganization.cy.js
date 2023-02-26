/// <reference types="Cypress" />

import { addOrganization } from "../page_objects/addOrganization";
import { archiveOrganization } from "../page_objects/archiveOrganization";
import { faker } from "@faker-js/faker";

describe("archive organization test", () => {
  before("log in and create organization", () => {
    cy.intercept({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/organizations`,
    }).as("createOrganization");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/organizations-data`,
    }).as("organizations-data");

    cy.loginBefore();
    cy.visit("/");
    cy.url().should("not.include", "login");
    cy.url().should("include", "my-organizations");

    let randomOrgName = faker.company.name();
    addOrganization.createOrganization(randomOrgName);
  });

  it("archive organization", () => {
    archiveOrganization.configurationBtn.click();
    archiveOrganization.organizationInfo.should("exist");
    archiveOrganization.archiveBtn.click();
    archiveOrganization.saveBtn.click();
    archiveOrganization.archivedText
      .should("be.visible")
      .and("contain", "archived");

    cy.wait("@createOrganization").then((interception) => {
      expect(interception.response.statusCode).eq(201);
    });
    cy.wait("@organizations-data").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });
  });
});
