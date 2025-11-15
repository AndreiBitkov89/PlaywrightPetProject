import {Locator, Page} from "@playwright/test";

export class ItemPageLocators {
    readonly productTitle: Locator;
    readonly originalPrice: Locator;
    readonly sizeBlock: Locator;
    readonly sizeItem: Locator;
    readonly addToCart: Locator;
    readonly productDescription: Locator;
    readonly quantitySelector: Locator;
    readonly colorOptions: Locator;
    readonly incrementQuantity: Locator;
    readonly decrementQuantity: Locator;
    readonly quantityInput: Locator;

    constructor(public readonly page: Page) {
        this.productTitle = page.getByTestId("product-name");
        this.originalPrice = page.getByTestId("originalPrice");
        this.sizeBlock = page.locator("#product-options-size");
        this.sizeItem = page.locator(
            "#product-options-size > div.style__group.chip-group > button",
        );
        this.addToCart = page.getByTestId("add-to-cart");
        this.productDescription = page.getByTestId("productDescription");
        this.quantitySelector = page.getByTestId("quantity-selector");
        this.colorOptions = page.getByTestId("color-options");
        this.incrementQuantity = page.getByTestId('increment-btn');
        this.decrementQuantity = page.getByTestId("decrement-btn");
        this.quantityInput = page.getByTestId("quantity-input");
    }
}
