import { LoginPage } from "../pages/LoginPage";
import { UserNavigationSection } from "../pages/PageElements/UserNavigationSection";
import { test, expect } from "@playwright/test";
import { ErrorField } from "../tests/loginFlowTests.ts/constants/ErrorFields";
import { Errors } from "../tests/loginFlowTests.ts/constants/Errors";

export class LoginSteps {
  constructor(
    private readonly loginPage: LoginPage,
    private userSection: UserNavigationSection
  ) {}

  async openPage(): Promise<LoginSteps> {
    await test.step("Open registration page", async () => {
      await this.loginPage.goto();
    });
    return this;
  }

  async fillFieldsAndSubmit(
    login: string | null,
    password: string | null
  ): Promise<LoginSteps> {
    await test.step("Fill all required fields", async () => {
      await this.loginPage.fillAllFields(login, password);
    });
    return this;
  }

  async assertSuccess(): Promise<boolean> {
    return await test.step("Assert registration is successful", async () => {
      return (
        (await this.loginPage.isLoginSuccessful()) &&
        (await this.userSection.isAccountAvailable())
      );
    });
  }


  async assertErrorText(errorField: ErrorField, errorText: Errors) {
    expect(await this.loginPage.getErrorText(errorField)).toEqual(errorText);
  }
}
