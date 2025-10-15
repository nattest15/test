import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class BoardsPage extends BasePage {
  private locators = {
    createNewBoard: (): Locator => this.page.getByTestId("create-new-board"),
    boardTitleInput: (): Locator => this.page.getByTestId("create-board-title-input"),
    boardTitleRequired: (): Locator => this.page.getByText("board-title-required-error"),
    visibilityDropdown: (): Locator => this.page.getByTestId("create-board-select-visibility-select--value-container"),
    createBoardBtn: (): Locator => this.page.getByTestId("create-board-select-visibility-select--control"),
  };
  constructor(page: Page) {
    super(page, "/");
  }

  async createNewBoard(boardName: string): Promise<void> {
    await this.locators.createNewBoard().click();
    await expect (this.locators.boardTitleRequired()).toBeVisible();
    await this.locators.boardTitleInput().fill(boardName);
    await this.locators.createBoardBtn().click();
  }

  
}