class NegativeLogin {
  get errorMessage() {
    return cy.get(".vs-c-custom-errors > .el-form-item__error");
  }
}
export const negativeLogin = new NegativeLogin();
