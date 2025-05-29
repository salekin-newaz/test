// pages/DashboardPage.js

class DashboardPage {
  constructor(page) {
    this.page = page;
    // --- Locators (IMPORTANT: These are placeholders and will likely need to be updated by the user) ---
    // Generic locator for the "Show Filtered" button
    // Users should verify and update this selector based on their application's HTML.
    this.showFilteredButton = page.locator('button:has-text("Show Filtered")'); 
    // Example of a more specific XPath: //button[normalize-space()="Show Filtered"]

    // No specific locator for menu items here, as it will be dynamic in the method.
    // A container for the menu might be useful if the page structure is complex, e.g.:
    // this.menuContainer = page.locator('nav#main-menu'); // Placeholder for user to define
  }

  /**
   * Clicks a menu item based on its visible text.
   * The selector tries to find elements like <a>, <button>, or ARIA menuitem roles
   * that directly contain or are the item's text.
   * @param {string} itemName - The text of the menu item to click.
   */
  async clickMenuItem(itemName) {
    // This is a complex XPath designed to be somewhat generic.
    // It looks for common interactive elements (a, button, div with role=menuitem)
    // and checks if their direct text or the text of a child matches itemName.
    // The user will likely need to refine this based on their specific HTML structure.
    const menuItemSelector = `
      //*[
        self::a or self::button or self::div[contains(@role,'menuitem')]
      ]
      [normalize-space()="${itemName}" or .//*[normalize-space()="${itemName}"]]
    `;
    
    // Prioritize elements that are more likely to be clickable menu items.
    // Using .first() to avoid ambiguity if multiple elements match.
    const menuItem = this.page.locator(menuItemSelector).first();

    try {
      await menuItem.waitFor({ state: 'visible', timeout: 10000 }); // Wait for item to be visible
      await menuItem.click();
      console.log(`Clicked menu item: "${itemName}"`);
    } catch (error) {
      console.error(`Could not click menu item "${itemName}". Selector: ${menuItemSelector}. Error: ${error}`);
      // Re-throw the error so the test fails and alerts the user to a potential issue.
      throw new Error(`Failed to click menu item "${itemName}". Ensure the selector is correct and the element is interactive.`);
    }
  }

  /**
   * Clicks the "Show Filtered" button.
   * Users should verify and update the `this.showFilteredButton` locator in the constructor.
   */
  async clickShowFiltered() {
    try {
      await this.showFilteredButton.waitFor({ state: 'visible', timeout: 10000 }); // Wait for button to be visible
      await this.showFilteredButton.click();
      console.log('Clicked "Show Filtered" button.');
      // Add a small wait if subsequent actions depend on the result of this click and need time to process.
      // await this.page.waitForTimeout(500); // Example: adjust or remove as needed.
    } catch (error) {
      console.error(`Could not click "Show Filtered" button. Selector: ${this.showFilteredButton.toString()}. Error: ${error}`);
      // Re-throw the error.
      throw new Error('Failed to click "Show Filtered" button. Ensure the selector is correct and the element is interactive.');
    }
  }
}

module.exports = { DashboardPage };
