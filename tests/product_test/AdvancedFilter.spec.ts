import { test, expect, Page, Locator } from '@playwright/test';
import { LoginPage } from '../../pages/login_module/loginPage';
import { sodexoLu } from '../../src/utils/environment';

function panel(page: Page, title: string): Locator {
  return page.locator(
    'div.col-xl-3.col-md-6.col-12.p-1',
    { has: page.locator('span.EGS_SectionTitle', { hasText: title }) }
  );
}

test.describe('TS_001:Category Filter Functionality', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000)
    loginPage = new LoginPage(page);

    await loginPage.gotoLogin();
    await loginPage.login(
      sodexoLu.environment.email,
      sodexoLu.environment.password
    );

    await expect(page).toHaveURL(sodexoLu.environment.homeURL, { timeout: 20000 });

    // Go to Product module
    await page.getByRole('button').nth(1).click();
    await page.waitForURL('**/Home/Product');
  });

  test('TC_001: Verify category filter for product search', async ({ page }) => {

  // Open Advanced Filter
    await page.getByText('Advanced Filter').nth(2).click();
    const expectedCategory = 'CO114 - fruits et noix';
    await panel(page, 'Category').click();

  // Select the category
    const categoryCheckbox = page.locator('#cat_prod894-input');
    await expect(categoryCheckbox).toBeVisible();
    await categoryCheckbox.check();

    await page.getByRole('button', { name: 'Go to search results' }).click();
  
    const categoryCell = page.getByText(expectedCategory).nth(3);
    await expect(categoryCell).toBeVisible({ timeout: 10000 });
    await expect(page.locator('app-product')).toContainText(expectedCategory);
});

  test('TC_002: Verify Clear All Button', async ({ page }) => {

  await page.getByText('Advanced Filter').nth(2).click();
  await panel(page, 'Category').click();

  const categoryCheckbox = page.locator('#cat_prod894-input');
  await expect(categoryCheckbox).toBeVisible();
  await categoryCheckbox.check();
  await expect(categoryCheckbox).toBeChecked();
  await page.waitForTimeout(10000); 
 
  const clearIconButton = panel(page, 'Category').locator('button').nth(1);
  await expect(clearIconButton).toBeVisible();
  await clearIconButton.click();
  await page.waitForTimeout(10000); 

  await expect(categoryCheckbox).not.toBeChecked();
});

test('TC_003: Verify Category expand popup', async ({ page }) => {
  await page.getByText('Advanced Filter').nth(2).click();

  const expandButton = panel(page, 'Category').locator('button').first();
  await expect(expandButton).toBeVisible();
  await expandButton.click();

  const dialog = page.getByRole('dialog'); // popup
  await expect(dialog).toBeVisible();
  await expect(page.locator('.bg-white.p-2')).toBeVisible();
  await page.waitForTimeout(5000); 

  const categoryCheckboxInDialog = dialog.locator('#cat_prod894-input');
  await expect(categoryCheckboxInDialog).toBeVisible();
  await categoryCheckboxInDialog.check();
  await expect(categoryCheckboxInDialog).toBeChecked();
  await page.waitForTimeout(3000); 

  const closeButton = dialog.locator('button').nth(1);
  await expect(closeButton).toBeVisible();
  await closeButton.click();

  await expect(dialog).not.toBeVisible();
  await page.waitForTimeout(3000); 
});


});

// Supplier Filter
test.describe('TS_002: Supplier Filter Functionality ', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.gotoLogin();
    await loginPage.login(
      sodexoLu.environment.email,
      sodexoLu.environment.password
    );

    await expect(page).toHaveURL(sodexoLu.environment.homeURL, { timeout: 20000 });

    await page.getByRole('button').nth(1).click();
    await page.waitForURL('**/Home/Product');
  }); 

  test.skip('[@enterprise][@regression] TC_001: Verify Supplier filter for product search', async ({ page }) => {

    await page.getByText('Advanced Filter').nth(2).click();
    const expectedSupplier = 'APPLICAM';

    const supplierCheckbox = page.locator('#sup_prod102-input');
    await expect(supplierCheckbox).toBeVisible({ timeout: 15000 });
    await supplierCheckbox.check();

    const goToResultsButton = page.getByRole('button', { name: 'Go to search results' });
    await expect(goToResultsButton).toBeVisible({ timeout: 15000 });
    await goToResultsButton.click();

    const productList = page.locator('app-product');
    await expect(productList).toBeVisible({ timeout: 40000 });

    const firstProduct = productList.getByRole('button').first();
    await expect(firstProduct).toBeVisible({ timeout: 20000 });
    await firstProduct.click();

    await expect(productList).toBeHidden({ timeout: 20000 });
  }); 

});
