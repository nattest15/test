import { Page, Locator } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
dotenv.config({ quiet: true });

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly continueBtn: Locator;
  readonly LoginBtn: Locator;
  private baseUrl: string;
  readonly logo: Locator;
  readonly twoFaceLoginInput: Locator;
  readonly twoStepVerificationSubmit: Locator;
  readonly loginBtnOnAttlasian: Locator;
  readonly incorrectLoginTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://trello.com/'
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.locator("#password");
    this.continueBtn = page.getByTestId("login-submit-idf-testid");
    this.LoginBtn = page.getByTestId("login-submit-idf-testid");
    this.logo = page.getByTestId('team25-header-logo');
    this.twoFaceLoginInput = page.locator('#two-step-verification-otp-code-input')
    this.twoStepVerificationSubmit = page.locator('#two-step-verification-submit');
    this.loginBtnOnAttlasian = page.getByTestId('login');
    this.incorrectLoginTitle = page.getByTestId('form-error--content');
  
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}`);
  }

  async login(userEmail: any, password: any) {
    await this.loginBtnOnAttlasian.click();
    await this.usernameInput.fill(userEmail);
    await this.continueBtn.click();
    await this.passwordInput.fill(password);
    await this.LoginBtn.click();
  }
}
