import { Locator } from "@playwright/test";

export class InputField {
  constructor(private readonly inputSelector: Locator) {}

  async fill(value: string): Promise<void> {
    await this.inputSelector.fill(value);
  }

  async clear(): Promise<void> {
    await this.inputSelector.clear();
  }

  async isInvalid(): Promise<boolean> {
    const ariaInvalid = await this.inputSelector.getAttribute("aria-invalid");
    if (ariaInvalid === "true") return true;

    const wrapper = this.inputSelector.locator("..");
    const invalidIcon = wrapper.locator(".InputValidState__invalid");
    return await invalidIcon.isVisible();
  }

  async isValid(): Promise<boolean> {
    const ariaInvalid = await this.inputSelector.getAttribute("aria-invalid");
    if (ariaInvalid === "false") return true;

    const wrapper = this.inputSelector.locator("..");
    const validIcon = wrapper.locator(".InputValidState__valid");
    return await validIcon.isVisible();
  }

  async isVisible(): Promise<boolean> {
    return await this.inputSelector.isVisible({ timeout: 5000 });
  }
}
