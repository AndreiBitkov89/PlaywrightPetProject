import { Locator, expect } from "@playwright/test";
import { ProductCardElements as el } from "./ProductCardElements";
import { SortPrice } from "../../src/helpers/SortPrice";

export class ProductCard {
  private readonly sp = new SortPrice();

  constructor(private readonly root: Locator) {}

  get title(): Locator {
    return this.root.locator(el.title);
  }

  async isVisible(): Promise<boolean> {
    return await this.root.isVisible();
  }

  async getTitleText(): Promise<string | null> {
    await this.isVisible();
    return (await this.title.textContent())?.trim() ?? null;
  }

  async clickImage(): Promise<void> {
    await this.root.locator(el.image).click();
  }

  async clickFavorites(): Promise<void> {
    await this.root.locator(el.favoriteButton).click();
  }

  async assertAllElementsVisible(): Promise<void> {
    await expect(this.root.locator(el.originalPrice)).toBeVisible();
    await expect(this.root.locator(el.image)).toBeVisible();
    await expect(this.root.locator(el.title)).toBeVisible();
    await expect(this.root.locator(el.favoriteButton)).toBeVisible();
  }
  async scrollIntoView(): Promise<void> {
    await this.root.scrollIntoViewIfNeeded();
  }

  async getPrice(): Promise<number | null> {
    const discount = this.root.locator(el.currentPrice ?? "");
    if (el.currentPrice && (await discount.count())) {
      const txt = await discount.first().textContent();
      return txt ? this.sp.parsePrice(txt) : null;
    }

    const regular = this.root.locator(el.originalPrice);
    if (await regular.count()) {
      const txt = await regular.first().textContent();
      return txt ? this.sp.parsePrice(txt) : null;
    }
    return null;
  }

  async getOriginalPrice(): Promise<number | null> {
    const txt = await this.root.locator(el.originalPrice).textContent();

    if (!txt) return null;
    return this.sp.parsePrice(txt);
  }

  async clickTitle() {
    await this.title.waitFor({ state: "visible" });
    await this.title.click();
  }
}
