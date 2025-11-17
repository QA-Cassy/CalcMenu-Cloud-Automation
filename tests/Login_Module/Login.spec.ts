// tests/LoginCorrectCredentials.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginModule';


test('Login with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const email = 'data+headquarters@calcmenu.com';
  const password = 'Qwerty@12345';
  const dashboardURL = 'https://sodexolu.calcmenu.com/Home/Dashboard';

  await loginPage.gotoLogin();
  await loginPage.login(email, password);

  await page.waitForURL(dashboardURL, { timeout: 15000 });
  await expect(page).toHaveURL(dashboardURL);
});
