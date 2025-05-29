# Playwright Automation Project for GeologiQ

This project provides a basic framework for automated login testing of the GeologiQ application using Playwright.

## Project Structure

```
.
├── pages/
│   ├── LoginPage.js      # Page Object Model for the Login page
│   └── DashboardPage.js  # Page Object Model for the post-login Dashboard interactions
├── tests/
│   └── login.spec.js     # Test scripts for login and dashboard navigation
├── package.json          # Project dependencies and scripts
├── playwright.config.js  # Playwright configuration
└── README.md             # This file
```

## Page Object Models (POMs)

This project uses the Page Object Model design pattern to create a clear and maintainable test automation framework.

*   **`pages/LoginPage.js`**:
    *   Handles all interactions related to the application's login page.
    *   Provides methods for entering username, password, and submitting the login form.
    *   *Selectors for username, password, and login button are placeholders and likely need updating.*

*   **`pages/DashboardPage.js`**:
    *   Manages interactions with the application's main dashboard or post-login area.
    *   Provides methods for clicking menu items by their text and clicking a "Show Filtered" button.
    *   *Selectors for menu items (dynamic) and the "Show Filtered" button are designed to be adaptable but may require user-specific adjustments for their application's HTML structure.*

## Test Scripts

Test scripts are located in the `tests/` directory.

*   **`tests/login.spec.js`**:
    *   **Application Login**: Contains a test suite to verify basic login functionality using `LoginPage.js`. It navigates to the target URL, attempts to log in, and includes a placeholder assertion for successful login.
    *   **Dashboard Navigation**: Contains a test suite that, after logging in, uses `DashboardPage.js` to:
        *   Iterate through a predefined list of menu items (e.g., "Wells", "Subsurface").
        *   For each item, it clicks the menu item and then clicks a "Show Filtered" button.
        *   Includes `waitForTimeout` calls for demonstration, which should ideally be replaced with more specific waits in a real-world scenario.
        *   *This test relies heavily on the correct implementation of selectors in `DashboardPage.js` and `LoginPage.js`.*

## Getting Started: Running the Tests

Follow these steps to set up and run the Playwright tests:

### 1. Prerequisites

*   **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Installation

*   **Navigate to Project Directory**:
    Open your terminal or command prompt and navigate to the root directory of this project.
    ```bash
    cd path/to/your/playwright-automation-project
    ```

*   **Install Project Dependencies**:
    Run the following command to install the necessary packages defined in `package.json` (including Playwright):
    ```bash
    npm install
    ```

*   **Install Playwright Browsers**:
    Playwright requires browser binaries to run tests. Install them with:
    ```bash
    npx playwright install
    ```
    This command downloads the default browsers (Chromium, Firefox, WebKit).

### 3. Setting Credentials

The login test (`tests/login.spec.js`) expects your GeologiQ application credentials to be provided as environment variables: `APP_USERNAME` and `APP_PASSWORD`. The target URL for the test is `https://app-test.informatiq.no/apps/geologiq/?lat=58.92167963287363&lon=2.196482968458857&radius=10000`.

**Choose one of the following methods to set them:**

*   **For Bash/Zsh (Linux/macOS):**
    Open your terminal and execute:
    ```bash
    export APP_USERNAME="your_email@example.com"
    export APP_PASSWORD="your_secure_password"
    ```
    These variables will be set for the current terminal session. For a more permanent solution, add these lines to your shell's configuration file (e.g., `.bashrc`, `.zshrc`).

*   **For PowerShell (Windows):**
    Open PowerShell and execute:
    ```powershell
    $env:APP_USERNAME="your_email@example.com"
    $env:APP_PASSWORD="your_secure_password"
    ```
    These variables will be set for the current PowerShell session. To set them permanently, you can use the System Properties dialog (search for "environment variables" in Windows search).

*   **Using a `.env` file (Recommended for local development):**
    1.  The `dotenv` package is already listed in `devDependencies` in `package.json` and should be installed after `npm install`. If for some reason it's not, you can install it manually:
        ```bash
        npm install dotenv --save-dev
        ```
    2.  Create a file named `.env` in the root directory of the project.
    3.  Add your credentials to the `.env` file like this:
        ```
        APP_USERNAME=your_email@example.com
        APP_PASSWORD=your_secure_password
        ```
    4.  To make the test script load these variables, you would typically add `require('dotenv').config();` at the beginning of your `playwright.config.js` or directly in the test file if preferred. For `playwright.config.js`, it would look like:
        ```javascript
        // playwright.config.js
        require('dotenv').config(); // Add this line at the top

        // @ts-check
        /** @type {import('@playwright/test').PlaywrightTestConfig} */
        const config = {
          // ... rest of the config
        };
        module.exports = config;
        ```

### 4. Updating Selectors in POMs (`pages/LoginPage.js` and `pages/DashboardPage.js`)

The element selectors in both `pages/LoginPage.js` and `pages/DashboardPage.js` are **placeholders or generalized examples** and will likely need to be updated to match the actual HTML structure of the GeologiQ application.

**`pages/LoginPage.js`:**
*   **Username Field**: `page.locator('input[name="email"]')` (Current placeholder)
*   **Password Field**: `page.locator('input[type="password"]')` (Current placeholder)
*   **Login Button**: `page.locator('button[type="submit"]')` (Current placeholder)

