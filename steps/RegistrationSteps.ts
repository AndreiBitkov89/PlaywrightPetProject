
import { User } from "../valueObjects/NewUser";
import { Store } from "../tests/registrationFlowTests/constants/Store";
import { Errors } from "../tests/registrationFlowTests/constants/Errors";
import { ErrorField } from "../tests/registrationFlowTests/constants/ErrorFields";
import { test, expect } from "@playwright/test";
import { AppContext } from "../steps/AppContext"

export class RegistrationSteps {
  constructor(
    private ctx: AppContext
  ) {}

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
      await this.ctx.registrationPage.fillAllRequiredFields(user, wrongPassword);
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

  async assertErrorText(errorField: ErrorField, errorText: Errors) {
    expect(await this.ctx.registrationPage.getErrorText(errorField)).toEqual(
      errorText
    );
  }
}
