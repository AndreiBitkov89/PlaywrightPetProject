import {test, expect} from "../../src/fixtures/fixture";
import {
    ItemCategories,
    CATEGORY_DATA,
} from "../../src/constants/ItemCategories";
import {CatalogSteps} from "../../src/steps/CatalogSteps";
import {commonMessages, DropdownItems, priceRanges} from "../../src/constants/common.const";
import {SortPrice} from "../../src/helpers/SortPrice";

test.describe("Page with items flow tests", () => {
    let steps: CatalogSteps;
    const sp = new SortPrice();

    test.beforeEach(async ({app}) => {
        steps = new CatalogSteps(app);
    });

    test("Open page with items and check loading and title", async () => {
        await steps.openPage(ItemCategories.FlareBootcutJeans);
        await steps.checkPageIsLoaded(
            CATEGORY_DATA.FlareBootcutJeans.expectedTitleContains,
        );
    });
    test("Check number and structure of items in American Eagle", async () => {
        await steps.openPage(ItemCategories.FlareBootcutJeans);
        await steps.assertQuantityAndStructureOfItems();
    });

    test("Check number and structure of items in Aerie", async () => {
        await steps.openPage(ItemCategories.Bra);
        await steps.checkPageIsLoaded(CATEGORY_DATA.Bra.expectedTitleContains);
        await steps.assertQuantityAndStructureOfItems();
    });

    test("Add item in favorites and check it", async () => {
        await steps.openPage(ItemCategories.FlareBootcutJeans);
        await steps.checkPageIsLoaded(CATEGORY_DATA.Bra.expectedTitleContains);
        await steps.addItemInFavorites(2);
    });

    test("Sort items by new", async () => {
        await steps.openPage(ItemCategories.Tops);
        await steps.checkPageIsLoaded(CATEGORY_DATA.Tops.expectedTitleContains);
        const card = await steps.applyFilterByNewAndReturnFirstCardBadge();
        await expect(card).toBeVisible();
    });

    test("Sort prices from low to high", async () => {
        await steps.openPage(ItemCategories.FlareBootcutJeans);
        await steps.checkPageIsLoaded(
            CATEGORY_DATA.FlareBootcutJeans.expectedTitleContains,
        );
        const prices = await steps.sortingItemsByPrice(DropdownItems.PriceLowHigh);
        expect(sp.isAsc(prices)).toBeTruthy();
    });

    test("Sort prices from high to low", async () => {
        await steps.openPage(ItemCategories.FlareBootcutJeans);
        await steps.checkPageIsLoaded(
            CATEGORY_DATA.FlareBootcutJeans.expectedTitleContains,
        );
        const prices = await steps.sortingItemsByPrice(DropdownItems.PriceHighLow);
        expect(sp.isDesc(prices)).toBeTruthy();
    });

    test("Filter prices in correct range", async () => {
        await steps.openPage(ItemCategories.FlareBootcutJeans);
        await steps.checkPageIsLoaded(
            CATEGORY_DATA.FlareBootcutJeans.expectedTitleContains,
        );
        await steps.applyPriceFilterAndCheckItems(priceRanges.correct);
    });

    test("Apply Filter and get empty list", async () => {
        await steps.openPage(ItemCategories.Tops);
        await steps.checkPageIsLoaded(CATEGORY_DATA.Tops.expectedTitleContains);
        expect(await steps.getEmptyItemList()).toEqual(commonMessages.emptyItemListMessage)
    });
});
