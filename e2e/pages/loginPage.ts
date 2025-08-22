import { Page, Locator } from "@playwright/test";
import * as dotenv from "dotenv";
import { BasePage } from "../pages/basePage";
dotenv.config();
dotenv.config({ quiet: true });

export class LoginPage extends BasePage {
  private locators = {
    usernameInput: (): Locator => this.page.getByTestId("username"),
    passwordInput: (): Locator => this.page.locator("#password"),
    continueBtn: (): Locator => this.page.getByTestId("login-submit-idf-testid"),
    loginBtn: (): Locator => this.page.getByTestId("login-submit-idf-testid"),
    logo: (): Locator => this.page.getByTestId('team25-header-logo'),
    twoFaceLoginInput: (): Locator => this.page.locator('#two-step-verification-otp-code-input'),
    twoStepVerificationSubmit: (): Locator => this.page.locator('#two-step-verification-submit'),
    loginBtnOnAttlasian: (): Locator => this.page.getByTestId('login'),
    incorrectLoginTitle: (): Locator => this. page.getByTestId('form-error--content')
  }
  constructor(page: Page) {
    super(page, '/')
  }

  async login(userEmail: any, password: any): Promise <void> {
    await this.locators.loginBtnOnAttlasian().click();
    await this.locators.usernameInput().fill(userEmail);
    await this.locators.continueBtn().click();
    await this.locators.passwordInput().fill(password);
    await this.locators.loginBtn().click();
  }

  
}
