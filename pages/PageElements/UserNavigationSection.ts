import { Page } from "@playwright/test";
import { UserNavigationSectionElements as el } from "../../locatorsStorage/UserNavigationSectionElements";

export class UserNavigationSection {
  constructor(private page: Page) {}

  public isAccountAvailable(): Promise<boolean> {
    return this.page.locator(el.accountLink).isVisible();
  }
  public isSignInAvailable(): Promise<boolean> {
    return this.page.locator(el.signInLink).isVisible();
  }
}
