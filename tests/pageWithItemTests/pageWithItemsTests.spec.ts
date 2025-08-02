import { test, expect } from "@playwright/test";
import { AppContext } from "../../steps/AppContext";
import { CATEGORIES } from "./constants/ItemCategories";
import { ItemPageSteps } from "../../steps/ItemPageSteps";

test.describe("Page with items flow", () => {
  let steps: ItemPageSteps;
  let appContext: AppContext;

  test.beforeEach(async ({ page }) => {
    appContext = new AppContext(page);
    steps = new ItemPageSteps(appContext);
  });

  test("Open page with items and check loading and title", async () => {
    await steps.openPage(CATEGORIES.flareBootcutJeans.urlAnchor);
    await steps.checkPageIsLoaded(
      CATEGORIES.flareBootcutJeans.expectedTitleContains
    );
  });
});
