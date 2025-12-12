import { expect, Locator, Page } from '@playwright/test';

export class ProductCreationPage {
    
    readonly page: Page;
    saveBtn: Locator;
    closeBtn: Locator;
    nameInput: Locator;
    productNumberInput: Locator;
    supplierCombo: Locator;
    supplierOption: (supplier: any) => Locator;
    overviewSection: Locator;

    constructor(page: Page) {
        this.page = page;

        // Buttons
        this.saveBtn = page.locator('.btn4040').first();
        this.closeBtn = page.getByRole('button', { name: 'x' });

        // Inputs
        this.nameInput = page.getByRole('textbox', { name: 'name', exact: true });
        this.productNumberInput = page.locator('input[placeholder="Enter Product Number"]');
        this.supplierCombo = page.getByRole('combobox', { name: 'supplier' });
        this.supplierOption = (supplier) => page.getByRole('option', { name: `sup *${supplier}*` });

        // Labels
        this.overviewSection = page.getByLabel('Overview');
    }

    // Enter product name function
    async enterProductName(name: string) {
        await this.nameInput.fill(name);
    }

    // Get generated product number function
    async getProductNumber() {
        return await this.productNumberInput.inputValue();
    }

    // Select supplier function
    async selectSupplier(supplier: string) {
        await this.supplierCombo.click();
        await this.supplierCombo.fill(supplier);
        await this.supplierOption(supplier).click();
    }

    // Save or Submit product function
    async saveProduct() {
        await this.saveBtn.click();
        await expect(this.page.getByText('Edit My Product')).toBeVisible({ timeout: 60000 });
        await expect(this.page.getByText('Successful')).toBeVisible({ timeout: 60000 });
    }

    // Close product edit or creation function
    async closeProduct() {
        await this.closeBtn.click();
    }

    // Assertion for product name, product number, and product supplier if saved successfully
    async verifyProductSaved(productName: string, productId: string, supplier: string) {
        await expect(this.overviewSection.getByText(productName)).toBeVisible();
        await expect(this.page.getByText(productId)).toBeVisible();
        await expect(this.page.getByText(supplier, { exact: false })).toBeVisible();
    }
}