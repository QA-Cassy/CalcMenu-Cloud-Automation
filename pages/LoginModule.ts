import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput;
  readonly passwordInput;
  readonly loginButton;

  private readonly defaultEmail = 'data+headquarters@calcmenu.com';
  private readonly defaultPassword = 'Qwerty@12345';

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Email Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
  }

  async gotoLogin() {
    await this.page.goto('https://sodexolu.calcmenu.com/Welcome/Signin', {
      waitUntil: 'domcontentloaded',
    });
  }

  // Generic login (can still be used for other users if needed)
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // ✅ Convenience method: login with your default valid account
  async loginWithValidCredentials() {
    await this.login(this.defaultEmail, this.defaultPassword);
  }
}
