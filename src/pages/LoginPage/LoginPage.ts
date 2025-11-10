import {Locator, Page} from "@playwright/test";
import { LoginPageLocators } from "./LoginPage.locators";
import { BasePage } from "../BasePage";
import { InputField } from "../../elementsObjects/InputField";
import { ErrorFieldLogin } from "../../constants/common.const";

export class LoginPage extends BasePage {
  private loginField: InputField;
  private passwordField: InputField;
  readonly el:LoginPageLocators

  constructor(page: Page) {
    super(page);
    this.el = new LoginPageLocators(page);
    this.loginField = new InputField(this.el.login);
    this.passwordField = new InputField(this.el.password);
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
    await this.el.submitLogin.click();
  }

  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.el.login
        .waitFor({ state: "hidden", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorText(field: ErrorFieldLogin): Promise<string | null> {
    const errorLocators: Record<ErrorFieldLogin, Locator> = {
      [ErrorFieldLogin.Email]: this.el.errorLogin,
      [ErrorFieldLogin.Password]: this.el.errorPassword,
      [ErrorFieldLogin.General]: this.el.errorGeneralMessage,
    };

    const selector = errorLocators[field];
    return await selector.textContent();
  }

  async goToForgotPass() {
    await this.el.forgotPassLink.click();
    await this.page.waitForURL("/de/en/account/forgot-password");
  }

  async goToRegistrationFromSignIn() {
    await this.el.createAccountLink.click();
  }
}
