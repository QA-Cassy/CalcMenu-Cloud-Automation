import { expect, Page } from '@playwright/test';
import { sodexoLuLocal } from '../../src/utils/environment';

export class LoginPage {

  readonly page: Page;
  readonly emailInput;
  readonly passwordInput;
  readonly loginButton;
  readonly resetPasswordButton;
  readonly resetPasswordHeader;
  readonly termsOfServiceButton;
  readonly privacyPolicyButton;

  // VALID CREDENTIALS
  private readonly validEmail = sodexoLuLocal.environment.email;
  private readonly validPassword = sodexoLuLocal.environment.password;

  // CONSTRUCTOR AND LOCATORS
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Email Address'); // Email Address Input Field
    this.passwordInput = page.getByPlaceholder('Password'); // Password Input Field
    this.loginButton = page.getByRole('button', { name: 'LOGIN' }); // Login Button
    this.resetPasswordButton = page.getByRole('button', { name: 'Forgot your credentials?' });
    this.resetPasswordHeader = page.getByText('Reset your password', { exact: true });
    this.termsOfServiceButton = page.getByRole('button', { name: 'Terms of Service' });
    this.privacyPolicyButton = page.getByRole('button', { name: 'Privacy Policy' });

  }
  
  // OPEN CALCMENU SIGN IN PAGE
   async goToLogin(link: string) {
    await this.page.goto(link, {
      waitUntil: 'domcontentloaded',
    });
  }

  // LOGIN TO CMC
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    if (!email || !password) {
      return;
    }

    await this.loginButton.click();
  }

  // LOGIN WITH VALID CREDENTIALS
  async loginWithValidCredentials() {
    await this.login(this.validEmail, this.validPassword);
  }

  // ASSERT FOR INVALID EMAIL
  async assertInvalidEmaildAddress() {
    await expect(this.page.getByText('This E-mail address does not exists')).toBeVisible();
  }

  // ASSERT FOR INVALID PASSWORD
  async assertInvalidPassword() {
    await expect(this.page.getByText('Wrong password')).toBeVisible();
  }

  // ASSERT FOR DISABLED LOGIN BUTTON
  async assertDisabledLoginButton() {
    await expect(this.loginButton).toBeDisabled();
  }

  // GO TO RESET PASSWORD
  async goToResetPasswordPage(resetPasswordEmailLink: string) {
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.goto(resetPasswordEmailLink, { waitUntil: 'domcontentloaded' });
    return await popupPromise;
  };

  // CLICK RESET PASSWORD
  async clickResetPassword() {
    await this.resetPasswordButton.click();
  }
  
  // CLICK TERMS OF SERVICE
  async clickTermsOfService() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.termsOfServiceButton.click();
    return await popupPromise;
  }

  // CLICK PRIVACY POLICY
  async clickPrivacyPolicy() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.privacyPolicyButton.click();
    return await popupPromise;
  }

  // ASSERT TO VERIFY IF THE ELEMENT IS VISIBLE
  async assertResetPasswordModalVisible() {
    await expect(this.page.getByText('Reset your password', { exact: true })).toBeVisible(); 
  }

  // ASSERT TO VERIFY THE URL
  async assertVerifyURL(popup: Page, expectedURL: string) {
    await expect(popup).toHaveURL(expectedURL);
  }

  

}
