import { Page, expect } from "@playwright/test";
import { RegistrationElements as el } from "../locatorsStorage/RegistrationElements";
import { User } from "../valueObjects/User";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto("/de/en/account/create");
  }

  async fillName(name: string): Promise<void> {
    await this.page.fill(el.name, name);
  }

  async fillSurname(surname: string): Promise<void> {
    await this.page.fill(el.surname, surname);
  }

  async fillEmail(email: string): Promise<void> {
    await this.page.click(el.email);
    await this.page.fill(el.email, email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.fill(el.password, password);
  }

  async fillPasswordForConfirm(password: string): Promise<void> {
    await this.page.fill(el.confirmPassword, password);
  }

  async fillAllRequiredFields(user: User): Promise<RegistrationPage> {
    await this.fillName(user.firstName);
    await this.fillSurname(user.lastName);
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this.fillPasswordForConfirm(user.password);

    return this;
  }

  async checkTheTerms(): Promise<RegistrationPage> {
    await this.page.locator(el.terms).check();
    return this;
  }

  async chooseStore(store: string): Promise<RegistrationPage> {
    await this.page.locator(el.checkBoxStore + `${store}` + "']").check();
    return this;
  }

  async submit(): Promise<RegistrationPage> {
    await this.page.click(el.submitButton);
    return this;
  }

  async isSubmitButtonDisabled(): Promise<boolean> {
    return await this.page.locator(el.submitButton).isDisabled();
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    await this.page
      .locator(el.name)
      .waitFor({ state: "hidden", timeout: 5000 });
    return await this.page.locator(el.name).isHidden();
  }

}
