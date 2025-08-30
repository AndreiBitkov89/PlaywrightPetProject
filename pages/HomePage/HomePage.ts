import { Page } from "@playwright/test";
import { HomePageElements as el } from "./HomePageElements";
import { BasePage } from "../BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<HomePage> {
    await this.page.goto("/");

    return this;
  }

  async isLoaded(): Promise<boolean> {
    await this.closePopupsIfExists();
    return await this.page.locator(el.main).isVisible();
  }
}
