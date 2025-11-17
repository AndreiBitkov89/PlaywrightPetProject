import {Page} from "@playwright/test";
import {RegistrationLocators} from "./Registration.locators";
import {BasePage} from "../BasePage";
import {ErrorFieldRegistration} from "../../constants/common.const";
import {InputField} from "../../elementsObjects/InputField";
import {urls} from "../../constants/urlStorage";

export class RegistrationPage extends BasePage {
    readonly el: RegistrationLocators;
    private readonly nameField: InputField;
    private readonly surnameField: InputField;
    private readonly emailField: InputField;
    private readonly passwordField: InputField;
    private readonly confirmPasswordField: InputField;

    constructor(page: Page) {
        super(page);
        this.el = new RegistrationLocators(page);
        this.nameField = new InputField(this.el.name);
        this.surnameField = new InputField(this.el.surname);
        this.emailField = new InputField(this.el.email);
        this.passwordField = new InputField(this.el.password);
        this.confirmPasswordField = new InputField(this.el.confirmPassword);
    }

    async goto(): Promise<void> {
        await this.page.goto(urls.registration);
    }

    async isLoaded(): Promise<boolean> {
        return (
            (await this.nameField.isVisible()) &&
            (await this.el.submitButton.isVisible({timeout: 5000}))
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


    async checkTheTerms(): Promise<RegistrationPage> {
        await this.el.terms.check();
        return this;
    }

    async chooseStore(store: string): Promise<RegistrationPage> {
        await this.page.locator(`${this.el.checkBoxStore}${store}']`).check();
        return this;
    }

    async submit(): Promise<RegistrationPage> {
        await this.el.submitButton.click();
        return this;
    }

    async isSubmitButtonDisabled(): Promise<boolean> {
        return this.el.submitButton.isDisabled();
    }

    async isRegistrationSuccessful(): Promise<boolean> {
        try {
            await this.el.name.waitFor({state: "hidden", timeout: 5000});
            return true;
        } catch {
            return false;
        }
    }

    get getErrorEmail() {
        return this.el.errorEmail
    }

    get getErrorPassword() {
        return this.el.errorPassword
    }

    get getErrorSurname() {
        return this.el.errorSurname
    }

    get getErrorName() {
        return this.el.errorName
    }

    get getErrorConfirmPassword() {
        return this.el.errorConfirmPassword
    }

    async isValidationFailed(field: ErrorFieldRegistration): Promise<boolean> {
        const fields: Record<ErrorFieldRegistration, InputField> = {
            [ErrorFieldRegistration.Email]: this.emailField,
            [ErrorFieldRegistration.FirstName]: this.nameField,
            [ErrorFieldRegistration.Surname]: this.surnameField,
            [ErrorFieldRegistration.Password]: this.passwordField,
            [ErrorFieldRegistration.ConfirmPassword]: this.confirmPasswordField,
        };

        return await fields[field].isInvalid();
    }
}
