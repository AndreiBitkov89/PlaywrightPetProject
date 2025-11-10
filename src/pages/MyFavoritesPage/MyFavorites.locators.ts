import { Locator, Page } from '@playwright/test';

export class MyFavoritesLocators {
    readonly title: Locator;

    constructor(public readonly page: Page) {
        this.title = page.locator("//h1//*[contains(text(), 'My Favorites')]");
    }
}
