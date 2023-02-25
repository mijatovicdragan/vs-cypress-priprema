class AuthLogin {
  get loginPageHeading() {
    return cy.get("h1");
  }

  get emailInput() {
    return cy.get('input[type="email"]');
  }

  get passwordInput() {
    return cy.get('input[type="password"]');
  }

  get loginButton() {
    return cy.get("button").first();
  }

  get userName() {
    return cy.get(".vs-c-user-name");
  }

  login(email, password) {
    this.emailInput.type(email),
      this.passwordInput.type(password),
      this.loginButton.click();
  }
}

export const authLogin = new AuthLogin();
