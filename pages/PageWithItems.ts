import { Page, expect } from "@playwright/test";
import { PageWithItemsElements as el } from "../locatorsStorage/PageWithItemsElements";
import { BasePage } from "./BasePage";

export class PageWithItems extends BasePage {
  constructor(protected page: Page) {
    super(page);
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(`/de/en/american-eagle/${path}`);
  }

  async isLoaded(title: string): Promise<boolean> {
    await this.closePopupsIfExists();

    const isItemsVisible = await this.page.locator(el.items).isVisible();
    const isResultVisible = await this.page.locator(el.result).isVisible();
    const isSidebarVisible = await this.page.locator(el.sidebar).isVisible();
    const isTitleVisible = await this.page.locator(el.title).isVisible();
    const titleText = (await this.page.locator(el.title).textContent())?.trim();

    const titleMatches = titleText?.includes(title) ?? false;

    return (
      isItemsVisible &&
      isResultVisible &&
      isSidebarVisible &&
      isTitleVisible &&
      titleMatches
    );
  }
}
