import { Page } from '@playwright/test';

export class SignUpPage {

    readonly page: Page;
    readonly createAnAccountButton;
    readonly nameField;
    readonly emailField;
    readonly passwordField;
    readonly termsCheckbox;
    readonly submitButton;
    readonly okButton;

    constructor(page: Page) {
        this.page = page;
        this.createAnAccountButton = page.getByRole('button', { name: 'Create an account' });
        this.nameField = page.getByRole('textbox', { name: 'Name* Email Address* Region*' });
        this.emailField = page.getByRole('textbox', { name: 'sample@email.com' });
        this.passwordField = page.getByRole('textbox', { name: 'title' });
        this.termsCheckbox = page.getByRole('checkbox', { name: 'I agree to the Terms of' });
        this.submitButton = page.getByRole('button', { name: 'SUBMIT' });
        this.okButton = page.getByRole('button', { name: 'Okay' });
    }

    async goToSignUpPage() {
        const popupPromise = this.page.waitForEvent('popup');
        await this.createAnAccountButton.click();
        return await popupPromise;
    };

    async fillSignUpForm(popup: Page, email: string, name = 'QA Test Automation', password = 'Qwerty@12345') {
        await popup.getByRole('textbox', { name: 'Name* Email Address* Region*' }).fill(name);
        await popup.getByRole('textbox', { name: 'sample@email.com' }).fill(email);
        await popup.getByRole('textbox', { name: 'title' }).fill(password);
        await popup.getByRole('checkbox', { name: 'I agree to the Terms of' }).check();
        await popup.getByRole('button', { name: 'SUBMIT' }).click();
        await popup.getByRole('button', { name: 'Okay' }).click();
    }


}
