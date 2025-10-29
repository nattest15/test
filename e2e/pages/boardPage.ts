import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class BoardPage extends BasePage {
  public locators = {
    boardNameOnHeader: (): Locator => this.page.getByTestId("board-name-container"),
    threeDotsBtn: (): Locator => this.page.getByLabel('Show menu'),
    closeBoardOption: (): Locator => this.page.getByRole("button", {name: 'Close board'}),
    closeConfirmBtn: (): Locator => this.page.getByTestId("popover-close-board-confirm"),
    deleteBoardBtn: (): Locator => this.page.getByTestId("close-board-delete-board-button"),
    titleOnBoardToBeDeleted:(): Locator => this.page.getByText("This board is closed. Reopen the board to make changes."),
    permanentlyCloseBoardBtn: (): Locator => this.page.getByTestId("close-board-delete-board-button"),
    deleteConfirmBtn: (): Locator => this.page.getByTestId("close-board-delete-board-confirm-button")


  };
  constructor(page: Page) {
    super(page, "/");
  }

  async checkIfBoardNameIsVisible(boardName: string): Promise<void> {
    await expect(this.locators.boardNameOnHeader()).toHaveText(boardName);
  }
  async editBoardName(boardName: string, editedBoardName: string): Promise<void> {
    await expect(this.locators.boardNameOnHeader()).toHaveText(boardName);
    await this.locators.boardNameOnHeader().dblclick();
    await this.locators.boardNameOnHeader().fill(editedBoardName);
    await this.locators.boardNameOnHeader().press("Enter");
  }

  async deleteBoard(boardName: string): Promise<void> {
    await this.locators.threeDotsBtn().click();
    await this.locators.closeBoardOption().click();
    await this.locators.closeConfirmBtn().click();
    await expect(this.locators.titleOnBoardToBeDeleted()).toBeVisible();
    await this.locators.threeDotsBtn().click();
    await this.locators.permanentlyCloseBoardBtn().click();
    await this.locators.deleteConfirmBtn().click();
  }
}
