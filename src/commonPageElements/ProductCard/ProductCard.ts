import { Locator, expect } from "@playwright/test";
import { SortPrice } from "../../helpers/SortPrice";

export class ProductCard {
  private readonly sp = new SortPrice();
  readonly favoriteButton: string;
  readonly title: string;
  readonly originalPrice: string;
  readonly currentPrice: string;
  readonly image: string;

  constructor(private readonly root: Locator) {
    this.favoriteButton = "button[aria-label='Favorites']";
    this.title = '[data-testid="product-card-title"]';
    this.originalPrice = '[data-testid="originalPrice"]';
    this.currentPrice = "[data-testid='currentPrice']";
    this.image = '[data-testid$="-image-link"]';
  }

  get getTitle(): Locator {
    return this.root.locator(this.title);
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
    await expect(this.root.locator(this.originalPrice)).toBeVisible();
    await expect(this.root.locator(this.image)).toBeVisible();
    await expect(this.root.locator(this.title)).toBeVisible();
    await expect(this.root.locator(this.favoriteButton)).toBeVisible();
  }
  async scrollIntoView(): Promise<void> {
    await this.root.scrollIntoViewIfNeeded();
  }

  async getPrice(): Promise<number | null> {
    const discount = this.root.locator(this.currentPrice ?? "");
    if (this.currentPrice && (await discount.count())) {
      const txt = await discount.first().textContent();
      return txt ? this.sp.parsePrice(txt) : null;
    }

    const regular = this.root.locator(this.originalPrice);
    if (await regular.count()) {
      const txt = await regular.first().textContent();
      return txt ? this.sp.parsePrice(txt) : null;
    }
    return null;
  }

  async getOriginalPrice(): Promise<number | null> {
    const txt = await this.root.locator(this.originalPrice).textContent();

    if (!txt) return null;
    return this.sp.parsePrice(txt);
  }

  async clickTitle() {
    await this.getTitle.waitFor({ state: "visible" });
    await this.getTitle.click();
  }
}
