import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page, protected baseUrl: string = "/") {}

  async goto() {
    await this.page.goto(this.baseUrl);
  }
}
