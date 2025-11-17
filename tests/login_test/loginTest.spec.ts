import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_module/loginPage';
import { sodexoLu } from '../../src/utils/environment';

test.describe('TS_001: Login Functionality', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
  });

  test('[@enterprise][@regression] TC_001: Login with valid email and valid password', async ({ page }) => {
    await loginPage.login(sodexoLu.environment.email, sodexoLu.environment.password);
    await expect(page).toHaveURL(sodexoLu.environment.homeURL);
  })

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
