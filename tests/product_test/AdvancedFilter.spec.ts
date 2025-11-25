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

    await loginPage.goToLogin(`${sodexoLu.environment.localURL}`);
    await loginPage.login(
      sodexoLu.environment.email,
      sodexoLu.environment.password
    );

    await expect(page).toHaveURL(sodexoLu.environment.homeURL, { timeout: 20000 });

    // Go to Product module
    await page.getByRole('button').nth(1).click();
    await page.waitForURL('**/Home/Product');
  });

  test('TC_001: Enable All Search Criteria', async ({ page }) => {

  await page.getByText('Advanced Filter').nth(2).click();
  await page.getByText('Add Search Criteria').click();

  // Enable all search criteria
  const allToggles = page.locator(
    'td:nth-child(2) .d-flex .m-auto g g:nth-child(2)'
  );

  const count = await allToggles.count();

  for (let i = 0; i < count; i++) {
    const toggle = allToggles.nth(i);

    if (!(await toggle.isVisible())) {
      continue;
    }

    const fill = await toggle.getAttribute('fill');
    const isOff = !fill || fill === 'none';

    if (isOff) {
      await toggle.click();
    }
  }

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText("Search criteria's")).toBeVisible({
    timeout: 10000,
  });

  // Verify all search criteria panels are displayed in Advanced Filter
  const criteriaPanels = [
    'Category','Supplier','Brand','Allergens','Keywords','Extra Attributes','Nutrients',
    'Conservation Method','CO2-Score','Date Created','Date Modified','Price','Nutri-Score','Translation','Used as ingredient',
  ];

  for (const label of criteriaPanels) {
    const panelHeader = page
      .locator('div')
      .filter({ hasText: new RegExp(`^${label}$`) })
      .first();

    await expect(panelHeader).toBeVisible();
  }
});



  test.skip('TC_002: Verify category filter for product search', async ({ page }) => {

  const expectedCategory = 'CO114 - fruits et noix';

  await page.getByText('Advanced Filter').nth(2).click();
  await panel(page, 'Category').click();

  const searchBox = page.getByRole('textbox', { name: 'Search for Category' });
  await expect(searchBox).toBeVisible();
  await searchBox.fill('fruits et noix'); 
  await page.waitForTimeout(1000);        

  const categoryCheckbox = page.locator('#cat_prod894-input');
  await expect(categoryCheckbox).toBeVisible({ timeout: 10000 });
  await categoryCheckbox.check();

  await page.getByRole('button', { name: 'Go to search results' }).click();

  const productList = page.locator('app-product');
  await expect(productList).toBeVisible({ timeout: 15000 });

  await page.waitForTimeout(8000);

  await expect(productList).toContainText(expectedCategory, { timeout: 5000 });
  await page.waitForTimeout(2000);
});

  test.skip('TC_003: Verify Category expand popup', async ({ page }) => {
    await page.getByText('Advanced Filter').nth(2).click();

    const expandButton = panel(page, 'Category').locator('button').first();
    await expect(expandButton).toBeVisible();
    await expandButton.click();

    const dialog = page.getByRole('dialog');
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

  test.skip('TC_004: Verify Clear All Button', async ({ page }) => {

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

  test.skip('TC_005: Verify Remove Category Search Criteria', async ({ page }) => {

  await page.getByText('Advanced Filter').nth(2).click();

  const categoryPanel = page.locator('div').filter({ hasText: /^Category$/ }).first();
  await expect(categoryPanel).toBeVisible();

  const categoryRemoveBtn = page.getByRole('button', { name: 'clear' }).nth(3); 
  await categoryRemoveBtn.click();

  const confirmPopup = page.getByText(
    'Are you sure you want to remove this criteria from the Product Search Page?'
  );
  await expect(confirmPopup).toBeVisible();

  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();

  await categoryRemoveBtn.click();
  await expect(confirmPopup).toBeVisible();

  await page.getByRole('button', { name: 'Confirm' }).click();

  const successAlert = page.getByRole('alert');
  await expect(successAlert).toBeVisible({ timeout: 10000 });
  await expect(successAlert).toContainText('Successful');

  await expect(categoryPanel).not.toBeVisible();
});
});

test.describe('TS_002: Supplier Filter Functionality ', () => {
  test.describe.configure({ timeout: 90000 });

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goToLogin(`${sodexoLu.environment.localURL}`);
    await loginPage.login(
      sodexoLu.environment.email,
      sodexoLu.environment.password
    );

    await expect(page).toHaveURL(sodexoLu.environment.homeURL, { timeout: 20000 });

    await page.getByRole('button').nth(1).click();
    await page.waitForURL('**/Home/Product');
  }); 

  test.skip('TC_001: Verify Supplier filter for product search', async ({ page }) => {

  await page.getByText('Advanced Filter').nth(2).click();
  const expectedSupplier = 'APPLICAM';

  const searchBox = page.getByRole('textbox', { name: 'Search for Supplier' });
  await expect(searchBox).toBeVisible({ timeout: 10000 });

  await searchBox.fill('applicam');
  await page.waitForTimeout(1000); 

  const supplierCheckbox = page.locator('#sup_prod102-input');
  await expect(supplierCheckbox).toBeVisible({ timeout: 15000 });
  await supplierCheckbox.check();

  const goToResultsButton = page.getByRole('button', { name: 'Go to search results' });
  await expect(goToResultsButton).toBeVisible({ timeout: 15000 });
  await goToResultsButton.click();

  const productList = page.locator('app-product');
  await expect(productList).toBeVisible({ timeout: 40000 });
  await page.waitForTimeout(2500);

  const firstProductButton = productList.getByRole('button', { name: 'details' }).first();
  await firstProductButton.click();

  await expect(page.getByText('Supplier', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Overview')).toContainText(expectedSupplier);

  await page.waitForTimeout(2000);
});


  test.skip('TC_003: Verify Supplier expand popup', async ({ page }) => {

  await page.getByText('Advanced Filter').nth(2).click();

  const expandButton = panel(page, 'Supplier').locator('button').first();
  await expect(expandButton).toBeVisible();
  await expandButton.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.locator('.bg-white.p-2')).toBeVisible();
  await page.waitForTimeout(5000); 

  const supplier1 = dialog.locator('#sup_prod102-input');  
  const supplier2 = dialog.locator('#sup_prod93-input');   
  const supplier3 = dialog.locator('#sup_prod97-input'); 

  await expect(supplier1).toBeVisible();
  await supplier1.check();
  await expect(supplier1).toBeChecked();

  await expect(supplier2).toBeVisible();
  await supplier2.check();
  await expect(supplier2).toBeChecked();

  await expect(supplier3).toBeVisible();
  await supplier3.check();
  await expect(supplier3).toBeChecked();

  await page.waitForTimeout(3000);

  const closeButton = dialog.locator('button').nth(1);
  await expect(closeButton).toBeVisible();
  await closeButton.click();

  await expect(dialog).not.toBeVisible();
  await page.waitForTimeout(3000);
});


  test.skip('TC_004: Verify Supplier Clear Button', async ({ page }) => {

  await page.getByText('Advanced Filter').nth(2).click();

  const supplierCheckbox = page.locator('#sup_prod102-input');
  await expect(supplierCheckbox).toBeVisible();
  await supplierCheckbox.check();
  await expect(supplierCheckbox).toBeChecked();
  await page.waitForTimeout(10000); 

  const clearButton = panel(page, 'Supplier').locator('button').nth(1);
  await expect(clearButton).toBeVisible();
  await clearButton.click();
  await page.waitForTimeout(5000); 

  await expect(supplierCheckbox).not.toBeChecked();
});

  test.skip('TC_005: Verify Remove Supplier Search Criteria', async ({ page }) => {
  await page.getByText('Advanced Filter').nth(2).click();

  const supplierPanel = page.locator('div').filter({ hasText: /^Supplier$/ }).first();
  await expect(supplierPanel).toBeVisible();

  const supplierRemoveBtn = supplierPanel.getByRole('button', { name: 'clear' }).nth(2);
  await expect(supplierRemoveBtn).toBeVisible();
  await supplierRemoveBtn.click();

  const confirmPopup = page.getByText(
    'Are you sure you want to remove this criteria from the Product Search Page?'
  );
  await expect(confirmPopup).toBeVisible();

  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();

  await page.getByRole('button', { name: 'Confirm' }).click();

  const successAlert = page.getByRole('alert');
  await expect(successAlert).toBeVisible({ timeout: 10_000 });
  await expect(successAlert).toContainText('Successful');

  await expect(supplierPanel).not.toBeVisible();
});
});

test.describe('TS_003: Used as Ingredient Filter Functionality', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
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

  test.skip('Verify Filter by "Used as ingredient"', async ({ page }) => {

  await page.getByText('Advanced Filter').nth(2).click();

  await page.waitForTimeout(3000);

  await expect(
    page.locator('div').filter({ hasText: /^Used as ingredient$/ }).first()
  ).toBeVisible({ timeout: 10000 });

  await page.waitForTimeout(5000);

  await page
    .getByRole('radio', { name: 'Used as ingredient', exact: true })
    .check();

  await page.waitForTimeout(5000);

  const goToResultsButton = page.getByRole('button', { name: 'Go to search results' });
  await expect(goToResultsButton).toBeVisible({ timeout: 15000 });
  await goToResultsButton.click();

  const productList = page.locator('app-product');
  await expect(productList).toBeVisible({ timeout: 15000 });

  await page.waitForTimeout(3000);

   const firstProductButton = productList.getByRole('button', { name: 'details' }).first();
  await firstProductButton.click();

  await page.waitForTimeout(5000);


const usedAsIngredientValue = page.getByRole('button', { name: /Recipes/ });

await expect(usedAsIngredientValue).toBeVisible({ timeout: 10000 });

const valueText = await usedAsIngredientValue.innerText();
console.log('Used as ingredient value:', valueText);

await page.waitForTimeout(2000);

});

  test.skip('Verify Filter by "Not used as ingredient"', async ({ page }) => {

  await page.getByText('Advanced Filter').nth(2).click();
  await page.waitForTimeout(3000);

  await expect(
    page.locator('div').filter({ hasText: /^Used as ingredient$/ }).first()
  ).toBeVisible({ timeout: 15000 });

  await page.waitForTimeout(5000);

  await page
    .getByRole('radio', { name: 'Not used as ingredient', exact: true })
    .check();

  await page.waitForTimeout(5000);

  const goToResultsButton = page.getByRole('button', { name: 'Go to search results' });
  await expect(goToResultsButton).toBeVisible({ timeout: 15000 });
  await goToResultsButton.click();

  const productList = page.locator('app-product');
  await expect(productList).toBeVisible({ timeout: 10000 });

  await page.waitForTimeout(3000);

  const firstProductButton = productList.getByRole('button', { name: 'details' }).first();
  await firstProductButton.click();

  await page.waitForTimeout(5000);

  const usedAsIngredientValue = page.getByRole('button', { name: /0 Recipe/i });

  await expect(usedAsIngredientValue).toBeVisible({ timeout: 10000 });

  const valueText = (await usedAsIngredientValue.innerText()).trim();
  console.log('Used as ingredient value:', valueText);

  await expect(usedAsIngredientValue).toHaveText(/0 Recipe/i);

  await page.waitForTimeout(2000);
});
});