**`pages/DashboardPage.js`:**
*   **Menu Items**: The `clickMenuItem(itemName)` method uses a dynamic XPath selector designed to find common interactive elements. This selector (`//*[self::a or self::button or self::div[contains(@role,'menuitem')]][normalize-space()="${itemName}" or .//*[normalize-space()="${itemName}"]]`) might need to be adjusted based on your application's specific menu structure.
*   **Show Filtered Button**: `page.locator('button:has-text("Show Filtered")')` (Current placeholder)

**How to find correct selectors:**

1.  **Browser Developer Tools**:
    *   Open the GeologiQ login page (e.g., `https://app-test.informatiq.no/apps/geologiq/?lat=58.92167963287363&lon=2.196482968458857&radius=10000`) in your browser.
    *   Right-click on the username field (or password field, or login button) and select "Inspect" or "Inspect Element".
    *   The developer tools will open, highlighting the HTML element.
    *   Look for unique attributes like `id`, `name`, `class`, or a combination of attributes and tags (e.g., `input[name="username"]`, `button#loginButton`).
    *   You can right-click the element in the developer tools and choose "Copy" > "Copy selector" or "Copy XPath" for suggestions.

2.  **Playwright Test Generator (Codegen)**:
    Playwright has a built-in tool to help you record interactions and generate selectors.
    Run the following command in your terminal, replacing the URL if needed:
    ```bash
    npx playwright codegen https://app-test.informatiq.no/apps/geologiq/?lat=58.92167963287363&lon=2.196482968458857&radius=10000
    ```
    This will open a browser window and the Playwright Inspector. As you interact with the page (e.g., type in fields, click buttons), Playwright will suggest selectors in the Inspector window.

    Update the locators in the respective `.js` files within the `pages/` directory with the correct selectors you find. For example, if the username input in `LoginPage.js` has an `id="user-email"`, you would change:
    `this.usernameField = page.locator('input[name="email"]');`
    to:
    `this.usernameField = page.locator('#user-email');`

    Similarly, for `DashboardPage.js`, if the "Show Filtered" button has a unique ID like `show-filtered-btn`, you'd update its locator.

### 5. Updating Assertions in `tests/login.spec.js`

The test scripts in `tests/login.spec.js` (both for login and dashboard navigation) use **placeholder assertions**:

```javascript
// Replace with a real assertion:
await expect(page.locator('body')).toBeVisible(); // Basic check that the page has a body.
```

This is not a reliable way to confirm a successful login. You **must** update this assertion to check for something that definitively indicates a successful login. Examples:

*   **Check for a URL change**:
    After login, the URL might change to include a path like `/dashboard` or `/home`.
    ```javascript
    // Example: Wait for navigation and then check the URL
    // await page.waitForNavigation({ waitUntil: 'networkidle' }); // or 'load' or 'domcontentloaded'
    await expect(page).toHaveURL(/.*dashboard/); // Assumes URL changes to something containing 'dashboard'
    ```
*   **Check for a specific element on the post-login page**:
    This is often the most reliable method. Look for an element that only appears after a successful login, such as a user profile icon, a dashboard heading, or a logout button.
    ```javascript
    // Example: Wait for a user avatar or dashboard title to be visible
    await expect(page.locator('#user-profile-icon')).toBeVisible({ timeout: 10000 }); // Use a timeout to wait for the element
    // or
    await expect(page.locator('h1:has-text("Main Dashboard")')).toBeVisible({ timeout: 10000 });
    ```
    Use the browser developer tools or Playwright Codegen to find a suitable, unique, and stable element on the page that appears only after a successful login. The `timeout` option in `toBeVisible` (or other assertions) is useful to give the page some time to load and the element to appear.

### 6. Running Tests

Once everything is configured (especially credentials, selectors, and assertions), you can run the tests using the following commands from the project's root directory:

*   **Run all tests:**
    (The current `playwright.config.js` has `headless: false`, so tests will run in a headed browser by default. If you change it to `true`, this command will run them headlessly.)
    ```bash
    npx playwright test
    ```

*   **Run all tests in headed mode (if your config is set to headless by default):**
    ```bash
    npx playwright test --headed
    ```

*   **Run a specific test file:**
    ```bash
    npx playwright test tests/login.spec.js
    ```

*   **Run tests targeting a specific browser (if you have multiple browsers configured in `playwright.config.js`):**
    ```bash
    npx playwright test --project=chromium
    // npx playwright test --project=firefox  // Example if Firefox project is added and configured
    ```

### 7. Viewing Reports

Playwright generates an HTML report after the tests are run. You can view it with:

```bash
npx playwright show-report
```
This command will open the report in your default web browser, allowing you to see detailed results of test execution, including any errors, screenshots (on failure by default), and video recordings (if configured like in `playwright.config.js`: `video: 'on-first-retry'`).

---

By following these instructions, you should be able to execute the Playwright tests for the GeologiQ application. Remember that **updating selectors in `pages/LoginPage.js` and `pages/DashboardPage.js`, and improving assertions in `tests/login.spec.js` is crucial** for the tests to be meaningful and reliable.
