import { expect, Page } from "@playwright/test";
import { MiniCartLocators } from "./MiniCartLocators";
import { MiniCartItem } from "./MiniCartItem";

export class MiniCart {
  private el: MiniCartLocators;

  constructor(public readonly page: Page) {
    this.page = page;
    this.el = new MiniCartLocators(page);
  }

  async getItems(): Promise<MiniCartItem[]> {
    const count = await this.el.miniCartItemRoot.count();
    const items: MiniCartItem[] = [];

    for (let i = 0; i < count; i++) {
      const itemRoot = this.el.miniCartItemRoot.nth(i);
      items.push(new MiniCartItem(itemRoot));
    }

    return items;
  }

  getItemByTitle(title: string): MiniCartItem {
    const root = this.el.miniCartItemRoot.filter({ hasText: title });
    return new MiniCartItem(root);
  }

  async proceedToCheckout() {
    await this.el.viewBagButton.click();
  }

  async getTotalPrice(): Promise<string | null> {
    return this.el.totalPrice.textContent();
  }

  async isItemInCart(title: string): Promise<boolean> {
    const item = this.el.miniCartItemRoot.filter({ hasText: title });
    return await item
      .first()
      .isVisible()
      .catch(() => false);
  }

  async isMiniCartDisplayed() {
    try {
      await expect(this.el.title).toBeVisible({ timeout: 3000 });
      await expect(this.el.totalPrice).toBeVisible({ timeout: 3000 });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
