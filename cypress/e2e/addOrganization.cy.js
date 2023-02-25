/// <reference types="Cypress" />

import { addOrganization } from "../page_objects/addOrganization";
import { faker } from "@faker-js/faker";

describe("add organization test", () => {
  before("log into the app", () => {
    cy.loginBefore();
    cy.visit("/");
    cy.url().should("include", "my-organizations");

    addOrganization.myOrganizationTitle
      .should("be.visible")
      .and("have.text", "My Organizations");
  });

  it("create organization with valid data", () => {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
      (req) => {}
    ).as("succesfulCreateOrg");
    let randomOrgName = faker.company.name();
    addOrganization.createOrganization(randomOrgName);
    cy.wait("@succesfulCreateOrg").then((request) => {
      expect(request.response.statusCode).to.eql(201);
    });
  });
});
