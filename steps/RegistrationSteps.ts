import { RegistrationPage } from "../pages/RegistrationPage";
import { UserNavigationSection } from "../pages/PageElements/UserNavigationSection";
import { User } from "../valueObjects/User";
import { Store } from "../tests/registrationFlowTests/constants/Store";
import { Errors } from "../tests/registrationFlowTests/constants/Errors";
import { ErrorField } from "../tests/registrationFlowTests/constants/ErrorFields";
import { test, expect } from "@playwright/test";

export class RegistrationSteps {
  constructor(
    private readonly registrationPage: RegistrationPage,
    private userSection: UserNavigationSection
  ) {}

  async openPage(): Promise<RegistrationSteps> {
    await test.step("Open registration page", async () => {
      await this.registrationPage.goto();
    });
    return this;
  }

  async fillFields(
    user: User,
    wrongPassword?: string
  ): Promise<RegistrationSteps> {
    await test.step("Fill all required fields", async () => {
      await this.registrationPage.fillAllRequiredFields(user, wrongPassword);
    });
    return this;
  }

  async checkTerms(): Promise<RegistrationSteps> {
    await test.step("Accept terms and conditions", async () => {
      await this.registrationPage.checkTheTerms();
    });
    return this;
  }

  async chooseStore(store: Store): Promise<RegistrationSteps> {
    await test.step(`Select store: ${store}`, async () => {
      await this.registrationPage.chooseStore(store);
    });
    return this;
  }

  async submit(): Promise<RegistrationSteps> {
    await test.step("Submit registration form", async () => {
      await this.registrationPage.submit();
    });
    return this;
  }

  async assertSuccess(): Promise<boolean> {
    return await test.step("Assert registration is successful", async () => {
      return (
        (await this.registrationPage.isRegistrationSuccessful()) &&
        (await this.userSection.isAccountAvailable())
      );
    });
  }

  async assertButtonSubmitDisabled(): Promise<boolean> {
    return await test.step("Assert that button Submit Registration is disabled", async () => {
      return await this.registrationPage.isSubmitButtonDisabled();
    });
  }

  async assertErrorText(errorField: ErrorField, errorText: Errors) {
    expect(await this.registrationPage.getErrorText(errorField)).toEqual(
      errorText
    );
  }
}
