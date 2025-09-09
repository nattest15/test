import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { testUser1 } from "../models/user.data";
import { generateTotp } from "../models/totp";


test("User can login correctly", async ({ page }) => {
  const userEmail = testUser1.userEmail;
  const userPassword = testUser1.userPassword;
  const loginPage = new LoginPage(page);
  const code = generateTotp()
  console.log(code)

  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  await loginPage.login2FA(code);
  await loginPage.expectLogoVisible();

});
test("Login with incorrect password", async ({ page }) => {
  const userEmail = testUser1.userEmail;
  const userPassword = 'inncorectPassword';
  const loginPage = new LoginPage(page);
  const code = generateTotp()
  console.log(code)

  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  await loginPage.expectIncorrectLoginTitle();
  });