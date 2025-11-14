import { expect, Locator, Page } from "@playwright/test";
import { DropdownItems } from "../../constants/common.const";

export class SortingDropdown {
  private container: Locator;
  private trigger: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.container = this.page.getByTestId("dropdown-container");
    this.trigger = this.page.locator("button[aria-label='Sort By']");
  }

  async open() {
    await expect(
      this.container,
      "Container must not be in DOM before open",
    ).toHaveCount(0);

    await this.trigger.click();

    await expect(
      this.container,
      "Container should appear after opening",
    ).toBeVisible();
  }

  async sortBy(sortingType: DropdownItems) {
    await this.open();

    await this.container
      .getByRole("button", { name: sortingType, exact: true })
      .click();

    await expect(
      this.container.getByRole("button", {
        name: sortingType,
        exact: true,
      }),
    ).toHaveAttribute("aria-pressed", "true");
  }
}
