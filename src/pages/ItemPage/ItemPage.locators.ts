import {Locator, Page} from '@playwright/test';

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
        this.productTitle = page.locator("*[data-testid='product-name']");
        this.originalPrice = page.locator("*[data-testid='originalPrice']");
        this.sizeBlock = page.locator("#product-options-size");
        this.sizeItem = page.locator("#product-options-size > div.style__group.chip-group > button");
        this.addToCart = page.locator("*[data-testid='add-to-cart']");
        this.productDescription = page.locator("*[data-testid='productDescription']");
        this.quantitySelector = page.locator("*[data-testid='quantity-selector']");
        this.colorOptions = page.locator("*[data-testid='color-options']");
        this.incrementQuantity = page.locator('*[data-testid="increment-btn"]');
        this.decrementQuantity = page.locator('*[data-testid="decrement-btn"]');
        this.quantityInput = page.locator('*[data-testid="quantity-input"]');

    }

}
