import { Page, expect } from "@playwright/test";
import { FilterLocators } from "./Filter.locators";
import { PriceRange } from "../../interfaces/testData";

export class SidebarFilterBy {
  readonly el: FilterLocators;

  constructor(private readonly page: Page) {
    this.page = page;
    this.el = new FilterLocators(this.page);
  }

  async applyPriceFilter(priceRange: PriceRange): Promise<void> {
    await this.el.priceFilter.scrollIntoViewIfNeeded();

    await expect(this.el.minPrice).toBeVisible();

    if (priceRange.min !== null) {
      await this.el.minPrice.fill(priceRange.min.toString());
    }

    if (priceRange.max !== null) {
      await this.el.maxPrice.fill(priceRange.max.toString());
    }

    await this.el.updatePrice.click();
  }
}
