import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_module/loginPage';
import { invalidData, sodexoLu } from '../../src/utils/environment';

test.describe('TS_01: Login Functionality', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLogin(`${sodexoLu.environment.localURL}`);
  });

  test('[@enterprise][@regression] TS01_TC001: Login with valid email and valid password', async ({ page }) => {
    await loginPage.login(sodexoLu.environment.email, sodexoLu.environment.password);
    await expect(page).toHaveURL(sodexoLu.environment.homeURL);
  })

  test('TS01_TC002: Login with invalid email and valid password', async ({ page }) => {
    await loginPage.login(invalidData.user.invalidEmail, sodexoLu.environment.password);
    await loginPage.assertInvalidEmaildAddress();
  });

  test('TS01_TC003: Login with valid email and invalid password', async ({ page }) => {
    await loginPage.login(sodexoLu.environment.email, invalidData.user.invalidPassword);
    await loginPage.assertInvalidPassword();
  });

  test('TS01_TC004: Login with invalid email and invalid password', async ({ page }) => {
    await loginPage.login(invalidData.user.invalidEmail, invalidData.user.invalidPassword);
    await loginPage.assertInvalidEmaildAddress();
  });

  test('TS01_TC005: Login with unregistered email and password', async ({ page }) => {
    await loginPage.login(invalidData.user.unregisteredEmail, sodexoLu.environment.password);
    await loginPage.assertInvalidEmaildAddress();
  });

  test('TS01_TC006: Login with empty email and valid password', async ({ page }) => {
    await loginPage.login('', sodexoLu.environment.password);
    await loginPage.assertDisabledLoginButton();
  });

  test('TS01_TC007: Login with valid email and empty password', async ({ page }) => {
    await loginPage.login(sodexoLu.environment.email, '');
    await loginPage.assertDisabledLoginButton();
  });

  test('TS01_TC008: Login with empty email and empty password', async ({ page }) => {
    await loginPage.login('', '');
    await loginPage.assertDisabledLoginButton();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

})

test.describe('TS_02: Reset Password', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLogin(`${sodexoLu.environment.localURL}`);
  });

  test('TS02_TC001: Reset password using registered email', async ({ page }) => {
    // Empty Block
  });

  test('TS02_TC002: Reset password using unregistered email', async ({ page }) => {
    // Empty Block
  });

  test('TS02_TC003: Reset password using invalid email', async ({ page }) => {
    // Empty Block
  });

  test('TS02_TC004: Reset password using registered email', async ({ page }) => {
    // Empty Block
  });

  test('TS02_TC005: Reset password using registered email', async ({ page }) => {
    // Empty Block
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

})

























// DO NOT DELETE
// test('Login with correct credentials', async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   const email = 'data+headquarters@calcmenu.com';
//   const password = 'Qwerty@12345';
//   const dashboardURL = 'https://sodexolu.calcmenu.com/Home/Dashboard';

//   await loginPage.gotoLogin();
//   await loginPage.login(email, password);

//   await page.waitForURL(dashboardURL, { timeout: 15000 });
//   await expect(page).toHaveURL(dashboardURL);
// });
