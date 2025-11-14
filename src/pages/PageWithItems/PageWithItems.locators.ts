import { Locator, Page } from "@playwright/test";

export class PageWithItemsLocators {
  readonly title: Locator;
  readonly sidebar: Locator;
  readonly result: Locator;
  readonly items: Locator;
  readonly itemCounter: Locator;
  readonly sortBy: Locator;
  readonly cards: Locator;
  readonly newBadge: Locator;
  readonly emptyListMessage: Locator;
  readonly emptyListSearch: Locator;

  constructor(public readonly page: Page) {
    this.title = page.locator("h1 .HtmlText__primary");
    this.sidebar = page.locator("[data-testid='sidebar']");
    this.result = page.locator("[data-testid='resultsTablet']");
    this.items = page.locator("[data-testid='listingProductGridTablet']");
    this.itemCounter = page.locator(".ResultsSummary__resultsSummary");
    this.sortBy = page.locator("button[aria-label='Sort By']");
    this.cards = page.locator("div[data-testid^='product-card-']");
    this.newBadge = page.locator('img[src*="EN_86fd4272de.png"]');
    this.emptyListMessage = page.locator(
      ".EmptyListingFallback__textWrapper h2",
    );
    this.emptyListSearch = page.locator(".ExpandableSearchInput__inputWrapper");
  }

  cardByIndex = (i: number) => this.cards.nth(i);
  cardByName = (name: string) =>
    this.page
      .locator(
        "div[data-testid^='product-card-'] [data-testid='product-name']",
        { hasText: name },
      )
      .first();

  sortOptionByText = (text: string) =>
    this.page.getByRole("menuitem", { name: new RegExp(`^${text}$`, "i") });
}
