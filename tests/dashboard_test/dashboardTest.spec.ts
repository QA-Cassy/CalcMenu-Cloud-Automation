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

        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        await dashboardPage.goToDashboard();
    });

    test('TS01_TC001: Verify that clicking the Show More button will redirect the page to Recipe List page', async ({ page }) => {
        await dashboardPage.clickShowMore();
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

        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        await dashboardPage.goToDashboard();
    });

    test('TS02_TC001: Verify that clicking the Show All button will redirect the page to Basket page', async ({ page }) => {
        await dashboardPage.clickShowAll(0);
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

        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        await dashboardPage.goToDashboard();
    });

    test('TS03_TC001: Verify that clicking the Show All button will redirect the page to Shopping List page', async ({ page }) => {
        await dashboardPage.clickShowAll(1);
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

        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        await dashboardPage.goToDashboard();
    });

    test('TS04_TC001: Verify that the Notification section is visible', async ({ page }) => {
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

        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        await dashboardPage.goToDashboard();
    });

    test('TS05_TC001: Verify that clicking the Search field will redirect the page to Recipe List page', async ({ page }) => {
        await dashboardPage.clickSearchField();
        await dashboardPage.assertSearchPageVisible();
    })

    test('TS05_TC002: Verify that buying more credits is working as expected', async ({ page }) => {
        await dashboardPage.clickBuyCredits();
        await dashboardPage.assertBuyCreditsPopupVisible();
        // Add steps to buy actual credits, as of now credits options are not yet available
    })

    test('TS05_TC003: Verify that clicking the Basket icon will redirect the page to the Basket page', async ({ page }) => {
        await dashboardPage.clickBasketIcon();
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.basketURL);
    })

    test('TS05_TC004: Verify that clicking the Notification icon will redirect the page to the Notification page', async ({ page }) => {
        await dashboardPage.clickNotificationIcon();
        await dashboardPage.assertNotificationPageVisible();
    })

    test('TS05_TC005: Verify that clicking the dropdown will display the options to navigate on Settings, My Account, About, and Logout', async ({ page }) => {
        await dashboardPage.openProfileDropdown();
        const options = ['Settings', 'My Account', 'About', 'Log Out']

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

        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        await dashboardPage.goToDashboard();
    });

    test('TS06_TC001: Verify that selecting the Settings option will redirect the page to Profile tab on Settings module', async ({ page }) => {
        await dashboardPage.openProfileDropdown();
        await dashboardPage.selectDropdownOption('Settings');
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.settingsURL)
    })

    test('TS06_TC002: Verify that selecting the My Account option will redirect the page to Account tab on Settings module', async ({ page }) => {
        await dashboardPage.openProfileDropdown();
        await dashboardPage.selectDropdownOption('My Account');
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.settingsAccountTabURL);
    })

    test('TS06_TC003: Verify that selecting the About option will redirect the page to App tab on About module', async ({ page }) => {
        await dashboardPage.openProfileDropdown();
        await dashboardPage.selectDropdownOption('About');
        await dashboardPage.assertVerifyURL(sodexoLuLocal.environment.aboutURL);
    })

    test('TS06_TC004: Verify that selecting the Logout option successfully logs the account out of the system and redirects the user to the Sign In page', async ({ page }) => {
        await page.getByRole('button').first().click();
        await page.getByRole('img', { name: 'menu' }).click();
        await page.getByRole('menuitem', { name: 'Log Out' }).click()
        await expect(page).toHaveURL(sodexoLuLocal.environment.localURL);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    });

})