import { expect, Page } from "@playwright/test";
import { generic } from "../../src/utils/environment";


export class EmailResetPasswordPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async resetPassword(popup: Page, emailAddress: string, newPassword = 'Qwerty@1234567', confirmPassword = 'Qwerty@1234567'){
        await popup.getByRole('textbox', { name: 'New Password Use 8 or more' }).fill(newPassword);
        await popup.getByRole('textbox', { name: 'Confirm Password Password' }).fill(confirmPassword);
        await popup.getByRole('button', { name: 'RESET PASSWORD' }).click();
        await popup.getByRole('button', { name: 'RETURN TO LOGIN' }).click();

        await popup.getByRole('textbox', { name: 'Email Address' }).fill(emailAddress);
        await popup.getByRole('textbox', { name: 'Password' }).fill(confirmPassword);
        await popup.getByRole('button', { name: 'LOGIN' }).click();

        await expect(popup).toHaveURL(generic.environment.homeURL);
    }

}