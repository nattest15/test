import { Page, Locator, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { testUser1 } from "../models/user.data";
import { authenticator } from "otplib";

export async function login(page: Page) {
  const loginPage = new LoginPage(page);
  const userEmail = testUser1.userEmail;
  const userPassword = testUser1.userPassword;
  const secret = process.env.TOTP_SECRET;
  if (!secret) {
    throw new Error("TOTP_SECRET is not defined in .env");
  }
  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  await loginPage.login2FA(authenticator.generate(secret));
  await loginPage.expectLogoVisible();
  return login(page);
}
