/// <reference types="Cypress" />

import { addOrganization } from "../page_objects/addOrganization";
import { archiveOrganization } from "../page_objects/archiveOrganization";
import { faker } from "@faker-js/faker";

describe("archive organization test", () => {
  before("log in and create organization", () => {
    cy.loginBefore();
    cy.visit("/");
    cy.url().should("include", "my-organizations");
    let randomOrgName = faker.company.name();
    addOrganization.createOrganization(randomOrgName);
  });
  it("archive organization", () => {
    archiveOrganization.configurationBtn.click();
    archiveOrganization.archiveBtn.click();
    archiveOrganization.saveBtn.click();
    archiveOrganization.archivedText
      .should("be.visible")
      .and("contain", "archived");
  });
});
