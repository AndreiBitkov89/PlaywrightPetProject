import { RegistrationPage } from "../pages/RegistrationPage";
import { User } from "../valueObjects/User";
import { Store } from "../constants/Store";
import { test } from "@playwright/test";

export class RegistrationSteps {
  constructor(private readonly registrationPage: RegistrationPage) {}

  async openPage(): Promise<RegistrationSteps> {
    await test.step("Open registration page", async () => {
      await this.registrationPage.goto();
    });
    return this;
  }

  async fillFields(user: User): Promise<RegistrationSteps> {
    await test.step("Fill all required fields", async () => {
      await this.registrationPage.fillAllRequiredFields(user);
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

  async assertSuccess(): Promise<RegistrationSteps> {
    await test.step("Assert registration is successful", async () => {
      await this.registrationPage.isRegistrationSuccessful();
    });
    return this;
  }
}
