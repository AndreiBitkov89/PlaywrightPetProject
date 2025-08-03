import { test, expect } from "@playwright/test";
import { AppContext } from "./AppContext";
import {
  ItemCategories,
  CATEGORY_DATA,
} from "../tests/pageWithItemTests/constants/ItemCategories";
import { ProductCard } from "../pages/PageElements/ProductCard";

export class ItemPageSteps {
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
      console.log(realCards);

      for (let i = 0; i < realCards.length; i++) {
        const card = new ProductCard(realCards[i]);
        await card.assertAllElementsVisible();
      }
    });
  }
}
