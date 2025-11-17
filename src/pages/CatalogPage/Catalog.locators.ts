import { Locator, Page } from "@playwright/test";

export class CatalogLocators {
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
    this.sidebar = page.getByTestId('sidebar');
    this.result = page.getByTestId('resultsTablet');
    this.items = page.getByTestId('listingProductGridTablet');
    this.itemCounter = page.locator(".ResultsSummary__resultsSummary");
    this.sortBy = page.locator("button[aria-label='Sort By']");
    this.cards = page.locator("div[data-testid^='product-card-']");
    this.newBadge = page.locator('img[src*="EN_86fd4272de.png"]');
    this.emptyListMessage = page.locator(
      ".EmptyListingFallback__textWrapper h2",
    );
    this.emptyListSearch = page.locator(".ExpandableSearchInput__inputWrapper");
  }

}
