/// <reference types="Cypress" />

import { authLogin } from "../page_objects/loginPage"

const credentials = {
    email: "pajapatak@test.com",
    password: "pajapatak1"
};

describe("login test",() => {
    beforeEach("visit app login page", () => {
        cy.visit ("/login");
        cy.url().should("include", "/login");
    })


    it("login with valid credentials", () => {
        cy.intercept(
             "POST",
             "https://cypress-api.vivifyscrum-stage.com/api/v2/login", (req) => {}
          ).as("succesfulLogin");

        authLogin.login(credentials.email, credentials.password);
        cy.url().should("not.include", "login");
        authLogin.userName.should("contain", "Neki Korisnik");
        cy.wait("@succesfulLogin").then((request) => {
            expect(request.response.statusCode).to.eql(200);
        });
        });


})