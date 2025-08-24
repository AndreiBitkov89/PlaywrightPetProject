import { expect } from "@playwright/test";
import { AppContext } from "./AppContext";

export class ItemSteps {
  constructor(private ctx: AppContext) {}

  async checkThatCorrectItemPAgesIsOpened(index: number) {
    const originalPrice = await this.ctx.pageWithItems.getOriginalPrice(index);
    const title = await this.ctx.pageWithItems.getItemName(index);
    await this.ctx.pageWithItems.goToItem(index);

    await this.ctx.itemPage.isLoaded();
    expect(await this.ctx.itemPage.getOriginalPrice()).toEqual(originalPrice);
    expect(await this.ctx.itemPage.getItemTitle()).toEqual(title);
  }
}
