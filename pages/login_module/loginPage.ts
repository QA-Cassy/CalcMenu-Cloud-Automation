import { Page } from '@playwright/test';
import { sodexoLu } from '../../src/utils/environment';

export class LoginPage {

  readonly page: Page;
  readonly emailInput;
  readonly passwordInput;
  readonly loginButton;

  // VALID CREDENTIALS
  private readonly validEmail = sodexoLu.environment.email;
  private readonly validPassword = sodexoLu.environment.password;

  // CONSTRUCTOR AND LOCATORS
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Email Address'); // Email Address Input Field
    this.passwordInput = page.getByPlaceholder('Password'); // Password Input Field
    this.loginButton = page.getByRole('button', { name: 'LOGIN' }); // Login Button
  }
  
  // OPEN CALCMENU SIGN IN PAGE
  async gotoLogin() {
    await this.page.goto(`${sodexoLu.environment.stageURL}`, {
      waitUntil: 'domcontentloaded',
    });
  }

  // LOGIN TO CMC
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // LOGIN WITH VALID CREDENTIALS
  async loginWithValidCredentials() {
    await this.login(this.validEmail, this.validPassword);
  }
}
