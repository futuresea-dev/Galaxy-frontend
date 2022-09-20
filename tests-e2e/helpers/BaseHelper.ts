import { Page } from "@playwright/test"

export class BaseHelper {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }
}
