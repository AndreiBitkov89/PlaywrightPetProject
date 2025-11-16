import { test } from "@playwright/test";
import { AppContext } from "./AppContext";
import { ProductCard } from "../commonPageElements/ProductCard/ProductCard";
import { DropdownItems, priceRanges } from "../constants/common.const";
import {
  ItemCategories,
  CATEGORY_DATA,
} from "../constants/ItemCategories";
import { PriceRange } from "../interfaces/testData";

export class CatalogSteps {
  constructor(private ctx: AppContext) {}

  async openPage(category: ItemCategories): Promise<this> {
    await test.step("Open item page", async () => {
      const { urlAnchor, expectedTitleContains } = CATEGORY_DATA[category];
      await this.ctx.pageWithItems.goto(urlAnchor);
      await this.ctx.pageWithItems.isLoaded(expectedTitleContains);
    });

    return this;
  }

  async checkPageIsLoaded(title: string) {
    await test.step("Check that page contains correct title and elements", async () => {
      await this.ctx.pageWithItems.isLoaded(title);
    });
  }

  async assertQuantityAndStructureOfItems() {
    await test.step("Assert structure and quantity of item cards", async () => {
      const realCards =
        await this.ctx.pageWithItems.returnAllRealCardLocators();
      for (let i = 0; i < realCards.length; i++) {
        const card = new ProductCard(realCards[i]);
        await card.assertAllElementsVisible();
      }
    });
  }

  async addItemInFavorites(index: number) {
    await test.step("Assert adding the item in My Favorites List", async () => {
      const card = await this.ctx.pageWithItems.findCardFromIndex(index);
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

  async sortingItems(sortingType: DropdownItems) {
    await test.step("Assert sorting items in the page", async () => {
      if (sortingType === DropdownItems.New) {
        await this.ctx.pageWithItems.applyFilterByNew();
      }
      if (sortingType === DropdownItems.PriceHighLow) {
        await this.ctx.pageWithItems.applyFilterHighLow();
      }
      if (sortingType === DropdownItems.PriceLowHigh) {
        await this.ctx.pageWithItems.applyFilterLowHigh();
      }
    });
  }

  async applyPriceFilterAndCheckItems(priceRange: PriceRange): Promise<void> {
    await this.ctx.sidebarFilter.applyPriceFilter(priceRange);
    await this.ctx.pageWithItems.checkPricesRange(priceRange);
  }

  async getEmptyListAndCheckMessage() {
    await this.ctx.sidebarFilter.applyPriceFilter(priceRanges.empty);
    await this.ctx.pageWithItems.checkEmptyList();
    await this.ctx.pageWithItems.getEmptyListMessage();
  }
}