test.describe('TS_004: Keywords Filter Functionality', () => {
  test.describe.configure({ timeout: 90_000 });

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.gotoLogin();
    await loginPage.login(
      sodexoLu.environment.email,
      sodexoLu.environment.password
    );

    await expect(page).toHaveURL(sodexoLu.environment.homeURL, {
      timeout: 20_000,
    });

    await page.getByRole('button').nth(1).click();
  });

  test('TC_001: Verify Keywords filter for product search - AND & Wanted Criteria', async ({ page }) => {

    await page.getByText('Advanced Filter').nth(2).click();

    await page.locator('div').filter({ hasText: /^Keywords$/ }).first().click();
    await page.waitForTimeout(800);

    await page.locator('div').filter({ hasText: /^Allergen$/ }).first().click();
    await page.locator('div:nth-child(6) > .mat-mdc-tooltip-trigger > .pointer').click();
    await page.waitForTimeout(1000);

    await page.locator('div').filter({ hasText: /^Almond$/ }).first().click();

    const almondWantedRadio = page.locator('#mat-radio-126-input');
    await expect(almondWantedRadio).toBeVisible({ timeout: 1000 });
    await almondWantedRadio.check();

    await page.waitForTimeout(1500);

    await page.locator('div:nth-child(6) > .mat-mdc-tooltip-trigger > .pointer').click();
    await page.waitForTimeout(800);

    const activeRow = page.locator('div').filter({ hasText: /^Active$/ }).first();
    await expect(activeRow).toBeVisible({ timeout: 10_000 });
    await activeRow.click();

    const activeWantedRadio = activeRow.locator('input[type="radio"]').nth(0);
    await expect(activeWantedRadio).toBeVisible();
    await activeWantedRadio.check();

    const goToResultsButton = page.getByRole('button', { name: 'Go to search results' });
    await expect(goToResultsButton).toBeVisible();
    await goToResultsButton.click();

    const productList = page.locator('app-product');
    await expect(productList).toBeVisible({ timeout: 40_000 });
    await page.waitForTimeout(2500);

    const firstProductButton = productList.getByRole('button', { name: 'details' }).first();
    await expect(firstProductButton).toBeVisible();
    await firstProductButton.click();

    const keywordsTab = page.getByText('Keywords');
    await expect(keywordsTab).toBeVisible();
    await keywordsTab.click();

    await page.waitForTimeout(2000);

    const activeKeyword = page.getByText('Active').first();
    await expect(activeKeyword).toBeVisible({ timeout: 10_000 });

    const almondKeyword = page.getByText('Allergen : Almond').first();
    await expect(almondKeyword).toBeVisible({ timeout: 10_000 });

    await page.waitForTimeout(2_000);
  });

  test('TC_002: Verify Keywords filter for product search - AND & Unwanted Criteria', async ({ page }) => {
  await page.getByText('Advanced Filter').nth(2).click();

  await page.locator('div').filter({ hasText: /^Keywords$/ }).first().click();
  await page.waitForTimeout(800);

  const activeRow = page.locator('div').filter({ hasText: /^Active$/ }).first();
  await expect(activeRow).toBeVisible({ timeout: 10_000 });
  await activeRow.click();

  const activeUnwantedRadio = activeRow.locator('input[type="radio"]').nth(1);
  await expect(activeUnwantedRadio).toBeVisible({ timeout: 10_000 });
  await activeUnwantedRadio.check();

  await page.waitForTimeout(1000);

  const allergenRow = page.locator('div').filter({ hasText: /^Allergen$/ }).first();
  await expect(allergenRow).toBeVisible({ timeout: 10_000 });
  await allergenRow.click();

  const allergenUnwantedRadio = allergenRow.locator('input[type="radio"]').nth(1);
  await expect(allergenUnwantedRadio).toBeVisible({ timeout: 10_000 });
  await allergenUnwantedRadio.check();

  const goToResultsButton = page.getByRole('button', { name: 'Go to search results' });
  await expect(goToResultsButton).toBeVisible();
  await goToResultsButton.click();

  const productList = page.locator('app-product');
  await expect(productList).toBeVisible({ timeout: 40_000 });
  await page.waitForTimeout(2500);

  const firstProductButton = productList.getByRole('button', { name: 'details' }).first();
  await expect(firstProductButton).toBeVisible({ timeout: 10_000 });
  await firstProductButton.click();

  const keywordsTab = page.getByRole('tab', { name: 'Keywords' });
  await expect(keywordsTab).toBeVisible({ timeout: 10_000 });
  await keywordsTab.click();

  await page.waitForTimeout(2000);
});


  test('TC_003: Verify Keywords filter for product search - OR & Wanted Criteria', async ({ page }) => {
  await page.getByText('Advanced Filter').nth(2).click();

  await page.locator('div').filter({ hasText: /^Keywords$/ }).first().click();
  await page.waitForTimeout(800);

  const orRadio = page.getByRole('radio', { name: 'Or' });
  await expect(orRadio).toBeVisible({ timeout: 10_000 });
  await orRadio.check();
  await page.waitForTimeout(800);

  const legumesRow = page.locator('div').filter({ hasText: /^légumes$/ }).first();
  await expect(legumesRow).toBeVisible({ timeout: 10_000 });
  await legumesRow.click();

  const legumesWantedRadio = legumesRow.locator('input[type="radio"]').nth(0);
  await expect(legumesWantedRadio).toBeVisible();
  await legumesWantedRadio.check();
  await page.waitForTimeout(800);

  const herbsRow = page
    .locator('div')
    .filter({ hasText: /^Les herbes fraîches$/ })
    .first();
  await expect(herbsRow).toBeVisible({ timeout: 10_000 });
  await herbsRow.click();

  const herbsWantedRadio = herbsRow.locator('input[type="radio"]').nth(0);
  await expect(herbsWantedRadio).toBeVisible();
  await herbsWantedRadio.check();

  const goToResultsButton = page.getByRole('button', { name: 'Go to search results' });
  await expect(goToResultsButton).toBeVisible();
  await goToResultsButton.click();

  const productList = page.locator('app-product');
  await expect(productList).toBeVisible({ timeout: 40_000 });
  await page.waitForTimeout(2500);

  const firstProductButton = productList.getByRole('button', { name: 'details' }).first();
  await expect(firstProductButton).toBeVisible({ timeout: 10_000 });
  await firstProductButton.click();

  const keywordsTab = page.getByRole('tab', { name: 'Keywords' });
  await expect(keywordsTab).toBeVisible({ timeout: 10_000 });
  await keywordsTab.click();
  await page.waitForTimeout(1000);

  const legumesLocator = page.getByText('légumes');
  const herbsLocator = page.getByText('Les herbes fraîches');

  const hasLegumes = (await legumesLocator.count()) > 0;
  const hasHerbs = (await herbsLocator.count()) > 0;

  expect(
    hasLegumes || hasHerbs,
  ).toBeTruthy(); 
  await page.waitForTimeout(2000);
});

  test('TC_004: Verify Keywords filter for product search - OR & Unwanted Criteria', async ({ page }) => {
  await page.getByText('Advanced Filter').nth(2).click();

  await page.locator('div').filter({ hasText: /^Keywords$/ }).first().click();
  await page.waitForTimeout(800);

  const orRadio = page.getByRole('radio', { name: 'Or' });
  await expect(orRadio).toBeVisible({ timeout: 10_000 });
  await orRadio.check();
  await page.waitForTimeout(800);

  const legumesRow = page.locator('div').filter({ hasText: /^légumes$/ }).first();
  await expect(legumesRow).toBeVisible({ timeout: 10_000 });
  await legumesRow.click();

  const legumesUnwantedRadio = legumesRow.locator('input[type="radio"]').nth(1);
  await expect(legumesUnwantedRadio).toBeVisible();
  await legumesUnwantedRadio.check();

  await page.waitForTimeout(800);

  const herbsRow = page.locator('div').filter({ hasText: /^Les herbes fraîches$/ }).first();
  await expect(herbsRow).toBeVisible({ timeout: 10_000 });
  await herbsRow.click();

  const herbsUnwantedRadio = herbsRow.locator('input[type="radio"]').nth(1); 
  await expect(herbsUnwantedRadio).toBeVisible();
  await herbsUnwantedRadio.check();

  const goToResultsButton = page.getByRole('button', { name: 'Go to search results' });
  await expect(goToResultsButton).toBeVisible();
  await goToResultsButton.click();

  const productList = page.locator('app-product');
  await expect(productList).toBeVisible({ timeout: 40_000 });
  await page.waitForTimeout(2500);

  const firstProductButton = productList.getByRole('button', { name: 'details' }).first();
  await expect(firstProductButton).toBeVisible({ timeout: 10_000 });
  await firstProductButton.click();

  const keywordsTab = page.getByRole('tab', { name: 'Keywords' });
  await expect(keywordsTab).toBeVisible({ timeout: 10_000 });
  await keywordsTab.click();
  await page.waitForTimeout(1000);

  const legumesLocator = page.getByText('légumes');
  const herbsLocator = page.getByText('Les herbes fraîches');

  const hasLegumes = (await legumesLocator.count()) > 0;
  const hasHerbs = (await herbsLocator.count()) > 0;

  
  expect(
    hasLegumes === false && hasHerbs === false
  ).toBeTruthy(); 

  await page.waitForTimeout(2000);
});


  test('TC_005: Verify Keywords expand popup and Clear button', async ({ page }) => {

  await page.getByText('Advanced Filter').nth(2).click();

  await page.locator('div').filter({ hasText: /^Keywords$/ }).first().click();
  await page.waitForTimeout(800);

  const expandButton = page
    .locator(
      'div:nth-child(4) > .rounded > .d-flex.justify-content-between > div:nth-child(2) > button'
    )
    .first();
  await expect(expandButton).toBeVisible();
  await expandButton.click();

  const popup = page.locator('.bg-white.p-2');
  await expect(popup).toBeVisible({ timeout: 10_000 });

  const activeRow = popup.locator('div').filter({ hasText: /^Active$/ }).first();
  await activeRow.click();
  const activeWantedRadio = activeRow.locator('input[type="radio"]').nth(0); // Wanted
  await activeWantedRadio.check();
  await expect(activeWantedRadio).toBeChecked();

  const allergenRow = popup.locator('div').filter({ hasText: /^Allergen$/ }).first();
  await allergenRow.click();
  const allergenWantedRadio = allergenRow.locator('input[type="radio"]').nth(0);
  await allergenWantedRadio.check();
  await expect(allergenWantedRadio).toBeChecked();

  const legumesRow = popup.locator('div').filter({ hasText: /^légumes$/ }).first();
  await legumesRow.click();
  const legumesWantedRadio = legumesRow.locator('input[type="radio"]').nth(0);
  await legumesWantedRadio.check();
  await expect(legumesWantedRadio).toBeChecked();

  await page.waitForTimeout(1500); 

  const clearButton = popup.getByRole('button', { name: 'clear' }).first();
  await expect(clearButton).toBeVisible();
  await clearButton.click();
  await page.waitForTimeout(1000);

  await page.waitForTimeout(1500); 

  await expect(activeWantedRadio).not.toBeChecked();
  await expect(allergenWantedRadio).not.toBeChecked();
  await expect(legumesWantedRadio).not.toBeChecked();
});

  test('TC_006: Verify Remove Keywords Search Criteria', async ({ page }) => {
  await page.getByText('Advanced Filter').nth(2).click();

  const keywordsPanel = page.locator('div').filter({ hasText: /^Keywords$/ }).first();
  await expect(keywordsPanel).toBeVisible({ timeout: 10_000 });

  const removeKeywordsBtn = keywordsPanel.getByRole('button', { name: 'clear' }).nth(2);
  await expect(removeKeywordsBtn).toBeVisible();
  await removeKeywordsBtn.click();

  const confirmPopup = page.getByText(
    'Are you sure you want to remove this criteria from the Product Search Page?'
  );
  await expect(confirmPopup).toBeVisible();

  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();

  await page.getByRole('button', { name: 'Confirm' }).click();

  const successAlert = page.getByRole('alert');
  await expect(successAlert).toBeVisible({ timeout: 10_000 });
  await expect(successAlert).toContainText('Successful');

  await expect(keywordsPanel).not.toBeVisible();
});

});