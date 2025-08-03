import { Page, Locator, expect } from "@playwright/test";
import { ProductCardElements as el } from "../../locatorsStorage/ProductCardElements";

export class ProductCard {
  constructor(private readonly root: Locator) {}

  get title(): Locator {
    return this.root.locator(el.title);
  }

  async isVisible(): Promise<boolean> {
    await this.root.scrollIntoViewIfNeeded();
    return await this.root.isVisible();
  }

  async getTitleText(): Promise<string | null> {
    return (await this.title.textContent())?.trim() ?? null;
  }

  async clickImage(): Promise<void> {
    await this.root.locator(el.image).click();
  }

  async assertAllElementsVisible(): Promise<void> {
    await expect(this.root.locator(el.actualPrice)).toBeVisible();
    await expect(this.root.locator(el.image)).toBeVisible();
    await expect(this.root.locator(el.title)).toBeVisible();
    await expect(this.root.locator(el.favoriteButton)).toBeVisible();
  }
  async scrollIntoView(): Promise<void> {
    await this.root.scrollIntoViewIfNeeded();
  }
}
