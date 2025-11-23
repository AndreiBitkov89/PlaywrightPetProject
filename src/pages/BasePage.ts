import {Locator, Page} from "@playwright/test";
import {tryCloseIfVisible} from "../helpers/tryCloseIfVisible";

export class BasePage {
    constructor(public page: Page) {
    }

    async closePopupsIfExists(): Promise<void> {
        const subscribeDialogClose = this.page.locator("button[aria-label='Close dialog']");
        const cookieClose = this.page.locator(
            '#onetrust-close-btn-container .onetrust-close-btn-handler',
        );
        await Promise.allSettled([
            tryCloseIfVisible(subscribeDialogClose),
            tryCloseIfVisible(cookieClose),
        ]);
    }

    async safeClick(locator: Locator): Promise<void> {
        try {
            await locator.click();
        } catch {
            await this.closePopupsIfExists();
            await locator.click();
        }
    }

    get returnPage() {
        return this.page;
    }
}
