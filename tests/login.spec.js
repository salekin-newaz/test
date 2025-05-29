// tests/login.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');
const { DashboardPage } = require('../pages/DashboardPage.js'); // Import DashboardPage

// Read credentials from environment variables
const username = process.env.APP_USERNAME;
const password = process.env.APP_PASSWORD;
const targetUrl = 'https://app-test.informatiq.no/apps/geologiq/?lat=58.92167963287363&lon=2.196482968458857&radius=10000';

test.describe('Application Login', () => {
  // Skip login test if credentials are not set
  const skipLoginTest = !username || !password;
  test.skip(skipLoginTest, 'Skipping login test because APP_USERNAME or APP_PASSWORD environment variables are not set.');

  test('should log in successfully and verify dashboard access', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(targetUrl);
    await loginPage.login(username, password);

    // --- IMPORTANT: Placeholder Assertion for successful login ---
    // User should replace this with a reliable check for a post-login element.
    // Example: await expect(page.locator('#dashboard-main-container')).toBeVisible({ timeout: 15000 });
    console.log('Login attempt finished. Current URL:', page.url());
    await page.waitForTimeout(5000); // Allow time for dashboard to load. Replace with specific element wait.
    // A very basic check, replace with something more specific to the app's dashboard.
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 }); 
    console.log('Login test: Body is visible after login attempt.');
  });
});

test.describe('Dashboard Navigation', () => {
  // Skip all dashboard tests if credentials are not set
  const skipDashboardTests = !username || !password;
  test.skip(skipDashboardTests, 'Skipping dashboard navigation tests because APP_USERNAME or APP_PASSWORD environment variables are not set.');

  test('should navigate menus and click "Show Filtered" for each item', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Login first
    await page.goto(targetUrl);
    console.log('Navigated to target URL for dashboard test.');
    await loginPage.login(username, password);
    console.log('Login attempt completed for dashboard test.');

    // Wait for navigation to complete and dashboard to be ready.
    // This is a crucial step. Replace with a reliable wait for a specific dashboard element.
    // Example: await expect(page.locator('#main-map-container')).toBeVisible({ timeout: 20000 });
    console.log('Waiting for dashboard to load post-login...');
    await page.waitForTimeout(7000); // Increased wait time, user should replace with a specific element check.
    console.log('Assumed dashboard is loaded. Current URL:', page.url());

    const menuItems = [
      "Wells", "Subsurface", "Subsea lines", "Infrastructure",
      "Experience", "Risk", "3D Elements", "Vessel",
      "Formation Tops", "Target"
    ];

    for (const itemName of menuItems) {
      console.log(`Attempting to click menu item: "${itemName}"`);
      await dashboardPage.clickMenuItem(itemName);
      // Add a small wait if the UI needs time to update after menu click before "Show Filtered" is available/relevant
      await page.waitForTimeout(500); // Wait for UI to potentially update after menu click
      console.log(`Attempting to click "Show Filtered" for item: "${itemName}"`);
      await dashboardPage.clickShowFiltered();
      // Add a wait for filter results to load or for visual inspection
      await page.waitForTimeout(1000); // Wait for results/visual inspection
      console.log(`Processed menu: "${itemName}" and clicked "Show Filtered"`);
    }

    // Add a final assertion if there's a state to verify after all clicks.
    // This is highly application-specific.
    console.log('Finished iterating through menu items.');
    await expect(page.locator('body')).toBeVisible(); // Basic check, user should improve this.
  });
});
