import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { HomePageLocators } from "./HomePage.locators";

export class HomePage extends BasePage {
  readonly el: HomePageLocators;

  constructor(page: Page) {
    super(page);
    this.el = new HomePageLocators(page);
  }

  async goto(): Promise<HomePage> {
    await this.page.goto("/");

    return this;
  }

  async isLoaded(): Promise<boolean> {
    await this.closePopupsIfExists();
    return await this.el.main.isVisible();
  }
}
