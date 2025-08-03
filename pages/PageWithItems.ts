import { Locator, Page, expect } from "@playwright/test";
import { PageWithItemsElements as el } from "../locatorsStorage/PageWithItemsElements";
import { BasePage } from "./BasePage";

export class PageWithItems extends BasePage {
  constructor(page: Page) {
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

  async returnAllRealCardLocators(): Promise<Locator[]> {
    await this.page.waitForSelector("div[data-testid='product-card-1']");

    await this.scrollToLoadAllCards();

    const all = this.page.locator("div[data-testid]");
    const count = await all.count();
    const result: Locator[] = [];

    for (let i = 0; i < count; i++) {
      const el = all.nth(i);
      const testId = await el.getAttribute("data-testid");

      if (testId && /^product-card-\d+$/.test(testId)) {
        result.push(el);
      }
    }

    return result;
  }

  async scrollToLoadAllCards(): Promise<void> {
    const scrollStep = 500;
    const delay = 300;

    let prevHeight = 0;
    let currentHeight = await this.page.evaluate(
      () => document.body.scrollHeight
    );

    while (currentHeight > prevHeight) {
      await this.page.mouse.wheel(0, scrollStep);
      await this.page.waitForTimeout(delay);
      prevHeight = currentHeight;
      currentHeight = await this.page.evaluate(
        () => document.body.scrollHeight
      );
    }
  }
}
