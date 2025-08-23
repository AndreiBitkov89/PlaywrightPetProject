import { Page } from "@playwright/test";
import { RegistrationElements as el } from "../locatorsStorage/RegistrationElements";
import { User } from "../valueObjects/NewUser";
import { BasePage } from "./BasePage";
import { ErrorField } from "../tests/registrationFlowTests/constants/ErrorFields";
import { InputField } from "../elementsObjects/InputField";

export class RegistrationPage extends BasePage {
  private nameField: InputField;
  private surnameField: InputField;
  private emailField: InputField;
  private passwordField: InputField;
  private confirmPasswordField: InputField;

  constructor(page: Page) {
    super(page);
    this.nameField = new InputField(page, el.name);
    this.surnameField = new InputField(page, el.surname);
    this.emailField = new InputField(page, el.email);
    this.passwordField = new InputField(page, el.password);
    this.confirmPasswordField = new InputField(page, el.confirmPassword);
  }

  async goto(): Promise<void> {
    await this.page.goto("/de/en/account/create");
  }

  async isLoaded(): Promise<boolean> {
    return (
      (await this.nameField.isVisible()) &&
      (await this.page.locator(el.submitButton).isVisible({ timeout: 3000 }))
    );
  }

  async fillName(name: string | null): Promise<void> {
    if (typeof name === "string") {
      await this.nameField.fill(name);
    }
  }

  async fillSurname(surname: string | null): Promise<void> {
    if (typeof surname === "string") {
      await this.surnameField.fill(surname);
    }
  }

  async fillEmail(email: string | null): Promise<void> {
    if (typeof email === "string") {
      await this.emailField.fill(email);
    }
  }

  async fillPassword(password: string | null): Promise<void> {
    if (typeof password === "string") {
      await this.passwordField.fill(password);
    }
  }

  async fillPasswordForConfirm(password: string | null): Promise<void> {
    if (typeof password === "string") {
      await this.confirmPasswordField.fill(password);
    }
  }

  async fillAllRequiredFields(
    user: User,
    wrongPassword?: string,
  ): Promise<RegistrationPage> {
    await this.fillName(user.firstName);
    await this.fillSurname(user.lastName);
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this.fillPasswordForConfirm(wrongPassword ?? user.password);
    return this;
  }

  async checkTheTerms(): Promise<RegistrationPage> {
    await this.page.locator(el.terms).check();
    return this;
  }

  async chooseStore(store: string): Promise<RegistrationPage> {
    await this.page.locator(`${el.checkBoxStore}${store}']`).check();
    return this;
  }

  async submit(): Promise<RegistrationPage> {
    await this.page.click(el.submitButton);
    return this;
  }

  async isSubmitButtonDisabled(): Promise<boolean> {
    return this.page.locator(el.submitButton).isDisabled();
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    try {
      await this.page
        .locator(el.name)
        .waitFor({ state: "hidden", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorText(field: ErrorField): Promise<string | null> {
    const errorLocators: Record<ErrorField, string> = {
      [ErrorField.Email]: el.errorEmail,
      [ErrorField.FirstName]: el.errorName,
      [ErrorField.Surname]: el.errorSurname,
      [ErrorField.Password]: el.errorPassword,
      [ErrorField.ConfirmPassword]: el.errorConfirmPassword,
    };

    const selector = errorLocators[field];
    await this.page.waitForSelector(selector);
    return await this.page.locator(selector).textContent();
  }

  async isValidationFailed(field: ErrorField): Promise<boolean> {
    const fields: Record<ErrorField, InputField> = {
      [ErrorField.Email]: this.emailField,
      [ErrorField.FirstName]: this.nameField,
      [ErrorField.Surname]: this.surnameField,
      [ErrorField.Password]: this.passwordField,
      [ErrorField.ConfirmPassword]: this.confirmPasswordField,
    };

    return await fields[field].isInvalid();
  }
}
