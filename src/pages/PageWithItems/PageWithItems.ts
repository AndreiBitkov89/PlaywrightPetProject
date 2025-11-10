import {Locator, Page, expect} from "@playwright/test";
import {PageWithItemsLocators} from "./PageWithItems.locators";
import {BasePage} from "../BasePage";
import {ProductCard} from "../../commonPageElements/ProductCard/ProductCard";
import {SortingDropdown} from "../../commonPageElements/SortingDropdown/SortingDropdown";
import {DropdownItems} from "../../constants/common.const";
import {SortPrice} from "../../helpers/SortPrice";

export class PageWithItems extends BasePage {
    readonly el: PageWithItemsLocators;
    private sort: SortingDropdown;
    private sp = new SortPrice();

    constructor(page: Page) {
        super(page);
        this.el = new PageWithItemsLocators(page);
        this.sort = new SortingDropdown(page);
    }

    async goto(path: string): Promise<void> {
        await this.page.goto(`/de/en/${path}`);
    }

    async isLoaded(title: string): Promise<boolean> {
        await this.closePopupsIfExists();
        await this.el.title.scrollIntoViewIfNeeded();
        const isItemsVisible = await this.el.items.isVisible();
        const isResultVisible = await this.el.result.isVisible();
        const isSidebarVisible = await this.el.sidebar.isVisible();
        const isTitleVisible = await this.el.title.isVisible();
        const titleText = (await this.el.title.textContent())?.trim();

        const titleMatches = titleText?.includes(title) ?? false;

        return (
            isItemsVisible &&
            isResultVisible &&
            isSidebarVisible &&
            isTitleVisible &&
            titleMatches
        );
    }

    private cards(): Locator {
        return this.page.getByTestId(/^product-card-\d+$/);
    }

    async waitForFirstCard(): Promise<Locator> {
        const first = this.cards().first();
        await expect(first).toBeVisible();
        return first;
    }

    async loadAllCards(): Promise<void> {
        const delay = 300;
        const maxScrolls = 50;
        let prevCount = 0;

        for (let i = 0; i < maxScrolls; i++) {
            const cards = this.page.locator("div[data-testid^='product-card-']");
            const currentCount = await cards.count();

            if (currentCount === prevCount) {
                break;
            }

            await this.page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });

            await this.page.waitForTimeout(delay);
            prevCount = currentCount;
        }
    }

    async returnAllRealCardLocators(): Promise<Locator[]> {
        await this.waitForFirstCard();
        await this.loadAllCards();
        return await this.cards().all();
    }

    async findCardFromIndex(index: number): Promise<ProductCard> {
        const root = this.page.locator(`[data-testid="product-card-${index}"]`);
        return new ProductCard(root);
    }

    async applyFilterByNew() {
        await this.sort.sortBy(DropdownItems.New);
        const card = await this.waitForFirstCard();
        await new ProductCard(card).assertAllElementsVisible();

        await expect(card).toBeVisible();

        const newBadge = card.locator(this.el.newBadge);
        await expect(newBadge).toBeVisible();
    }

    async applyFilterLowHigh() {
        await this.sort.sortBy(DropdownItems.PriceLowHigh);
        const arr = await this.getAllPrices();
        expect(this.sp.isAsc(arr)).toBeTruthy();
    }

    async applyFilterHighLow() {
        await this.sort.sortBy(DropdownItems.PriceHighLow);
        const arr = await this.getAllPrices();
        expect(this.sp.isDesc(arr)).toBeTruthy();
    }

    async checkPricesRange(min: number, max: number): Promise<boolean> {
        await this.waitForFirstCard();
        await this.loadAllCards();
        const arr = await this.getAllPrices();
        return arr.every((price) => price >= min && price <= max);
    }

    async checkEmptyList(): Promise<boolean> {
        await this.el.emptyListMessage.waitFor({state: "visible"});
        return (
            (await this.el.emptyListMessage.isVisible()) &&
            (await this.el.emptyListSearch.isVisible())
        );
    }

    async getEmptyListMessage() {
        const text = await this.el.emptyListMessage.textContent();
        expect(text).not.toBeNull();
        expect(text).toContain(
            "Sorry, we couldn't find what you were looking for."
        );
    }

    async getAllPrices(): Promise<number[]> {
        await this.waitForFirstCard();
        await this.loadAllCards();

        const list = this.cards();
        const count = await list.count();

        const prices = await Promise.all(
            Array.from({length: count}, (_, i) =>
                new ProductCard(list.nth(i)).getPrice()
            )
        );
        return prices.filter(
            (n): n is number => typeof n === "number" && !Number.isNaN(n)
        );
    }

    async getItemName(index: number): Promise<string | null> {
        return await (await this.findCardFromIndex(index)).getTitleText();
    }

    async getOriginalPrice(index: number): Promise<number | null> {
        return await (await this.findCardFromIndex(index)).getOriginalPrice();
    }

    async goToItem(index: number) {
        await (await this.findCardFromIndex(index)).clickTitle();
    }
}
