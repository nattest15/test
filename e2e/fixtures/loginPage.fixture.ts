import { LoginPage } from "../pages/loginPage";
import { test as baseTest } from "@playwright/test";
import { authenticator } from "otplib";

export const loginPageTest = baseTest.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

export const generateTotopTest = baseTest.extend<{ generateTotp: string }>({
  generateTotp: async ({}, use) => {
    const secret = process.env.TOTP_SECRET;
    if (!secret) {
      throw new Error("TOTP_SECRET is not defined in .env");
    }

    const totpCode = authenticator.generate(secret);
    await use(totpCode);
  },
});

export { expect, mergeTests } from "@playwright/test";
