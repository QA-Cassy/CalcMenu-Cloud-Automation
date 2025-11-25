import { expect, Page } from '@playwright/test';
import { generic } from '../../src/utils/environment';

export class EmailVerificationPage {
    
    readonly page: Page;
    readonly calcMenuCloudButton;
    readonly emailField;
    readonly passwordField;
    readonly loginButton;
    readonly confirmButton;
    readonly closeButton;

    constructor(page:Page) {
        this.page = page;
        this.calcMenuCloudButton =  page.getByRole('button', { name: 'CalcMenu Cloud' });
        this.emailField = page.getByRole('textbox', { name: 'Email Address' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'LOGIN' });
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });
        this.closeButton = page.getByRole('button', { name: 'Close' });
    }

    async verifyEmail(popup: Page, link: string, email: string, password = 'Qwerty@12345') {
        
        await popup.goto(link, { waitUntil: 'domcontentloaded' });
        await popup.getByRole('button', { name: 'CalcMenu Cloud' }).click();
        await popup.getByRole('textbox', { name: 'Email Address' }).fill(email);
        await popup.getByRole('textbox', { name: 'Password' }).fill(password);
        await popup.getByRole('button', { name: 'LOGIN' }).click();
        await popup.getByRole('button', { name: 'Confirm' }).click();
        await popup.getByRole('button', { name: 'Close' }).click();

        await expect(popup).toHaveURL(generic.environment.homeURL);
    }

}