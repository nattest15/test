import { LoginPage } from "../pages/loginPage";
import { test as baseTest } from "@playwright/test";
import { authenticator } from "otplib";
import { BoardsPage } from "../pages/boardsPage";
import { login } from "../utils/loginUtil";
interface IPages {
  loginPage: LoginPage;
  boardsPage: BoardsPage;
}

export const pageObjectTest = baseTest.extend<IPages>({
  loginPage: [
    async ({ page }, use) => {
      //kontekst przegladarki
      const loginPage = new LoginPage(page);
      await use(loginPage);
    },
    { auto: true },
  ],
  boardsPage: [
    async ({ page }, use) => {
      const boardsPage = new BoardsPage(page);
      await use(boardsPage);
    },
    { auto: true },
  ],
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

export const loginFixtureTest = baseTest.extend<{loginTest: () => Promise<void>;}>({
  loginTest: async ({page}, use) => {
    const loginPage = new LoginPage(page);
    const userEmail = process.env.USER_EMAIL;
    const userPassword = process.env.USER_PASSWORD;
    const secret = process.env.TOTP_SECRET;
    if (!secret) {
      throw new Error("TOTP_SECRET is not defined in .env");
    }
    await loginPage.login(userEmail, userPassword);
    await loginPage.login2FA(authenticator.generate(secret));
    const newPage = login(page);

    return use(await newPage);
  },
});

export { expect, mergeTests } from "@playwright/test";
