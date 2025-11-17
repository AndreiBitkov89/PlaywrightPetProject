import {test} from "../../src/fixtures/fixture";
import {
    CATEGORY_DATA,
    ItemCategories,
} from "../../src/constants/ItemCategories";
import {CatalogSteps} from "../../src/steps/CatalogSteps";
import {ItemSteps} from "../../src/steps/ItemSteps";
import {Products} from "../../src/constants/Products";
import {expect} from "@playwright/test";
import {ItemPageErrors} from "../../src/constants/common.const";

test.describe("Page with items flow tests", () => {
    let pageWithItemsSteps: CatalogSteps;
    let itemSteps: ItemSteps;

    test.beforeEach(async ({app}) => {
        pageWithItemsSteps = new CatalogSteps(app);
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
        await itemSteps.increaseQuantity();
        expect(await itemSteps.getQuantity()).toEqual(2);
    });

    test("Open item page and increase quantity on 5", async () => {
        await pageWithItemsSteps.openPage(ItemCategories.Tops);
        await pageWithItemsSteps.checkPageIsLoaded(
            CATEGORY_DATA.Tops.expectedTitleContains,
        );
        await itemSteps.openItemPageWithTitleAndPriceAssert(2);
        await itemSteps.increaseQuantity(5);
        expect(await itemSteps.getQuantity()).toEqual(6);
    });

    test("Try to add item to cart without choosing size and assert error", async () => {
        await itemSteps.gotItemPageWithUrl(Products.aerieHenley);
        await itemSteps.addItemToCard();
        const error = await itemSteps.getSizeErrorText();
        expect(error).toContain(ItemPageErrors.SIZE_NOT_CHOSEN)
    });

    test("Add item to cart and assert it in mini cart", async () => {
        await itemSteps.gotItemPageWithUrl(Products.crewNeckSweater);
        await itemSteps.chooseSizeByIndex(0);
        await itemSteps.addItemToCard();
        await itemSteps.assertItemAddedInMiniCart();
    });
});
