import { Page } from "@playwright/test";

export class InputField {
  constructor(
    private readonly page: Page,
    private readonly inputSelector: string
  ) {}

  async fill(value: string): Promise<void> {
    await this.page.fill(this.inputSelector, value);
  }

  async clear(): Promise<void> {
    await this.page.fill(this.inputSelector, "");
  }

  async isInvalid(): Promise<boolean> {
    const input = this.page.locator(this.inputSelector);
    const ariaInvalid = await input.getAttribute("aria-invalid");
    if (ariaInvalid === "true") return true;

    const wrapper = input.locator("..");
    const invalidIcon = wrapper.locator(".InputValidState__invalid");
    return await invalidIcon.isVisible();
  }

  async isValid(): Promise<boolean> {
    const input = this.page.locator(this.inputSelector);
    const ariaInvalid = await input.getAttribute("aria-invalid");
    if (ariaInvalid === "false") return true;

    const wrapper = input.locator("..");
    const validIcon = wrapper.locator(".InputValidState__valid");
    return await validIcon.isVisible();
  }

  async isVisible(): Promise<boolean> {
    return this.page.locator(this.inputSelector).isVisible({ timeout: 3000 });
  }
}
