import { test, expect } from "@playwright/test";
import { LoginErrors } from "../constants/common.const";
import { AppContext } from "./AppContext";
import { ErrorFieldLogin } from "../constants/common.const";

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
      await this.ctx.loginPage.fillAllFields(login, password);
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
    expect(await this.ctx.loginPage.getErrorText(errorField)).toEqual(
      errorText,
    );
  }

  async goToForgotPassAndCheckRedirection() {
    await this.ctx.loginPage.goToForgotPass();
    expect(await this.ctx.forgotPasswordPage.isLoaded()).toBe(true);
  }

  async goToRegistrationFromSignInAndCheckRedirection() {
    await this.ctx.loginPage.goToRegistrationFromSignIn();
    expect(await this.ctx.registrationPage.isLoaded()).toBeTruthy();
  }
}
