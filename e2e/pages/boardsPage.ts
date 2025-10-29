import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { BoardPage } from "./boardPage";

export class BoardsPage extends BasePage {
  public locators = {
    createNewBoard: (): Locator => this.page.getByTestId("create-board-tile"),
    boardTitleInput: (): Locator => this.page.getByTestId("create-board-title-input"),
    boardTitleRequired: (): Locator => this.page.locator("#board-title-required-error"),
    visibilityDropdown: (): Locator => this.page.getByTestId("create-board-select-visibility-select--value-container"),
    createBoardBtn: (): Locator => this.page.getByTestId("create-board-submit-button"),
    createdBoardName: (boardName: string): Locator => this.page.locator('div').filter({ hasText: /^testMy Trello board$/ }).getByText(boardName), //jak napisac lokator, kóry bedzie szukał tylko jeden dany board
   };

  constructor(page: Page, boardPage: BoardsPage) {
    super(page, "/");
  }

  async createNewBoard(boardName: string): Promise<void> {
    await this.locators.createNewBoard().click();
    await expect(this.locators.boardTitleInput()).toBeVisible();
    await expect(this.locators.boardTitleRequired()).toHaveText("Board title is required");
    await this.locators.boardTitleInput().fill(boardName);
    await this.locators.createBoardBtn().click();
    // jak napisac test który sparwdzi czy dobrze sie wyswietla po przeładaniu strony
  }

  async missingRequitedFields(): Promise<void> {
    await this.locators.createNewBoard().click();
    await expect(this.locators.createBoardBtn()).toBeEnabled();
  }

  async clickOnBoardOnBoardsPage(boardName:string): Promise<void>{
    await this.locators.createdBoardName(boardName).click();
  }

  async checkIfDeletedBoardIsNotVisible(createdBoard: string): Promise<void>{
    await expect(this.locators.createdBoardName(createdBoard)).toBeHidden();
  }
}
