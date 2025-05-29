// playwright.config.js
// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    headless: false, // Run tests in a headed browser
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry', // Record video only when retrying a test
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // You can add more browsers like firefox, webkit
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
  ],
  reporter: [ ['html', { open: 'never' }] ], // Reporter to use. See https://playwright.dev/docs/test-reporters
};

module.exports = config;
