import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";
import{ ForgotPasswordElements as el} from "../locatorsStorage/ForgotPasswordElements"

export class ForgotPasswordPage extends BasePage{
    
    constructor(page: Page){
        super(page)
    }

    async isLoaded(): Promise<boolean> {
        return await this.page.locator(el.cancelButton).isVisible({timeout: 2000}) && await this.page.locator(el.sendEmailButton).isVisible({timeout: 2000})
    }


}