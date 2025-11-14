import { Locator, Page } from "@playwright/test";

export class LoginPageLocators {
  readonly login: Locator;
  readonly password: Locator;
  readonly submitLogin: Locator;
  readonly createAccountLink: Locator;
  readonly errorGeneralMessage: Locator;
  readonly errorLogin: Locator;
  readonly errorPassword: Locator;
  readonly forgotPassLink: Locator;

  constructor(public readonly page: Page) {
    this.login = page.locator("*[type='phoneOrEmail']");
    this.password = page.locator("*[type='password']");
    this.submitLogin = page.locator("button.Form__submitButton");
    this.createAccountLink = page.locator(
      "[data-testid='create-account-link']",
    );
    this.errorGeneralMessage = page.locator(".InfoMessage__title");
    this.errorLogin = page.locator(
      "[data-testid='input-message-phoneOrEmail']",
    );
    this.errorPassword = page.locator("[data-testid='input-message-password']");
    this.forgotPassLink = page.locator("[data-testid='forgot-password-link']");
  }
}
