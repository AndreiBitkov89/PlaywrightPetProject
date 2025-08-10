import { Locator, Page, expect } from "@playwright/test";
import { PageWithItemsElements as el } from "../locatorsStorage/PageWithItemsElements";
import { BasePage } from "./BasePage";
import { ProductCard } from "./PageElements/ProductCard";
import { SortingDropdown } from "./PageElements/SortingDropdown";
import { DropdownItems } from "./PageElements/constants/DropdownItems";

export class PageWithItems extends BasePage {
  private sort: SortingDropdown;
  constructor(page: Page) {
    super(page);
    this.sort = new SortingDropdown(page);
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

  private cards(): Locator {
  return this.page.getByTestId(/^product-card-\d+$/);
}

  async waitForFirstCard(): Promise<Locator> {
    const first = this.cards().first();
    await expect(first).toBeVisible();
    return first;
  }

  async loadAllCards(): Promise<void> {
    const delay = 300;
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

  async returnAllRealCardLocators(): Promise<Locator[]> {
    await this.waitForFirstCard();
    await this.loadAllCards();
    console.log(await this.cards().all());
    return await this.cards().all();
  }

  async findCardFromIndex(index: number): Promise<ProductCard> {
    const root = this.page.locator(`[data-testid="product-card-${index}"]`);
    return new ProductCard(root);
  }

  async applyFilterByNew() {
    await this.sort.sortBy(DropdownItems.New);
    const card = await this.waitForFirstCard();
    new ProductCard(card).assertAllElementsVisible();

    await expect(card).toBeVisible();

    const newBadge = card.locator(el.new);
    await expect(newBadge).toBeVisible();
  }
}
