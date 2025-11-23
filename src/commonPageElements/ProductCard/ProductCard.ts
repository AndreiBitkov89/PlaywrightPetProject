import { Locator, expect } from "@playwright/test";
import { SortPrice } from "../../helpers/SortPrice";

export class ProductCard {
  private readonly sp = new SortPrice();
  readonly favoriteButton: string;
  readonly title: string;
  readonly originalPrice: string;
  readonly currentPrice: string;
  readonly quickBuyButton: string;
  readonly image: string;

  constructor(private readonly root: Locator) {
    this.favoriteButton = "button[aria-label='Favorites']";
    this.title = "product-card-title";
    this.originalPrice = "originalPrice";
    this.currentPrice = "currentPrice";
    this.image = '[data-testid$="-image-link"]';
    this.quickBuyButton = "quick-buy-button";
  }

  get getTitle(): Locator {
    return this.root.getByTestId(this.title);
  }

  async isVisible(): Promise<boolean> {
    return await this.root.isVisible();
  }

  async getTitleText(): Promise<string | null> {
    await this.isVisible();
    return (await this.getTitle.textContent())?.trim() ?? null;
  }

  async clickImage(): Promise<void> {
    await this.root.locator(this.image).click();
  }

  async clickFavorites(): Promise<void> {
    await this.root.locator(this.favoriteButton).click();
  }

  async assertAllElementsVisible(): Promise<void> {
    await expect(this.root.getByTestId(this.originalPrice)).toBeVisible();
    await expect(this.root.locator(this.image)).toBeVisible();
    await expect(this.root.getByTestId(this.title)).toBeVisible();
    await expect(this.root.locator(this.favoriteButton)).toBeVisible();
  }

  async scrollIntoView(): Promise<void> {
    await this.root.scrollIntoViewIfNeeded();
  }

  async getPrice(): Promise<number | null> {
    const discount = this.root.getByTestId(this.currentPrice ?? "");
    if (this.currentPrice && (await discount.count())) {
      const txt = await discount.first().textContent();
      return txt ? this.sp.parsePrice(txt) : null;
    }

    const regular = this.root.getByTestId(this.originalPrice);
    if (await regular.count()) {
      const txt = await regular.first().textContent();
      return txt ? this.sp.parsePrice(txt) : null;
    }
    return null;
  }

  async getOriginalPrice(): Promise<number | null> {
    const txt = await this.root.getByTestId(this.originalPrice).textContent();

    if (!txt) return null;
    return this.sp.parsePrice(txt);
  }

  async clickTitle() {
    await this.getTitle.waitFor({ state: "visible" });
    await this.getTitle.click();
  }

  get getQuickBuyButton() {
    return this.root.getByTestId(this.quickBuyButton);
  }

  async clickQuickBuyButton() {
    await this.getQuickBuyButton.waitFor({ state: "visible" });
    await this.getQuickBuyButton.click();
  }
}
