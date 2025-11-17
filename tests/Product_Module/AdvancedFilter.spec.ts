import { test, expect, Page, Locator } from '@playwright/test';
import { LoginPage } from '../../pages/LoginModule'; 

function panel(page: Page, title: string): Locator {
  return page.locator(
    'div.col-xl-3.col-md-6.col-12.p-1',
    { has: page.locator('span.EGS_SectionTitle', { hasText: title }) }
  );
}

test('Advanced Filter – Verify all panels then apply Category filter', async ({ page }) => {
 
  const loginPage = new LoginPage(page);

  await loginPage.gotoLogin();
  await loginPage.loginWithValidCredentials(); 
  await page.waitForURL('**/Home/Dashboard');

  //  NAVIGATE TO PRODUCT MODULE 

  await page.getByRole('button').nth(1).click();
  await page.waitForURL('**/Home/Product');

  // Open Advanced Filter
  await page.getByText('Advanced Filter').nth(2).click();

  await expect(panel(page, 'Include')).toBeVisible();
  await expect(panel(page, 'Category')).toBeVisible();
  await expect(panel(page, 'Supplier')).toBeVisible();
  await expect(panel(page, 'Brand')).toBeVisible();
  await expect(panel(page, 'Allergens')).toBeVisible();
  await expect(panel(page, 'Keywords')).toBeVisible();
  await expect(panel(page, 'Extra Attributes')).toBeVisible();
  await expect(panel(page, 'Nutrients')).toBeVisible();
  await expect(panel(page, 'Conservation Method')).toBeVisible();
  await expect(panel(page, 'CO2-Score')).toBeVisible();
  await expect(panel(page, 'Date Created')).toBeVisible();
  await expect(panel(page, 'Price')).toBeVisible();
  await expect(panel(page, 'Date Modified')).toBeVisible();
  await expect(panel(page, 'Nutri-Score')).toBeVisible();
  await expect(panel(page, 'Translation')).toBeVisible();
  await expect(panel(page, 'Used as ingredient')).toBeVisible();

  
  //APPLY CATEGORY FILTER 
  
  await panel(page, 'Category').click();
 const categoryCheckboxId = '#cat_prod894-input';
  await page.locator(categoryCheckboxId).check();

  // 3. Apply the filter
  await page.getByRole('button', { name: 'Go to search results' }).click();

  // 4. Optional: just wait for page to settle (no list validation)
  await page.waitForLoadState('networkidle');
});
