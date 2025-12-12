import { test } from '@playwright/test';
import { api, generic } from '../../src/utils/environment';
import { SignUpPage } from '../../pages/signup_module/signUpPage';
import { LoginPage } from '../../pages/login_module/loginPage';
import { MailSlurpService } from '../../src/helpers/mailSlurpService';
import { EmailVerificationPage } from '../../pages/signup_module/emailVerificationPage';


test.describe('TS_01: Sign Up Functionality', () => {

    let loginPage: LoginPage;
    let signUpPage: SignUpPage;
    let mail: MailSlurpService;
    let emailVerification: EmailVerificationPage;

    test('[@generic][@regression] TS01_TC001: Sign up with valid email and valid password', async ({ page }) => {

        loginPage = new LoginPage(page);
        signUpPage = new SignUpPage(page);
        mail = new MailSlurpService();
        emailVerification = new EmailVerificationPage(page);

        // Create a new email inbox on MailSlurp 
        const inbox = await mail.createInbox();

        // DPrint the generated new email from MailSlurp
        console.log('Generated Email: ', inbox.emailAddress);

        // Navigate to Sodexo Local Sign In page
        await loginPage.goToLogin(`${generic.environment.stageURL}`);

        // Navigate to Sign Up page
        const popupSignUpPage = await signUpPage.goToSignUpPage();

        // Complete and submit the registration form
        await signUpPage.fillSignUpForm(popupSignUpPage, inbox.emailAddress);

        // Get the Verification Email Link on MailSlurp
        const link = await mail.waitForVerificationEmail(inbox.id);
        console.log("Verification Link: ", link);

        // Verify the Verification Email received from MailSlurp
        await emailVerification.verifyEmail(popupSignUpPage, link, inbox.emailAddress);
    });

});