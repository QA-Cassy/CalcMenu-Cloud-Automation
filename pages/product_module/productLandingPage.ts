import { expect, Locator, Page } from "@playwright/test";


export class ProductLandingPage {

    readonly page: Page;
    productModuleBtn: Locator;
    addProductBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        // Buttons
        this.productModuleBtn = page.getByRole('button').nth(1);
        this.addProductBtn = page.getByRole('button', { name: 'Add Product' });
    }

    // Navigate to product module function
    async goToProductModule() {
        await this.productModuleBtn.click();
    }

    // Adding a new product function
    async clickAddProduct() {
        await this.addProductBtn.click();
        await expect(this.page.getByText('Add New Product')).toBeVisible({ timeout: 60000 });
    }

}