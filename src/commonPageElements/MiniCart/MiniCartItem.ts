import { Locator } from "@playwright/test";

export class MiniCartItem {
  readonly miniCartItemRoot: Locator;
  readonly aboutItemBlock: Locator;
  readonly removeItemButton: Locator;
  readonly title: Locator;
  readonly price: Locator;

  constructor(root: Locator) {
    this.miniCartItemRoot = root;
    this.title = root.locator(".MiniCartItem__title");
    this.aboutItemBlock = root.locator(".MiniCartItem__aboutItem");
    this.removeItemButton = root.locator(".MiniCartItem__remove");
    this.price = root.getByTestId("originalPrice");
  }

  async remove() {
    await this.removeItemButton.click();
  }

  get getTitle(): Locator {
    return this.title;
  }

  get getItemPrice(): Locator {
    return this.price;
  }
}
