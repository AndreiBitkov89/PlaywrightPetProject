import { Page } from "@playwright/test";

export class UserNavigationSection {
  constructor(private page: Page) {}

  public async isAccountAvailable(): Promise<boolean> {
    return await this.page.getByTestId("account-menu-button").isVisible();
  }
  public async isSignInAvailable(): Promise<boolean> {
    return await this.page.getByTestId("account-sign-in-link").isVisible();
  }

  public async goToFavorites(): Promise<this> {
    await this.page.locator("a[name='Favorites']").click();
    return this;
  }
}
