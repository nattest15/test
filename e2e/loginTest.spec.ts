import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { testUser1 } from "./src/test-data/user.data";
import { generateTotp } from "./utilites/totp";

test("User can login correctly", async ({ page }) => {
  const userEmail = testUser1.userEmail;
  const userPassword = testUser1.userPassword;
  const loginPage = new LoginPage(page);
  const code = generateTotp()
  console.log(code)

  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  
  await loginPage.twoFaceLoginInput.fill(code);
  await loginPage.twoStepVerificationSubmit.click();
  await expect(loginPage.logo).toBeVisible();
});
test("Login with incorrect password", async ({ page }) => {
  const userEmail = testUser1.userEmail;
  const userPassword = 'inncorectPassword';
  const loginPage = new LoginPage(page);
  const code = generateTotp()
  console.log(code)

  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  
  await expect(loginPage.incorrectLoginTitle).toContainText('Incorrect email address and / or password. If you recently migrated your Trello account to an Atlassian account, you will need to use your Atlassian account password. Alternatively, you can get help logging in.');
});