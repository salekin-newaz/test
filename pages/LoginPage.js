// pages/LoginPage.js

class LoginPage {
  constructor(page) {
    this.page = page;
    // --- Locators (IMPORTANT: These are placeholders and will likely need to be updated) ---
    this.usernameField = page.locator('input[name="email"]'); // Assuming name="email" based on provided credential
    this.passwordField = page.locator('input[type="password"]'); // Common attribute for password fields
    this.loginButton = page.locator('button[type="submit"]'); // Common attribute for submit buttons
    // Add other locators here if needed, e.g., for a "Remember me" checkbox or error messages
  }

  async goto() {
    // Navigate to the specific login page URL if it's different from the base URL
    // For now, we'll assume the test script handles initial navigation to the site.
    // If the login form is on a specific path, like /login, you'd use:
    // await this.page.goto('https://app-test.informatiq.no/apps/geologiq/?lat=58.92167963287363&lon=2.196482968458857&radius=10000');
    // However, it's often better to navigate in the test itself and pass the page to the POM.
  }

  async enterUsername(username) {
    await this.usernameField.fill(username);
  }

  async enterPassword(password) {
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Logs into the application.
   * @param {string} username - The username for login.
   * @param {string} password - The password for login.
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
    // You might want to add a wait here for navigation to complete or for a dashboard element to be visible
    // For example: await this.page.waitForNavigation(); or await this.page.waitForSelector('#dashboard');
  }
}

module.exports = { LoginPage };
