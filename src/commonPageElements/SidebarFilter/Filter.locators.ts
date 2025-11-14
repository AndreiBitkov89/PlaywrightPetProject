import { Locator, Page } from "@playwright/test";

export class FilterLocators {
  readonly minPrice: Locator;
  readonly maxPrice: Locator;
  readonly priceFilter: Locator;
  readonly updatePrice: Locator;

  constructor(public readonly page: Page) {
    this.minPrice = page.locator("input#min");
    this.priceFilter = page.locator("button[aria-label='Price']");
    this.updatePrice = page.locator("xpath=//button[text()='Update price']");
    this.maxPrice = page.locator("input#max");
  }
}
