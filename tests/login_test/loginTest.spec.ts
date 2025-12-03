import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_module/loginPage';
import { generic, invalidData, privacyPolicy, sodexoLuLocal, termsOfService } from '../../src/utils/environment';
import { SignUpPage } from '../../pages/signup_module/signUpPage';
import { MailSlurpService } from '../../src/helpers/mailSlurpService';
import { EmailVerificationPage } from '../../pages/signup_module/emailVerificationPage';
import { EmailResetPasswordPage } from '../../pages/login_module/emailResetPasswordPage';

test.describe('TS_01: Login Functionality', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);
  });

  test('[@enterprise][@regression] TS01_TC001: Login with valid email and valid password', async ({ page }) => {
    await loginPage.login(sodexoLuLocal.environment.email, sodexoLuLocal.environment.password);
    await expect(page).toHaveURL(sodexoLuLocal.environment.homeURL);
  })

  test('TS01_TC002: Login with invalid email and valid password', async ({ page }) => {
    await loginPage.login(invalidData.user.invalidEmail, sodexoLuLocal.environment.password);
    await loginPage.assertInvalidEmaildAddress();
  });

  test('TS01_TC003: Login with valid email and invalid password', async ({ page }) => {
    await loginPage.login(sodexoLuLocal.environment.email, invalidData.user.invalidPassword);
    await loginPage.assertInvalidPassword();
  });

  test('TS01_TC004: Login with invalid email and invalid password', async ({ page }) => {
    await loginPage.login(invalidData.user.invalidEmail, invalidData.user.invalidPassword);
    await loginPage.assertInvalidEmaildAddress();
  });

  test('TS01_TC005: Login with unregistered email and password', async ({ page }) => {
    await loginPage.login(invalidData.user.unregisteredEmail, sodexoLuLocal.environment.password);
    await loginPage.assertInvalidEmaildAddress();
  });

  test('TS01_TC006: Login with empty email and valid password', async ({ page }) => {
    await loginPage.login('', sodexoLuLocal.environment.password);
    await loginPage.assertDisabledLoginButton();
  });

  test('TS01_TC007: Login with valid email and empty password', async ({ page }) => {
    await loginPage.login(sodexoLuLocal.environment.email, '');
    await loginPage.assertDisabledLoginButton();
  });

  test('TS01_TC008: Login with empty email and empty password', async ({ page }) => {
    await loginPage.login('', '');
    await loginPage.assertDisabledLoginButton();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

})

test.describe('TS_02: Reset Password', () => {

  // test.beforeEach(async ({ page }) => {});

  test('TS02_TC001: Reset password using registered email', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const signUpPage = new SignUpPage(page);
    const mail = new MailSlurpService();
    const emailVerification = new EmailVerificationPage(page);
    const emailResetPasswordPage = new EmailResetPasswordPage(page);

    const inbox = await mail.createInbox();
    console.log('Generated Email: ', inbox.emailAddress);
    
    await loginPage.goToLogin(`${generic.environment.stageURL}`);
    
    const popupSignUpPage = await signUpPage.goToSignUpPage();
    await signUpPage.fillSignUpForm(popupSignUpPage, inbox.emailAddress);
    
    const verificationLink = await mail.waitForVerificationEmail(inbox.id);
    console.log("Verification Link: ", verificationLink);
    
    await emailVerification.verifyEmail(popupSignUpPage, verificationLink, inbox.emailAddress);

    await popupSignUpPage.getByRole('img', { name: 'menu' }).click();
    await popupSignUpPage.getByText('Log Out').click();

    await popupSignUpPage.getByRole('button', { name: 'Forgot your credentials?' }).click();

    await popupSignUpPage.getByRole('textbox', { name: 'Email Address' }).fill(inbox.emailAddress);
    await popupSignUpPage.getByRole('button', { name: 'RESET PASSWORD' }).click();
    await popupSignUpPage.getByRole('button', { name: 'Okay' }).click();

    const resetPasswordLink = await mail.waitForResetPasswordEmail(inbox.id);
    console.log("Reset Password Link: ", resetPasswordLink);

    const popupResetPasswordPage = await loginPage.goToResetPasswordPage(resetPasswordLink);
    await emailResetPasswordPage.resetPassword(popupResetPasswordPage, inbox.emailAddress);

  });

  // test('TS02_TC002: Reset password using unregistered email', async ({ page }) => {});
  // test('TS02_TC003: Reset password using invalid email', async ({ page }) => {});
  // test('TS02_TC004: Reset password using registered email', async ({ page }) => {});
  // test('TS02_TC005: Reset password using registered email', async ({ page }) => {});
  // test.afterEach(async ({ page }) => { await page.close();});
})

test.describe('TS_03: Verify Broken Links', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLogin(`${sodexoLuLocal.environment.localURL}`);
  });

  test('TS03_TC001: Verify if login page link is not broken', async ({ page }) => {
    loginPage.assertVerifyURL(page, sodexoLuLocal.environment.localURL);
  });

  test('TS03_TC002: Verify if reset password link is not broken', async ({ page }) => {
    await loginPage.clickResetPassword();
    await loginPage.assertResetPasswordModalVisible();
  });

  test('TS03_TC003: Verify if terms of service link is not broken', async ({ page }) => {
    const popup = await loginPage.clickTermsOfService();
    await loginPage.assertVerifyURL(popup, termsOfService.link.enURL);
  });

  test('TS03_TC004: Verify if privacy policy link is not broken', async ({ page }) => {
    const popup = await loginPage.clickPrivacyPolicy();
    await loginPage.assertVerifyURL(popup, privacyPolicy.link.enURL);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

})























// DO NOT DELETE
// test('Login with correct credentials', async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   const email = 'data+headquarters@calcmenu.com';
//   const password = 'Qwerty@12345';
//   const dashboardURL = 'https://sodexolu.calcmenu.com/Home/Dashboard';

//   await loginPage.gotoLogin();
//   await loginPage.login(email, password);

//   await page.waitForURL(dashboardURL, { timeout: 15000 });
//   await expect(page).toHaveURL(dashboardURL);
// });
