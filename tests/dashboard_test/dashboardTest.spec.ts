import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_module/loginPage";
import { sodexoLuLocal } from "../../src/utils/environment";
import { DashboardPage } from "../../pages/dashboard_module/dashboardPage";

test.describe('TS_01: Latest Recipes Section', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        // Navigate to Sodexo Local Sign In page
        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);

        // Login
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        // Navigate to Home Module
        await dashboardPage.goToDashboard();
    });

    test('TS01_TC001: Verify that clicking the Show More button will redirect the page to Recipe List page', async ({ page }) => {
        // Click the Show More button on Latest Recipes Section
        await dashboardPage.clickShowMore();

        // Verify if the redirection page is correct
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.recipeURL);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    });

})

test.describe('TS_02: Your Basket Section', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        // Navigate to Sodexo Local Sign In page
        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);

        // Login
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        // Navigate to Home Module
        await dashboardPage.goToDashboard();
    });

    test('TS02_TC001: Verify that clicking the Show All button will redirect the page to Basket page', async ({ page }) => {
        // Click the Show All button on Your Basket Section
        await dashboardPage.clickShowAll(0);

        // Verify if the redirection page is correct
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.basketURL);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    });

})

test.describe('TS_03: Notification Section', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        // Navigate to Sodexo Local Sign In page
        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);

        // Login
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        // Navigate to Home Module
        await dashboardPage.goToDashboard();
    });

    test('TS03_TC001: Verify that clicking the Show All button will redirect the page to Shopping List page', async ({ page }) => {
        // Click the Show All button on Notification Section
        await dashboardPage.clickShowAll(1);

        // Verify if the redirection page is correct
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.shoppingListURL);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    });

})

test.describe('TS_04: Shopping List Section', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        // Navigate to Sodexo Local Sign In page
        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);

        // Login
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        // Navigate to Home Module
        await dashboardPage.goToDashboard();
    });

    test('TS04_TC001: Verify that the Notification section is visible', async ({ page }) => {
        // Verify if the section is visible
        await dashboardPage.assertNotificationSectionVisible();
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    });

})

test.describe('TS_05: Top Navigation Bar', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        // Navigate to Sodexo Local Sign In page
        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);

        // Login
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        // Navigate to Home module
        await dashboardPage.goToDashboard();
    });

    test('TS05_TC001: Verify that clicking the Search field will redirect the page to Recipe List page', async ({ page }) => {
        // Click the Search bar field
        await dashboardPage.clickSearchField();

        // Verify if the redirection page is correct
        await dashboardPage.assertSearchPageVisible();
    })

    test('TS05_TC002: Verify that buying more credits is working as expected', async ({ page }) => {
        // Navigate to Buy More Credits feature
        await dashboardPage.clickBuyCredits();

        // Verify if the buy more credits modal is visible
        await dashboardPage.assertBuyCreditsPopupVisible();
        // Add steps to buy actual credits, as of now credits options are not yet available
    })

    test('TS05_TC003: Verify that clicking the Basket icon will redirect the page to the Basket page', async ({ page }) => {
        // Navigate to the Basket page
        await dashboardPage.clickBasketIcon();

        // Verify if the redirection page is correct
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.basketURL);
    })

    test('TS05_TC004: Verify that clicking the Notification icon will redirect the page to the Notification page', async ({ page }) => {
        // Navigate to the Notification page
        await dashboardPage.clickNotificationIcon();

        // Verify if the redirection page is correct
        await dashboardPage.assertNotificationPageVisible();
    })

    test('TS05_TC005: Verify that clicking the dropdown will display the options to navigate on Settings, My Account, About, and Logout', async ({ page }) => {
        // See the dropdown options
        await dashboardPage.openProfileDropdown();
        const options = ['Settings', 'My Account', 'About', 'Log Out']

        // Verify if the dropdown options are complete and correct
        for (const opt of options) {
            await expect(page.getByRole('menuitem', { name: opt })).toBeVisible();
        }
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    });

})

test.describe('TS_06: Redirection of Dropdown Options', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        // Navigate to the Sodexo Local Sign In page
        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);

        // Login
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        // Navigate to the Home module
        await dashboardPage.goToDashboard();
    });

    test('TS06_TC001: Verify that selecting the Settings option will redirect the page to Profile tab on Settings module', async ({ page }) => {
        // Click the dropdown
        await dashboardPage.openProfileDropdown();

        // Navigate to the Settings module
        await dashboardPage.selectDropdownOption('Settings');

        // Verify if the redirection page is correct
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.settingsURL)
    })

    test('TS06_TC002: Verify that selecting the My Account option will redirect the page to Account tab on Settings module', async ({ page }) => {
       // Click the dropdown
        await dashboardPage.openProfileDropdown();

        // Navigate to the My Account tab
        await dashboardPage.selectDropdownOption('My Account');

        // Verify if the redirection page is correct
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.settingsAccountTabURL);
    })

    test('TS06_TC003: Verify that selecting the About option will redirect the page to App tab on About module', async ({ page }) => {
        // Click the dropdown
        await dashboardPage.openProfileDropdown();
        
        // Navigate to the About module
        await dashboardPage.selectDropdownOption('About');

        // Verify if the redirection page is correct
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.aboutURL);
    })

    test('TS06_TC004: Verify that selecting the Logout option successfully logs the account out of the system and redirects the user to the Sign In page', async ({ page }) => {
        // Click the dropdown
        await dashboardPage.openProfileDropdown();

        // Select the Logout option
        await page.getByRole('menuitem', { name: 'Log Out' }).click()

        // Verify if the redirection page is correct
        await expect(page).toHaveURL(sodexoLuLocal.environment.localURL);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    });

})