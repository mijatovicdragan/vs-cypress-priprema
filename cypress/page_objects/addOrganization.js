class AddOrganization {
  get addOrganizationButton() {
    return cy.get(".vs-c-my-organization--add-new");
  }

  get myOrganizationTitle() {
    return cy.get("header").find("span").first();
  }

  get organizationNameInput() {
    return cy.get(".vs-c-modal").find("input");
  }

  get nextBtn() {
    return cy.get('button[name="next_btn"]');
  }

  get createBtn() {
    return cy.get('button[name="next_btn"]');
  }

  get okBtn() {
    return cy.get(".vs-c-btn--lg");
  }

  createOrganization(orgName) {
    this.addOrganizationButton.click();
    this.organizationNameInput.type(orgName);
    this.nextBtn.click();
    this.createBtn.click();
    this.okBtn.click();
  }
}
export const addOrganization = new AddOrganization();
