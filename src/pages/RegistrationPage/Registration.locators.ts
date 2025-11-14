import { Locator, Page } from "@playwright/test";

export class RegistrationLocators {
  readonly name: Locator;
  readonly surname: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly terms: Locator;
  readonly checkBoxStore: Locator;
  readonly submitButton: Locator;

  readonly errorName: Locator;
  readonly errorSurname: Locator;
  readonly errorEmail: Locator;
  readonly errorPassword: Locator;
  readonly errorConfirmPassword: Locator;

  constructor(public readonly page: Page) {
    this.name = page.locator("#given_name");
    this.surname = page.locator("#family_name");
    this.email = page.locator("input#email");
    this.password = page.locator("#password");
    this.confirmPassword = page.locator("#confirmPassword");
    this.terms = page.locator("#terms");
    this.checkBoxStore = page.locator(
      "input[name^='marketingInterest-klaviyo=",
    );
    this.submitButton = page.locator("//*[text()='Create an account']");

    this.errorName = page.locator('*[data-testid="input-message-given_name"]');
    this.errorSurname = page.locator(
      '*[data-testid="input-message-family_name"]',
    );
    this.errorEmail = page.locator('*[data-testid="input-message-email"]');
    this.errorPassword = page.locator(
      '*[data-testid="input-message-password"]',
    );
    this.errorConfirmPassword = page.locator(
      '*[data-testid="input-message-confirmPassword"]',
    );
  }
}
