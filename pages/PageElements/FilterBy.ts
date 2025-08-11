import { Page, Locator, expect } from "@playwright/test";
import { FilterElements as el } from "../../locatorsStorage/FilterElements";

export class FilterBy {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async applyPriceFilter(min: string, max: string) {
    await this.page.locator(el.priceFilter).scrollIntoViewIfNeeded();
    await this.page.locator(el.priceFilter).click();
    await expect(this.page.locator(el.minPrice)).toBeVisible();
    await this.page.locator(el.minPrice).fill(min);
    await this.page.locator(el.maxPrice).fill(max);

    await this.page.locator(el.updatePrice).click()

  }
}
