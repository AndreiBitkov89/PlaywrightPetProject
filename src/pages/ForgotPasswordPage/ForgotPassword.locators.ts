import { Locator, Page } from "@playwright/test";

export class ForgotPasswordLocators {
  readonly sendEmailButton: Locator;
  readonly cancelButton: Locator;

  constructor(public readonly page: Page) {
    this.sendEmailButton = page.getByText("Send reset link");
    this.cancelButton = page.getByText("Cancel");
  }
}
