import { User } from "../valueObjects/NewUser";
import { test, expect } from "@playwright/test";
import { AppContext } from "./AppContext";
import {RegistrationErrors, ErrorFieldRegistration, Store} from "../constants/common.const";

export class RegistrationSteps {
  constructor(private ctx: AppContext) {}

  async openPage(): Promise<RegistrationSteps> {
    await test.step("Open registration page", async () => {
      await this.ctx.registrationPage.goto();
    });
    return this;
  }

  async fillFields(
    user: User,
    wrongPassword?: string
  ): Promise<RegistrationSteps> {
    await test.step("Fill all required fields", async () => {
      await this.ctx.registrationPage.fillAllRequiredFields(
        user,
        wrongPassword
      );
    });
    return this;
  }

  async checkTerms(): Promise<RegistrationSteps> {
    await test.step("Accept terms and conditions", async () => {
      await this.ctx.registrationPage.checkTheTerms();
    });
    return this;
  }

  async chooseStore(store: Store): Promise<RegistrationSteps> {
    await test.step(`Select store: ${store}`, async () => {
      await this.ctx.registrationPage.chooseStore(store);
    });
    return this;
  }

  async submit(): Promise<RegistrationSteps> {
    await test.step("Submit registration form", async () => {
      await this.ctx.registrationPage.submit();
    });
    return this;
  }

  async assertSuccess(): Promise<boolean> {
    return await test.step("Assert registration is successful", async () => {
      return (
        (await this.ctx.registrationPage.isRegistrationSuccessful()) &&
        (await this.ctx.userNavigationSection.isAccountAvailable())
      );
    });
  }

  async assertButtonSubmitDisabled(): Promise<boolean> {
    return await test.step("Assert that button Submit Registration is disabled", async () => {
      return await this.ctx.registrationPage.isSubmitButtonDisabled();
    });
  }

  async assertErrorText(errorField: ErrorFieldRegistration, errorText: RegistrationErrors) {
    expect(await this.ctx.registrationPage.getErrorText(errorField)).toEqual(
      errorText
    );
  }
}
