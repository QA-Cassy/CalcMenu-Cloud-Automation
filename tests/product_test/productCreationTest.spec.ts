import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_module/loginPage";
import { sodexoLuLocal } from "../../src/utils/environment";
import { generateProductName } from "../../src/utils/productName";
import { ProductCreationPage } from "../../pages/product_module/productCreationPage";
import { ProductLandingPage } from "../../pages/product_module/productLandingPage";

test.describe('TS_01: Product Creation', () => {

    let loginPage: LoginPage;
    let productLandingPage: ProductLandingPage;
    let productCreationPage: ProductCreationPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productLandingPage = new ProductLandingPage(page);

        // Navigate to Sodexo Local Sign In page
        await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);

        // Login
        await loginPage.login(`${sodexoLuLocal.environment.email}`, `${sodexoLuLocal.environment.password}`);

        // Navigate to Product Module
        await productLandingPage.goToProductModule();

        // Click Add New Product
        await productLandingPage.clickAddProduct();
    });

    test('TS01_TC001: Saving product with required fields only', async ({ page }) => {

        productCreationPage = new ProductCreationPage(page);
        const productName = generateProductName();
        const productSupplier = 'Aucun fournisseur';
        
        // Enter product name
        await productCreationPage.enterProductName(productName);

        // Get the generated product details
        const productNumber = await productCreationPage.getProductNumber();

        // Select the product supplier
        await productCreationPage.selectSupplier(productSupplier);

        // Save the product
        await productCreationPage.saveProduct();

        // Close the product
        await productCreationPage.closeProduct();

        // Verify if the product name, product number, and product supplier are correctly saved
        await productCreationPage.verifyProductSaved(productName, productNumber, productSupplier);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    });

})
