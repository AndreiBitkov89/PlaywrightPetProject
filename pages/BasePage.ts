import { Page, expect } from "@playwright/test";

export class BasePage {
  constructor( public page: Page) {}


  async closePopupsIfExists(): Promise<void> {
    const subscribeDialogClose = this.page.locator(
      "button[aria-label='Close dialog']"
    );
    const cookieBannerClose = this.page.locator(
      "#onetrust-close-btn-container .onetrust-close-btn-handler"
    );
    if (
      await subscribeDialogClose.isVisible({ timeout: 1000 }).catch(() => false)
    ) {
      await subscribeDialogClose.click().catch(() => {});
    }
    if (
      await cookieBannerClose.isVisible({ timeout: 1000 }).catch(() => false)
    ) {
      await cookieBannerClose.click().catch(() => {});
    }
  }

  async isLoaded(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }
}
