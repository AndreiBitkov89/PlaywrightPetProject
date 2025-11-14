import { Locator, Page } from "@playwright/test";

export class MiniCartLocators {
  readonly title: Locator;
  readonly viewBagButton: Locator;
  readonly totalPrice: Locator;
  readonly miniCartItemRoot: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.title = this.page.locator(".MiniCart__title");
    this.viewBagButton = this.page.getByTestId("mini-cart-proceed-button");
    this.totalPrice = this.page.locator(".MiniCart__total");
    this.miniCartItemRoot = this.page.locator(".MiniCartItem__item");
  }
}
