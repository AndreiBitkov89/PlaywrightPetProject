import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";
import { ForgotPasswordElements as el } from "../locatorsStorage/ForgotPasswordElements";

export class ForgotPasswordPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isLoaded(): Promise<boolean> {
    await this.page
      .locator(el.cancelButton)
      .waitFor({ state: "visible", timeout: 4000 });
    await this.page
      .locator(el.sendEmailButton)
      .waitFor({ state: "visible", timeout: 4000 });

    return this.page.locator(el.cancelButton).isVisible();
  }
}
