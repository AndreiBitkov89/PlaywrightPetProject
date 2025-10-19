import { test } from "@playwright/test";
import { AppContext } from "../../src/steps/AppContext";
import { ItemCategories, CATEGORY_DATA } from "../../src/constants/ItemCategories"
import { PageWithItemsSteps } from "../../src/steps/PageWithItemsSteps";
import { ItemSteps } from "../../src/steps/ItemSteps";

test.describe("Page with items flow", () => {
  let itemPageSteps: PageWithItemsSteps;
  let itemSteps: ItemSteps;
  let appContext: AppContext;

  test.beforeEach(async ({ page }) => {
    appContext = new AppContext(page);
    itemPageSteps = new PageWithItemsSteps(appContext);
    itemSteps = new ItemSteps(appContext);
  });

  test("Open item page and check title and price", async () => {
    await itemPageSteps.openPage(ItemCategories.FlareBootcutJeans);
    await itemPageSteps.checkPageIsLoaded(
      CATEGORY_DATA.FlareBootcutJeans.expectedTitleContains
    );

    await itemSteps.checkThatCorrectItemPageIsOpened(1);
  });

  test("Open item page and increase quantity on 1", async () => {
    await itemPageSteps.openPage(ItemCategories.Tops);
    await itemPageSteps.checkPageIsLoaded(
      CATEGORY_DATA.Tops.expectedTitleContains
    );

    await itemSteps.checkThatCorrectItemPageIsOpened(2);
    await itemSteps.changeQuantity(true);
  });

  test("Open item page and increase quantity on 5", async () => {
    await itemPageSteps.openPage(ItemCategories.Tops);
    await itemPageSteps.checkPageIsLoaded(
      CATEGORY_DATA.Tops.expectedTitleContains
    );

    await itemSteps.checkThatCorrectItemPageIsOpened(2);
    await itemSteps.changeQuantity(true, 5);
  });
});
