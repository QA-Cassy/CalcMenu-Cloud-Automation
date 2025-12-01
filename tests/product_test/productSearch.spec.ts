import { test, expect, Page, Locator } from '@playwright/test'; 
import { LoginPage } from '../../pages/login_module/loginPage'; 
import { sodexoStaging } from '../../src/utils/environment'; 
import { SearchPage } from '../../pages/product_module/productSearch';

test.describe('product Search By name', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
      loginPage = new LoginPage (page); 

      await loginPage.goToLogin (sodexoStaging.environment.stagingURL);
      await loginPage.login(
        sodexoStaging.environment.email,
        sodexoStaging.environment.password
      );

      await expect(page).toHaveURL (sodexoStaging.environment.homeURL, {timeout: 20000});
      await page.getByRole('button').nth (1).click ();
      await page.waitForURL ('**/Home/Product');
    });

  test('TC1: Product Search by exact name', async ({ page }) => {
    const searchValue = 'ABRICOT-PCE';
    const searchPage = new SearchPage (page);
    await searchPage.searchProductByName (searchValue);
    await searchPage.verifyExactMatch(searchValue);
  });

   test('TC2: Product Search with contains', async ({ page }) => {
    const searchValue = 'ABRICOT';
    const searchPage = new SearchPage (page);
    await searchPage.searchProductByName (searchValue);
    await searchPage.verifyContains(searchValue);
  });

   test('TC3: Product Search by wrong name', async ({ page }) => {
    const searchValue = 'ABRIkOT';
    const searchPage = new SearchPage (page);
    await searchPage.searchProductByName (searchValue);
    await searchPage.verifyNoresult (searchValue);
  });

});


