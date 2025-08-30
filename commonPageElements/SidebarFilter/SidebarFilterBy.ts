import { Page, expect } from "@playwright/test";
import { FilterElements as el } from "./FilterElements";

export class SidebarFilterBy {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async applyPriceFilter(min: number | null, max: number | null) {
    await this.page.locator(el.priceFilter).scrollIntoViewIfNeeded();

    await expect(this.page.locator(el.minPrice)).toBeVisible();

    if (min !== null) {
      await this.page.locator(el.minPrice).fill(min.toString());
    }

    if (max !== null) {
      await this.page.locator(el.maxPrice).fill(max.toString());
    }

    await this.page.locator(el.updatePrice).click();
  }
}
