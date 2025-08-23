import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class ItemPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
