import { Page, expect } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to Dashboard button
    async goToDashboard() {
        await this.page.getByRole('button').first().click();
    }

    // Click Show More button in Latest Recipes Section
    async clickShowMore() {
        await this.page.getByRole('button', { name: 'Show More' }).click();
    }

    // Click Show All button in Your Basket Section
    async clickShowAll(index = 0) {
        await this.goToDashboard();
        await this.page.getByRole('button', { name: 'Show All' }).nth(index).click();
    }

    // Click Search bar in Dashboard module
    async clickSearchField() {
        await this.goToDashboard();
        await this.page.getByRole('textbox', { name: 'Search Recipes' }).click();
    }

    // Navigate to Buy More Credits
    async clickBuyCredits() {
        await this.goToDashboard();
        await this.page.getByRole('img', { name: 'img' }).click();
    }

    // Navigate to the Basket Page
    async clickBasketIcon() {
        await this.goToDashboard();
        await this.page.locator('.simpleIconHolderButtonDivs').first().click();
    }

    // Navigate to the Notification Page
    async clickNotificationIcon() {
        await this.goToDashboard();
        await this.page.locator('.mat-mdc-tooltip-trigger.simpleIconHolderButtonDivs').click();
    }

    // View the User Name Dropdown options
    async openProfileDropdown() {
        await this.goToDashboard();
        await this.page.getByRole('img', { name: 'menu' }).click();
    }

    // Select an option in the User Name Dropdown
    async selectDropdownOption(optionName: string) {
        await this.page.getByRole('menuitem', { name: optionName }).click();
    }

    // Assertions if Notification Section is visible
    async assertNotificationSectionVisible() {
        await this.goToDashboard();
        //const section = this.page.locator('#parentOfAll').getByText('Notifications');
        const section = this.page.locator('xpath=//*[@id="parentOfAll"]/div[2]/div[2]/div[1]/app-dashboard/div/div[2]/div[2]');
        await expect(section).toBeVisible();
    }

    // Assertions if the Search bar navigates to Recipe List Page
    async assertSearchPageVisible() {
        const popup = this.page.getByText('Please search for a recipe');
        await expect(popup).toBeVisible();
    }

    // Assertion if the navigation to Buy More Credits is correct
    async assertBuyCreditsPopupVisible() {
        const popup = this.page.getByRole('dialog').getByText('Buy More Credits');
        await expect(popup).toBeVisible();
    }

    // Assertion if the navigation to the Notification Page is correct
    async assertNotificationPageVisible() {
        const section = this.page.locator('#container').getByText('Notifications');
        await expect(section).toBeVisible();
    }

    async assertVerifyURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }
}
