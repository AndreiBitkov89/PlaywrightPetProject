import {expect} from "@playwright/test";
import {AppContext} from "./AppContext";
import {buttonTitles} from "../constants/ItemPageConstants";
import {Products} from "../constants/Products";

export class ItemSteps {
    constructor(private ctx: AppContext) {
    }

    async gotItemPageWithUrl(product: Products) {
        await this.ctx.itemPage.gotToItemPageWithUrl(product);
    }

    async openItemPageWithTitleAndPriceAssert(index: number) {
        const originalPrice = await this.ctx.pageWithItems.getOriginalPrice(index);
        const title = await this.ctx.pageWithItems.getItemName(index);
        await this.ctx.pageWithItems.goToItem(index);
        await this.ctx.itemPage.isLoaded();
        expect(await this.ctx.itemPage.getOriginalPrice()).toEqual(originalPrice);
        expect(await this.ctx.itemPage.getItemTitle()).toEqual(title);
    }

    async getQuantity() {
        return await this.ctx.itemPage.getQuantity();
    }

    async chooseSizeByIndex(index: number) {
        let buttonText = await this.ctx.itemPage.addToCartText();
        expect(buttonText).toContain(buttonTitles.chooseSize);
        await this.ctx.itemPage.getSizeButton(index).click();
        buttonText = await this.ctx.itemPage.addToCartText();
        expect(buttonText).toContain(buttonTitles.add);
    }

    async addItemToCard() {
        await this.ctx.itemPage.geAddToCart.click();
    }

    async getSizeErrorText() {
        await this.ctx.itemPage.getSizeError().waitFor({state: "visible"})
        return await this.ctx.itemPage.getSizeError().textContent()
    }

    async assertItemAddedInMiniCart() {
        expect(await this.ctx.miniCart.isMiniCartDisplayed()).toBe(true);
        const title = await this.ctx.itemPage.getItemTitle();
        if (title) {
            expect(await this.ctx.miniCart.isItemInCart(title)).toBe(true);
        }
    }

    async increaseQuantity( steps: number = 1) {
        await this.ctx.itemPage.getQuantityInput.waitFor({state: "visible"});
        for (let i = 0; i < steps; i++) {
            await this.ctx.itemPage.getIncrementButton.click();
        }
    }

    async decreaseQuantity( steps: number = 1) {
        await this.ctx.itemPage.getQuantityInput.waitFor({state: "visible"});
        for (let i = 0; i < steps; i++) {
            await this.ctx.itemPage.getDecrementButton.click();
        }
    }

}
