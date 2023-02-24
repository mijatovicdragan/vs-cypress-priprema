class AddOrganization {
    get addOrganizationButton(){
        return cy.get(".vs-c-my-organization--add-new");
    }

    get myOrganizationTitle() {
        return cy.get("header").find("span").first();
    }

    get organizationNameInput() {
        return cy.get('input[type="text"]');
    }

    get nextBtn (){
        return cy.get('button[name="next_btn"]');
    }

    get createBtn () {
        return cy.get('button[name="next_btn"]');
    }

    createOrganization(orgName) {
        this.organizationButton.click();
        this.organizationNameInput.type(orgName);
        this.nextBtn.click();
        this.createBtn.click();

    }

}
export const addOrganization = new AddOrganization();

