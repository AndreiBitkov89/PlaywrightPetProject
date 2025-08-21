import { Page, expect } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) {}

  async closePopupsIfExists(): Promise<void> {
    const subscribeDialogClose = this.page.locator(
      "button[aria-label='Close dialog']",
    );
    const cookieBannerClose = this.page.locator(
      "#onetrust-close-btn-container .onetrust-close-btn-handler",
    );
    try {
      await subscribeDialogClose.waitFor({ state: "visible", timeout: 1000 });
      await subscribeDialogClose.click();
    } catch {}

    try {
      await cookieBannerClose.waitFor({ state: "visible", timeout: 1000 });
      await cookieBannerClose.click();
    } catch {}
  }

  async isLoaded(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }
}
