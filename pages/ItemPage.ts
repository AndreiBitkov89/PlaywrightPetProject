import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";
import { ItemPageElements as el } from "../locatorsStorage/ItemPageElements";
import { SortPrice } from "../helpers/SortPrice";

export class ItemPage extends BasePage {
  sp = new SortPrice();

  constructor(page: Page) {
    super(page);
  }

  async isLoaded(): Promise<boolean> {
    await this.page.locator(el.sizeBlock).waitFor({ state: "visible" });
    return (
      (await this.page.locator(el.sizeBlock).isVisible()) &&
      (await this.page.locator(el.colorOptions).isVisible()) &&
      (await this.page.locator(el.productDescription).first().isVisible()) &&
      (await this.page.locator(el.quantitySelector).isVisible()) &&
      (await this.page.locator(el.addToCart).isVisible())
    );
  }

  async getItemTitle(): Promise<string | null> {
    return await this.page.locator(el.productTitle).textContent();
  }

  async getOriginalPrice(): Promise<number | null> {
    const priceInString = await this.page
      .locator(el.originalPrice)
      .textContent();

    if (priceInString != null) {
      return this.sp.parsePrice(priceInString);
    } else return null;
  }
}
