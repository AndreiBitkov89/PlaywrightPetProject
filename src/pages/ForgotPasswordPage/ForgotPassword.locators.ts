import { Locator, Page } from "@playwright/test";

export class ForgotPasswordLocators {
  readonly sendEmailButton: Locator;
  readonly cancelButton: Locator;

  constructor(public readonly page: Page) {
    this.sendEmailButton = page.locator("//*[text() = 'Send reset link']");
    this.cancelButton = page.locator("//*[text() = 'Cancel']");
  }
}
