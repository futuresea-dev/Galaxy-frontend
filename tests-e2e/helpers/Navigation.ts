import { Page, Locator } from "@playwright/test"
import { BaseHelper } from "./BaseHelper"

export class Navigation extends BaseHelper {
  readonly logOutButton: Locator

  constructor(page: Page) {
    super(page)
    this.logOutButton = page.locator(`[data-icon=lock]`)
  }
}
