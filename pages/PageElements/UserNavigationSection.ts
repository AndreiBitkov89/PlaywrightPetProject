import { Page } from "@playwright/test";
import { UserNavigationSectionElements as el } from "../../locatorsStorage/UserNavigationSectionElements";

export class UserNavigationSection {
  constructor(private page: Page) {}

  public async isAccountAvailable(): Promise<boolean> {
    return await this.page.locator(el.accountLink).isVisible();
  }
  public async isSignInAvailable(): Promise<boolean> {
    return await this.page.locator(el.signInLink).isVisible();
  }
}
