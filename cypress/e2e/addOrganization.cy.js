/// <reference types="Cypress" />

import { addOrganization } from "./addOrganization.cy";
import { faker } from '@faker-js/faker';

describe ("add organization test", () => {
    beforeEach("log into the app", () => {
        cy.loginBefore();
        cy.visit("/");
        cy.url().should("include", "my-organizations");

    // addOrganization.myOrganizationTitle
    //   .should("be.visible")
    //   .and("have.text", "My Organizations");
    })

    it("create organization with valid data", () => {
        let orgId;
        let randomOrgName = faker.company.name();
        addOrganization.createOrganization(randomOrgName);
    })
})