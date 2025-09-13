import { BasePage } from "../BasePage";
import { Page } from "@playwright/test";
import { ItemPageElements as el } from "./ItemPageElements";
import { SortPrice } from "../../helpers/SortPrice";
import { expect } from "@playwright/test";

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

  async changeQuantityAndCheckChanges(increase: boolean, steps: number = 1) {
    const quantityInput = this.page.locator(el.quantityInput);
    const button = increase
      ? this.page.locator(el.incrementQuantity)
      : this.page.locator(el.decrementQuantity);

    await quantityInput.waitFor({ state: "visible" });

    const initialQuantity = await this.getQuantity();

    for (let i = 0; i < steps; i++) {
      await button.click();
    }

    await expect
      .poll(async () => await this.getQuantity())
      .toBe(increase ? initialQuantity + steps : initialQuantity - steps);
  }

  private async getQuantity(): Promise<number> {
  const input = this.page.locator(el.quantityInput);
  const value = await input.inputValue();

  if (!value) {
    throw new Error("Quantity input is empty");
  }

  return parseInt(value, 10);
}

}
