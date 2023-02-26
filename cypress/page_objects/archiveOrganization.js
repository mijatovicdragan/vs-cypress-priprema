class ArchiveOrganization {
  get configurationBtn() {
    return cy.get(
      '[data-cy="organization-configuration"] > span > div > a[class="vs-c-site-logo"]'
    );
  }

  get archiveBtn() {
    return cy.get(".vs-c-btn--spaced").eq(-2);
  }

  get saveBtn() {
    return cy.get('button[name="save-btn"]');
  }

  get archivedText() {
    return cy.get(".vs-l-archived-container > p");
  }

  get organizationInfo() {
    return cy.get(".el-tabs__nav > div > div");
  }
}
export const archiveOrganization = new ArchiveOrganization();
