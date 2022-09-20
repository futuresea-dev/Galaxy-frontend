import { Page, Locator } from "@playwright/test"
import { BaseHelper } from "./BaseHelper"

export class TopBar extends BaseHelper {
  readonly title: Locator
  readonly avatar: Locator
  readonly userName: Locator

  constructor(page: Page) {
    super(page)
    const topbar = "header#topbar"

    this.title = page.locator(`${topbar} .v-toolbar-title__placeholder`)
    this.avatar = page.locator(`${topbar} .v-avatar`)
    this.userName = page.locator(`${topbar} .v-toolbar__append`)
  }
}
