import { test } from '@playwright/test';
import { api, generic } from '../../src/utils/environment';
import { SignUpPage } from '../../pages/signup_module/signUpPage';
import { LoginPage } from '../../pages/login_module/loginPage';
import { MailSlurpService } from '../../src/helpers/mailSlurpService';
import { EmailVerificationPage } from '../../pages/signup_module/emailVerificationPage';


test.describe('TS_01: Sign Up Functionality', () => {

    test('[@generic][@regression] TS01_TC001: Sign up with valid email and valid password', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const signUpPage = new SignUpPage(page);
        const mail = new MailSlurpService();
        const emailVerification = new EmailVerificationPage(page);

        const inbox = await mail.createInbox();
        console.log('Generated Email: ', inbox.emailAddress);

        await loginPage.goToLogin(`${generic.environment.stageURL}`);

        const popupSignUpPage = await signUpPage.goToSignUpPage();
        await signUpPage.fillSignUpForm(popupSignUpPage, inbox.emailAddress);

        const link = await mail.waitForVerificationEmail(inbox.id);
        console.log("Verification Link: ", link);

        await emailVerification.verifyEmail(popupSignUpPage, link, inbox.emailAddress);
    });

});