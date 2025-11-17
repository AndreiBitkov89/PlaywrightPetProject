import {Page} from "@playwright/test";
import {MyFavoritesLocators} from "./MyFavorites.locators";
import {BasePage} from "../BasePage";
import {urls} from "../../constants/urlStorage";

export class MyFavorites extends BasePage {
    readonly el: MyFavoritesLocators;

    constructor(page: Page) {
        super(page);
        this.el = new MyFavoritesLocators(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(urls.myFavorites);
    }

    async isLoaded(): Promise<boolean> {
        return await this.el.title.isVisible();
    }

    async isItemDisplayed(itemTitle: string): Promise<boolean> {
        const xpath = `xpath=//div//*[contains(text(), '${itemTitle}')]`;
        await this.page.locator(xpath).waitFor({state: "visible"});
        return await this.page.locator(xpath).isVisible();
    }
}
