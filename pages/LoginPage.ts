import { Page } from "@playwright/test";
import { LoginPageElements as el } from "../locatorsStorage/LoginPageElements";
import { BasePage } from "./BasePage";
import { ErrorField } from "../tests/loginFlowTests.ts/constants/ErrorFields";
import { InputField } from "../elementsObjects/InputField";

export class LoginPage extends BasePage {
  private loginField: InputField;
  private passwordField: InputField;

  constructor(page: Page) {
    super(page);
    this.loginField = new InputField(page, el.login);
    this.passwordField = new InputField(page, el.password);
  }

  async goto(): Promise<void> {
    await this.page.goto("/de/en/account/sign-in");
  }

  async fillLogin(email: string | null): Promise<void> {
    if (typeof email === "string") {
      await this.loginField.fill(email);
    }
  }

  async fillPassword(password: string | null): Promise<void> {
    if (typeof password === "string") {
      await this.passwordField.fill(password);
    }
  }

  async fillAllFields(email: string | null, password: string | null) {
    await this.fillLogin(email);
    await this.fillPassword(password);
    await this.page.click(el.submitLogin);
  }

  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.page
        .locator(el.login)
        .waitFor({ state: "hidden", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorText(field: ErrorField): Promise<string | null> {
    const errorLocators: Record<ErrorField, string> = {
      [ErrorField.Email]: el.errorLogin,
      [ErrorField.Password]: el.errorPassword,
      [ErrorField.General]: el.errorGeneralMessage,
    };

    const selector = errorLocators[field];
    await this.page.waitForSelector(selector);
    return await this.page.locator(selector).textContent();
  }

  async goToForgotPass(){
    await this.page.locator(el.forgotPassLink).click();
    await this.page.waitForURL('/de/en/account/forgot-password')
  }
}
