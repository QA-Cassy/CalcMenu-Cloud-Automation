import { test, expect, Page, Locator } from '@playwright/test';
import { LoginPage } from '../../pages/login_module/loginPage';

function panel(page: Page, title: string): Locator {
  return page.locator(
    'div.col-xl-3.col-md-6.col-12.p-1',
    { has: page.locator('span.EGS_SectionTitle', { hasText: title }) }
  );
}

test('Advanced Filter – Category filter shows correct category in Product List', async ({ page }) => {
  const loginPage = new LoginPage(page);

  
  // LOGIN 
  
  await loginPage.gotoLogin();
  await loginPage.loginWithValidCredentials();
  await page.waitForURL('**/Home/Dashboard');

  // NAVIGATE TO PRODUCT MODULE 
  
  await page.getByRole('button').nth(1).click();
  await page.waitForURL('**/Home/Product');

  await page.getByText('Advanced Filter').nth(2).click();

  const panels = [
    'Include', 'Category', 'Supplier', 'Brand', 'Allergens', 'Keywords',
    'Extra Attributes', 'Nutrients', 'Conservation Method', 'CO2-Score',
    'Date Created', 'Price', 'Date Modified', 'Nutri-Score', 'Translation',
    'Used as ingredient'
  ];

  for (const p of panels) {
    await expect(panel(page, p)).toBeVisible();
  }

  //  APPLY CATEGORY FILTER
  const expectedCategory = 'CO114 - fruits et noix';

  await panel(page, 'Category').click();

  const categoryCheckboxId = '#cat_prod894-input';
  const categoryCheckbox = page.locator(categoryCheckboxId);
  await expect(categoryCheckbox).toBeVisible();
  await categoryCheckbox.check();

  // Click "Go to search results"
  const goToResultsButton = page.getByRole('button', { name: /Go to search results/i });
  await expect(goToResultsButton).toBeVisible();
  await goToResultsButton.click();


  await page.waitForURL('**/Home/Product');
  await expect(page.getByText('Product List')).toBeVisible();

  await expect(page.locator('app-product')).toContainText(expectedCategory);

  console.log('✔ Category filter validated: Product List displays', expectedCategory);
});
