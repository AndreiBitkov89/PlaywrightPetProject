import { test } from "../../src/fixtures/fixture";
import {
  CATEGORY_DATA,
  ItemCategories,
} from "../../src/constants/ItemCategories";
import { PageWithItemsSteps } from "../../src/steps/PageWithItemsSteps";
import { ItemSteps } from "../../src/steps/ItemSteps";
import { Products } from "../../src/constants/Products";

test.describe("Page with items flow", () => {
  let pageWithItemsSteps: PageWithItemsSteps;
  let itemSteps: ItemSteps;

  test.beforeEach(async ({ app }) => {
    pageWithItemsSteps = new PageWithItemsSteps(app);
    itemSteps = new ItemSteps(app);
  });

  test("Open item page and check title and price", async () => {
    await pageWithItemsSteps.openPage(ItemCategories.FlareBootcutJeans);
    await pageWithItemsSteps.checkPageIsLoaded(
      CATEGORY_DATA.FlareBootcutJeans.expectedTitleContains,
    );

    await itemSteps.openItemPageWithTitleAndPriceAssert(1);
  });

  test("Open item page and increase quantity on 1", async () => {
    await pageWithItemsSteps.openPage(ItemCategories.Tops);
    await pageWithItemsSteps.checkPageIsLoaded(
      CATEGORY_DATA.Tops.expectedTitleContains,
    );

    await itemSteps.openItemPageWithTitleAndPriceAssert(2);
    await itemSteps.changeQuantity(true);
    await itemSteps.assertQuantity(2)
  });

  test("Open item page and increase quantity on 5", async () => {
    await pageWithItemsSteps.openPage(ItemCategories.Tops);
    await pageWithItemsSteps.checkPageIsLoaded(
      CATEGORY_DATA.Tops.expectedTitleContains,
    );

    await itemSteps.openItemPageWithTitleAndPriceAssert(2);
    await itemSteps.changeQuantity(true, 5);
      await itemSteps.assertQuantity(6)
  });

  test("Add item to cart and assert it in mini cart", async () => {
    await itemSteps.gotItemPageWithUrl(Products.aerieHenley);
    await itemSteps.addItemToCard();
    await itemSteps.assertItemAddedInMiniCart();
  });
});
