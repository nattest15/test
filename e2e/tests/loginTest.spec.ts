import { generateTotopTest, loginPageTest, mergeTests } from "../fixtures/loginPage.fixture";
import { testUser1 } from "../models/user.data";
import { generateTotp } from "../models/totp";

const test = mergeTests(loginPageTest, generateTotopTest); //

test("User can login correctly", async ({ loginPage, generateTotp }) => {
  const userEmail = testUser1.userEmail;
  const userPassword = testUser1.userPassword;

  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  await loginPage.login2FA(totpCode); //=> jak mozna ten code przekazać?
  await loginPage.expectLogoVisible();
});
test("Login with incorrect password", async ({ loginPage }) => {
  const userEmail = testUser1.userEmail;
  const userPassword = "inncorectPassword";
  const code = generateTotp();
  console.log(code);

  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  await loginPage.expectIncorrectLoginTitle();
});
