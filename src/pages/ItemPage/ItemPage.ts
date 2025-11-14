import { BasePage } from "../BasePage";
import { Page } from "@playwright/test";
import { ItemPageLocators } from "./ItemPage.locators";
import { SortPrice } from "../../helpers/SortPrice";
import { expect } from "@playwright/test";

export class ItemPage extends BasePage {
  readonly sp = new SortPrice();
  readonly el: ItemPageLocators;

  constructor(page: Page) {
    super(page);
    this.el = new ItemPageLocators(page);
  }

  async gotToItemPageWithUrl(productTitle: string) {
    await this.page.goto(`/de/en/product/${productTitle}`);
  }

  async isLoaded(): Promise<boolean> {
    await this.el.sizeBlock.waitFor({ state: "visible" });
    return (
      (await this.el.sizeBlock.isVisible()) &&
      (await this.el.colorOptions.isVisible()) &&
      (await this.el.productDescription.first().isVisible()) &&
      (await this.el.quantitySelector.isVisible()) &&
      (await this.el.addToCart.isVisible())
    );
  }

  async getItemTitle(): Promise<string | null> {
    return await this.el.productTitle.textContent();
  }

  async getOriginalPrice(): Promise<number | null> {
    const priceInString = await this.el.originalPrice.textContent();

    if (priceInString != null) {
      return this.sp.parsePrice(priceInString);
    } else return null;
  }

  async changeQuantityAndCheckChanges(increase: boolean, steps: number = 1) {
    const quantityInput = this.el.quantityInput;
    const button = increase
      ? this.el.incrementQuantity
      : this.el.decrementQuantity;

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
    const input = this.el.quantityInput;
    const value = await input.inputValue();

    if (!value) {
      throw new Error("Quantity input is empty");
    }

    return parseInt(value, 10);
  }

  async addToCart(): Promise<void> {
    await this.el.addToCart.click();
  }

  async addToCartText(): Promise<string | null> {
    return await this.el.addToCart.textContent();
  }

  async selectSize(index: number): Promise<void> {
    await this.el.sizeItem.nth(index).click();
  }
}
