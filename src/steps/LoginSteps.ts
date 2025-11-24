import { test, expect } from "../fixtures/fixture";
import { LoginErrors } from "../constants/common.const";
import { AppContext } from "./AppContext";
import { ErrorFieldLogin } from "../constants/common.const";
import { urls } from "../constants/urlStorage";
import {Locator} from "@playwright/test";

export class LoginSteps {
  constructor(private ctx: AppContext) {}

  async openPage(): Promise<this> {
    await test.step("Open registration page", async () => {
      await this.ctx.loginPage.goto();
    });
    return this;
  }

  async fillFieldsAndSubmit(
    login: string | null,
    password: string | null,
  ): Promise<this> {
    await test.step("Fill all required fields", async () => {
      await this.ctx.loginPage.fillLogin(login);
      await this.ctx.loginPage.fillPassword(password);
      await this.ctx.loginPage.getSubmitButton.click();
    });
    return this;
  }

  async assertSuccess(): Promise<boolean> {
    return await test.step("Assert registration is successful", async () => {
      return (
        (await this.ctx.loginPage.isLoginSuccessful()) &&
        (await this.ctx.userNavigationSection.isAccountAvailable())
      );
    });
  }

  async assertErrorText(errorField: ErrorFieldLogin, errorText: LoginErrors) {
    const errorLocators: Record<ErrorFieldLogin, Locator> = {
      [ErrorFieldLogin.Email]: this.ctx.loginPage.getErrorLogin,
      [ErrorFieldLogin.Password]: this.ctx.loginPage.getErrorPassword,
      [ErrorFieldLogin.General]: this.ctx.loginPage.getErrorGeneralMessage,
    };

    const error = await errorLocators[errorField].textContent();

    expect(error).toEqual(errorText);
  }

  async goToForgotPassAndCheckRedirection() {
    await this.goToForgotPass();
    expect(await this.ctx.forgotPasswordPage.isLoaded()).toBe(true);
  }

  async goToRegistrationFromSignInAndCheckRedirection() {
    await this.goToRegistrationFromSignIn();
    expect(await this.ctx.registrationPage.isLoaded()).toBeTruthy();
  }

  async goToForgotPass() {
    await this.ctx.loginPage.getForgotPassLink.click();
    await expect(this.ctx.loginPage.returnPage).toHaveURL(urls.forgotPassword);
  }

  async goToRegistrationFromSignIn() {
    await this.ctx.loginPage.getCreateAccountLink.click();
  }
}
