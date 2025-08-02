import { test, expect } from "@playwright/test";

import { AppContext } from "./AppContext";

export class ItemPageSteps {
  constructor(private ctx: AppContext) {}

  async openPage(anchor: string): Promise<this> {
    await test.step("Open item page", async () => {
      await this.ctx.pageWithItems.goto(anchor);
    });
    return this;
  }

  async checkPageIsLoaded(title: string) {
    await test.step("Check that page contains correct title and elements", async () => {
      await this.ctx.pageWithItems.isLoaded(title);
    });
  }
}
