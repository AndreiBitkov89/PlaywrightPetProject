import { expect, test } from "@playwright/test";
import { AppContext } from "./AppContext";
import { ProductCard } from "../commonPageElements/ProductCard/ProductCard";
import { DropdownItems, priceRanges } from "../constants/common.const";
import { ItemCategories, CATEGORY_DATA } from "../constants/ItemCategories";
import { PriceRange } from "../interfaces/testData";
import { SortPrice } from "../helpers/SortPrice";

export class CatalogSteps {
  private sp = new SortPrice();

  constructor(private ctx: AppContext) {}

  async openPage(category: ItemCategories): Promise<this> {
    await test.step("Open item page", async () => {
      const { urlAnchor, expectedTitleContains } = CATEGORY_DATA[category];
      await this.ctx.catalogPage.goto(urlAnchor);
      await this.ctx.catalogPage.isLoaded(expectedTitleContains);
    });

    return this;
  }

  async checkPageIsLoaded(title: string) {
    await test.step("Check that page contains correct title and elements", async () => {
      await this.ctx.catalogPage.isLoaded(title);
    });
  }

  async assertQuantityAndStructureOfItems() {
    await test.step("Assert structure and quantity of item cards", async () => {
      const realCards = await this.ctx.catalogPage.returnAllRealCardLocators();
      for (let i = 0; i < realCards.length; i++) {
        const card = new ProductCard(realCards[i]);
        await card.assertAllElementsVisible();
      }
    });
  }

  async addItemInFavorites(index: number) {
    await test.step("Assert adding the item in My Favorites List", async () => {
      const card = await this.ctx.catalogPage.findCardFromIndex(index);
      const title = await card.getTitleText();
      if (typeof title !== "string") {
        throw new Error("Expected 'title' to be a string");
      }
      await card.clickFavorites();
      await this.ctx.userNavigationSection.goToFavorites();
      await this.ctx.myFavorites.isLoaded();
      await this.ctx.myFavorites.isItemDisplayed(title);
    });
  }

  async applyFilterByNew() {
    await test.step("Apply Filter By New", async () => {
      await this.ctx.sortingDropdown.sortBy(DropdownItems.New);
      const card = await this.ctx.catalogPage.waitForFirstCard();
      await new ProductCard(card).assertAllElementsVisible();

      await expect(card).toBeVisible();
      const newBadge = card.locator(this.ctx.catalogPage.getNewBadge);
      await expect(newBadge).toBeVisible();
    });
  }

  async applyFilterLowHigh() {
    await test.step("Apply Filter from Low to High", async () => {
      await this.ctx.sortingDropdown.sortBy(DropdownItems.PriceLowHigh);
      const arr = await this.ctx.catalogPage.getAllPrices();
      expect(this.sp.isAsc(arr)).toBeTruthy();
    });
  }

  async applyFilterHighLow() {
    await test.step("Apply Filter from High to Low", async () => {
      await this.ctx.sortingDropdown.sortBy(DropdownItems.PriceHighLow);
      const arr = await this.ctx.catalogPage.getAllPrices();
      expect(this.sp.isDesc(arr)).toBeTruthy();
    });
  }

  async checkPricesRange(priceRange: PriceRange): Promise<boolean> {
    await this.ctx.catalogPage.waitForFirstCard();
    await this.ctx.catalogPage.loadAllCards();
    const arr = await this.ctx.catalogPage.getAllPrices();
    return arr.every(
      (price) => price >= priceRange.min && price <= priceRange.max,
    );
  }

  async checkEmptyList(): Promise<boolean> {
    return (
      (await this.ctx.catalogPage.getEmptyListMessageLocator.isVisible()) &&
      (await this.ctx.catalogPage.getEmptyListSearch.isVisible())
    );
  }

  async sortingItems(sortingType: DropdownItems) {
    await test.step("Assert sorting items in the page", async () => {
      if (sortingType === DropdownItems.New) {
        await this.applyFilterByNew();
      }
      if (sortingType === DropdownItems.PriceHighLow) {
        await this.applyFilterHighLow();
      }
      if (sortingType === DropdownItems.PriceLowHigh) {
        await this.applyFilterLowHigh();
      }
    });
  }

  async applyPriceFilterAndCheckItems(priceRange: PriceRange): Promise<void> {
    await test.step("Apply filter and correct range of displayed prices", async () => {
      await this.ctx.sidebarFilter.applyPriceFilter(priceRange);
      await this.checkPricesRange(priceRange);
    });
  }

  async getEmptyListAndCheckMessage() {
    await test.step("Apply filter and get empty list of items", async () => {
      await this.ctx.sidebarFilter.applyPriceFilter(priceRanges.empty);
      await this.checkEmptyList();
      await this.ctx.catalogPage.getEmptyListMessage();
    });
  }
}
