import { Page } from "@playwright/test";
import { LoginPageElements as el } from "../locatorsStorage/LoginPageElements";
import { BasePage } from "./BasePage";

export class MyFavorites extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto("/de/en/my-favorites");
  }
}
