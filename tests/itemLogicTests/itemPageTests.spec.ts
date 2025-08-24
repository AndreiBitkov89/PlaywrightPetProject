import { test } from "@playwright/test";
import { AppContext } from "../../steps/AppContext";
import { ItemCategories, CATEGORY_DATA } from "./constants/ItemCategories";
import { PageWithItemsSteps } from "../../steps/PageWithItemsSteps";
import { ItemSteps } from "../../steps/ItemSteps";

test.describe("Page with items flow", () => {
  let itemPageSteps: PageWithItemsSteps;
  let itemSteps: ItemSteps;
  let appContext: AppContext;

  test.beforeEach(async ({ page }) => {
    appContext = new AppContext(page);
    itemPageSteps = new PageWithItemsSteps(appContext);
    itemSteps = new ItemSteps(appContext);
  });

  test("Open correct item and check title and price", async () => {
    await itemPageSteps.openPage(ItemCategories.FlareBootcutJeans);
    await itemPageSteps.checkPageIsLoaded(
      CATEGORY_DATA.FlareBootcutJeans.expectedTitleContains,
    );

    await itemSteps.checkThatCorrectItemPAgesIsOpened(1);
  });
});
