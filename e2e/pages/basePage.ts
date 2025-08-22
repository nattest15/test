import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page, baseUrl: string = "/") {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}`);
  }
}
