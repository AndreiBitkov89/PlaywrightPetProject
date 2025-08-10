import { expect, Locator, Page } from "@playwright/test";
import { DropdownElements as el } from "../../locatorsStorage/DropdownElements";
import { DropdownItems } from "./constants/DropdownItems";

export class SortingDropdown {
  private page: Page;
  private container: Locator;
  private trigger: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId(el.container);
    this.trigger = page.locator(el.sortBy);
  }

  async open() {
    await expect(
      this.container,
      "Container must not be in DOM before open"
    ).toHaveCount(0);

    await this.trigger.click();

    await expect(
      this.container,
      "Container should appear after opening"
    ).toBeVisible();
  }

  async sortBy(sortingType: DropdownItems) {
    await this.open();

    await this.container
      .getByRole("button", { name: DropdownItems.New, exact: true })
      .click();

    await expect(
      this.container.getByRole("button", {
        name: DropdownItems.New,
        exact: true,
      })
    ).toHaveAttribute("aria-pressed", "true");
  }
}
