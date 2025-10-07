import {
  generateTotopTest,
  pageObjectTest,
  mergeTests,
} from "../fixtures/pages.fixture";
import { testUser1 } from "../models/user.data";
import { generateTotp } from "../models/totp";

const test = mergeTests(pageObjectTest, generateTotopTest);

test("User can login correctly", async ({ loginPage, generateTotp }) => {
  const userEmail = testUser1.userEmail;
  const userPassword = testUser1.userPassword;

  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  await loginPage.login2FA(generateTotp); //=> jak mozna ten code przekazać?
  await loginPage.expectLogoVisible();
});

test("Login with incorrect password", async ({ loginPage }) => {
  const userEmail = testUser1.userEmail;
  const userPassword = "inncorectPassword";

  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  await loginPage.expectIncorrectLoginTitle();
});
