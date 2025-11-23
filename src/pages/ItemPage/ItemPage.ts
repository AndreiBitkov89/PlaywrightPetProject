import {BasePage} from "../BasePage";
import {Locator, Page} from "@playwright/test";
import {ItemPageLocators} from "./ItemPage.locators";
import {SortPrice} from "../../helpers/SortPrice";

export class ItemPage extends BasePage {
    readonly sp = new SortPrice();
    readonly el: ItemPageLocators;

    constructor(page: Page) {
        super(page);
        this.el = new ItemPageLocators(page);
    }

    async gotToItemPageWithUrl(productTitle: string) {
        await this.page.goto(`/de/en/product/${productTitle}`);
    }

    async isLoaded(): Promise<boolean> {
        await this.el.sizeBlock.waitFor({state: "visible"});
        await this.closePopupsIfExists();
        return (
            (await this.el.sizeBlock.isVisible()) &&
            (await this.el.colorOptions.isVisible()) &&
            (await this.el.productDescription.first().isVisible()) &&
            (await this.el.quantitySelector.isVisible()) &&
            (await this.el.addToCart.isVisible())
        );
    }

    async getItemTitle(): Promise<string | null> {
        return await this.el.productTitle.textContent();
    }

    async getOriginalPrice(): Promise<number | null> {
        const priceInString = await this.el.originalPrice.textContent();

        if (priceInString != null) {
            return this.sp.parsePrice(priceInString);
        } else return null;
    }

    public get getQuantityInput() {
        return this.el.quantityInput;
    }

    public getSizeError() {
        return this.el.sizeError;
    }

    public async getQuantity(): Promise<number> {
        const value = await this.getQuantityInput.inputValue();
        if (!value) {
            throw new Error("Quantity input is empty");
        }
        return parseInt(value, 10);
    }

    public get getIncrementButton() {
        return this.el.incrementQuantity;
    }

    public get getDecrementButton() {
        return this.el.decrementQuantity;
    }

    public get getAddToCart(): Locator {
        return this.el.addToCart;
    }

    async addToCartText(): Promise<string | null> {
        return await this.el.addToCart.textContent();
    }

    public getSizeButton(index: number) {
        return this.el.sizeItem.nth(index);
    }
}
