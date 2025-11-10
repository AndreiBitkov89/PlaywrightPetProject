import { Page, expect } from "@playwright/test";
import { FilterLocators } from "./Filter.locators";

export class SidebarFilterBy {
    readonly el: FilterLocators;

  constructor(private readonly page: Page) {
    this.page = page;
    this.el = new FilterLocators(this.page);
  }

  async applyPriceFilter(min: number | null, max: number | null) {
    await this.el.priceFilter.scrollIntoViewIfNeeded();

    await expect(this.el.minPrice).toBeVisible();

    if (min !== null) {
      await this.el.minPrice.fill(min.toString());
    }

    if (max !== null) {
      await this.el.maxPrice.fill(max.toString());
    }

    await this.el.updatePrice.click();
  }
}
