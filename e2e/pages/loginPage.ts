import { Page, Locator, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { BasePage } from "../pages/basePage";
dotenv.config();
dotenv.config({ quiet: true });

export class LoginPage extends BasePage {
  private locators = {
    usernameInput: (): Locator => this.page.getByTestId("username"),
    passwordInput: (): Locator => this.page.locator("#password"),
    continueBtn: (): Locator =>
      this.page.getByTestId("login-submit-idf-testid"),
    loginBtn: (): Locator => this.page.getByTestId("login-submit-idf-testid"),
    logo: (): Locator => this.page.getByTestId("team25-header-logo"),
    twoFactorCodeInput: (): Locator =>
      this.page.locator("#two-step-verification-otp-code-input"),
    twoFactorSubmitBtn: (): Locator =>
      this.page.locator("#two-step-verification-submit"),
    loginBtnOnAttlasian: (): Locator => this.page.getByTestId('login'),
    incorrectLoginTitle: (): Locator =>
      this.page.getByTestId("form-error--content"),
  };
  constructor(page: Page) {
    super(page, "/");
  }

  async login(userEmail: any, password: any): Promise<void> {
    await this.locators.loginBtnOnAttlasian().click();
    await this.locators.usernameInput().fill(userEmail);
    await this.locators.continueBtn().click();
    await this.locators.passwordInput().fill(password);
    await this.locators.loginBtn().click();
  }

  async login2FA(code: string): Promise<void> {
    await this.locators.twoFactorCodeInput().fill(code);
    await this.locators.twoFactorSubmitBtn().click();
  }

  async expectLogoVisible(): Promise<void> {
    await expect(this.locators.logo()).toBeVisible();
  }
  async expectIncorrectLoginTitle(): Promise<void> {
    await expect(this.locators.incorrectLoginTitle()).toHaveText(
      "Incorrect email address and / or password. If you recently migrated your Trello account to an Atlassian account, you will need to use your Atlassian account password. Alternatively, you can get help logging in."
    );
  }
}
