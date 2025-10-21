import { testUser1 } from "../models/user.data";
import {
  generateTotopTest,
  pageObjectTest,
  mergeTests,
} from "../fixtures/pages.fixture";
import { BoardsPage } from "../pages/boardsPage";
import { LoginPage } from "../pages/loginPage";
import { generateTotp } from "../models/totp";


const test = mergeTests(pageObjectTest, generateTotopTest);

test("user can create a new board", async ({ loginPage, boardsPage, generateTotp, boardPage }) => {
    const boardName = "delete Name";

    await loginPage.goto();
    await loginPage.login(testUser1.userEmail, testUser1.userPassword);
    await loginPage.login2FA(generateTotp);
    await boardsPage.createNewBoard(boardName);
    await boardPage.checkIfBoardNameIsVisible(boardName);
});

test("user can edit board name", async ({loginPage, generateTotp, boardPage, boardsPage}) => {
  const boardName = "My Trello board";
  const editedBoardName = 'Edited'

    await loginPage.goto();
    await loginPage.login(testUser1.userEmail, testUser1.userPassword);
    await loginPage.login2FA(generateTotp);
    await boardsPage.clickOnBoardOnBoardsPage(boardName);
    await boardPage.editBoardName(boardName, editedBoardName);
    await boardPage.checkIfBoardNameIsVisible(editedBoardName);
  
});

test("user can delete the dashboard", async ({loginPage, generateTotp, boardPage, boardsPage}) => {
  const boardName = "test";

  await loginPage.goto();
  await loginPage.login(testUser1.userEmail, testUser1.userPassword);
  await loginPage.login2FA(generateTotp);
  await boardsPage.clickOnBoardOnBoardsPage(boardName);
  await boardPage.deleteBoard(boardName);
  await boardsPage.checkIfDeletedBoardIsNotVisible(boardName);
}
)