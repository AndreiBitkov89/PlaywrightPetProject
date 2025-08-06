import { Locator, Page, expect } from "@playwright/test";
import { PageWithItemsElements as el } from "../locatorsStorage/PageWithItemsElements";
import { BasePage } from "./BasePage";
import { ProductCard } from "./PageElements/ProductCard";

export class PageWithItems extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(`/de/en/${path}`);
  }

  async isLoaded(title: string): Promise<boolean> {
    await this.closePopupsIfExists();
    await this.page.locator(el.title).scrollIntoViewIfNeeded();
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
    const delay = 500;
    const maxScrolls = 50;
    let prevCount = 0;

    for (let i = 0; i < maxScrolls; i++) {
      const cards = this.page.locator("div[data-testid^='product-card-']");
      const currentCount = await cards.count();

      if (currentCount === prevCount) {
        break;
      }

      await this.page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });

      await this.page.waitForTimeout(delay);
      prevCount = currentCount;
    }
  }

  async findCardFromIndex(index: number): Promise<ProductCard> {
    const testId = `product-card-${index}`;
    const root = this.page.locator(`[data-testid="${testId}"]`);
    return new ProductCard(root);
  }
}
