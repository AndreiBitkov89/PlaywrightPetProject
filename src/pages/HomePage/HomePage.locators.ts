import { Locator, Page } from '@playwright/test';

export class HomePageLocators {
    readonly main: Locator;
    readonly navbar: Locator;
    readonly slider: Locator;
    readonly createAccountField: Locator;

    constructor(public readonly page: Page) {
        this.main = page.locator('main#main');
        this.navbar = page.locator('.navbar');
        this.slider = page.locator('.slick-slider');
        this.createAccountField = page.locator('.email-signup-input');
    }

}
