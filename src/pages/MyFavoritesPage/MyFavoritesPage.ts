import { Page } from "@playwright/test";
import { MyFavoritesElements as el } from "./MyFavoritesElements";
import { BasePage } from "../BasePage";

export class MyFavorites extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto("/de/en/my-favorites");
  }

  async isLoaded(): Promise<boolean> {
    await this.page.waitForSelector(el.title);
    return await this.page.locator(el.title).isVisible();
  }

  async isItemDisplayed(itemTitle: string): Promise<boolean> {
    const xpath = `xpath=//div//*[contains(text(), '${itemTitle}')]`;

    await this.page.locator(xpath).waitFor({ state: "visible" });

    return await this.page.locator(xpath).isVisible();
  }
}
