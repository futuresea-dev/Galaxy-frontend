import { Page, Locator } from "@playwright/test"
import { BaseHelper } from "./BaseHelper"

export class SignInPage extends BaseHelper {
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly signInButton: Locator
  readonly signingAlert: Locator

  constructor(page: Page) {
    super(page)
    const signInForm = "form#sign-in-form"

    this.usernameInput = page.locator(`${signInForm} input[type=text]`)
    this.passwordInput = page.locator(`${signInForm} input[type=password]`)
    this.signInButton = page.locator(`[data-test=sign-in]`)
    this.signingAlert = page.locator(`${signInForm} .v-alert`)
  }
}
