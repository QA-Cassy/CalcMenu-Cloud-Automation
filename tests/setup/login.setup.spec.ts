import { test } from '@playwright/test';

test('Login once and save session', async ({ page }) => {
  await page.goto('https://sodexolu.calcmenu.com/Welcome/Signin');

  await page.getByPlaceholder('Email Address').fill('data+headquarters@calcmenu.com');
  await page.getByPlaceholder('Password').fill('Qwerty@12345');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  await page.waitForURL('**/Home/Dashboard');

  // Save the login session
  await page.context().storageState({ path: 'loginState.json' });
});
