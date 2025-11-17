import { BasePage } from "../BasePage";
import { Page } from "@playwright/test";
import { ForgotPasswordLocators } from "./ForgotPassword.locators";

export class ForgotPasswordPage extends BasePage {
  readonly el: ForgotPasswordLocators;

  constructor(page: Page) {
    super(page);
    this.el = new ForgotPasswordLocators(page);
  }

  async isLoaded(): Promise<boolean> {
    await this.el.cancelButton.waitFor({ state: "visible", timeout: 4000 });
    await this.el.sendEmailButton.waitFor({ state: "visible", timeout: 4000 });
    return this.el.cancelButton.isVisible();
  }
}
