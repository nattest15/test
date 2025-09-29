import { LoginPage } from "../pages/loginPage";
import { test as baseTest } from "@playwright/test";
import { authenticator } from "otplib";
interface IPages {
  loginPage: LoginPage
}
export const loginPageTest = baseTest.extend<IPages>({
  loginPage: [
    async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await use(loginPage);
    },
    { auto: true }],
});

export const generateTotopTest = baseTest.extend<{ generateTotp: string }>({
  generateTotp: async ({}, use) => {
    const secret = process.env.TOTP_SECRET;
    if (!secret) {
      throw new Error("TOTP_SECRET is not defined in .env");
    }

    const generateTotp = authenticator.generate(secret);
    await use(generateTotp);
  },
});

export { expect, mergeTests } from "@playwright/test";
