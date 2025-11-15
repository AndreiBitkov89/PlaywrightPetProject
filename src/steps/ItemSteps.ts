import { expect } from "@playwright/test";
import { AppContext } from "./AppContext";
import { buttonTitles } from "../constants/ItemPageConstants";
import { Products } from "../constants/Products";

export class ItemSteps {
  constructor(private ctx: AppContext) {}

  async openItemPageWithTitleAndPriceAssert(index: number) {
    const originalPrice = await this.ctx.pageWithItems.getOriginalPrice(index);
    const title = await this.ctx.pageWithItems.getItemName(index);
    await this.ctx.pageWithItems.goToItem(index);
    await this.ctx.itemPage.isLoaded();
    expect(await this.ctx.itemPage.getOriginalPrice()).toEqual(originalPrice);
    expect(await this.ctx.itemPage.getItemTitle()).toEqual(title);
  }

  async changeQuantity(increase: boolean, steps: number = 1) {
    await this.ctx.itemPage.changeQuantityAndCheckChanges(increase, steps);
  }

  async assertQuantity(expectedAmount: number) {
      const actualAmount = await this.ctx.itemPage.getQuantity();
      expect(actualAmount).toEqual(expectedAmount);
  }

  async gotItemPageWithUrl(product: Products) {
    await this.ctx.itemPage.gotToItemPageWithUrl(product);
  }

  async addItemToCard() {
    let buttonText = await this.ctx.itemPage.addToCartText();
    expect(buttonText).toContain(buttonTitles.chooseSize);
    await this.ctx.itemPage.selectSize(0);
    buttonText = await this.ctx.itemPage.addToCartText();
    expect(buttonText).toContain(buttonTitles.add);
    await this.ctx.itemPage.addToCart();
    expect(await this.ctx.miniCart.isMiniCartDisplayed()).toBe(true);
  }

  async assertItemAddedInMiniCart() {
    const title = await this.ctx.itemPage.getItemTitle();
    if (title) {
      expect(await this.ctx.miniCart.isItemInCart(title)).toBe(true);
    }
  }
}
