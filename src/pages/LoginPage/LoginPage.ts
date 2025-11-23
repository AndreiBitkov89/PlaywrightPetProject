import {Locator, Page} from "@playwright/test";
import {LoginPageLocators} from "./LoginPage.locators";
import {BasePage} from "../BasePage";
import {InputField} from "../../elementsObjects/InputField";
import {urls} from "../../constants/urlStorage";

export class LoginPage extends BasePage {
    private loginField: InputField;
    private passwordField: InputField;
    readonly el: LoginPageLocators;

    constructor(page: Page) {
        super(page);
        this.el = new LoginPageLocators(page);
        this.loginField = new InputField(this.el.login);
        this.passwordField = new InputField(this.el.password);
    }

    async goto(): Promise<void> {
        await this.page.goto(urls.login);
    }

    async isLoaded(): Promise<boolean> {
        await this.closePopupsIfExists();
        return (
            (await this.loginField.isVisible()) &&
            (await this.passwordField.isVisible())
        );
    }

    get getSubmitButton() {
        return this.el.submitLogin;
    }

    async fillLogin(email: string | null): Promise<void> {
        if (typeof email === "string") {
            await this.loginField.fill(email);
        }
    }

    async fillPassword(password: string | null): Promise<void> {
        if (typeof password === "string") {
            await this.passwordField.fill(password);
        }
    }

    async isLoginSuccessful(): Promise<boolean> {
        try {
            await this.el.login.waitFor({state: "hidden", timeout: 5000});
            return true;
        } catch {
            return false;
        }
    }

    get getForgotPassLink() {
        return this.el.forgotPassLink;
    }

    get getCreateAccountLink() {
        return this.el.createAccountLink;
    }

    get getErrorLogin(): Locator {
        return this.el.errorLogin;
    }

    get getErrorPassword(): Locator {
        return this.el.errorPassword;
    }

    get getErrorGeneralMessage(): Locator {
        return this.el.errorGeneralMessage;
    }
}
