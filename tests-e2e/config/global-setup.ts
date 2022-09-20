import { chromium, FullConfig } from "@playwright/test"
import { SignInPage } from "../helpers/SignIn"
import env from "./env"
import { UIRoutes, createFullUrl } from "../routes"

async function globalSetup(config: FullConfig) {
  const storageState = config.projects[0].use.storageState
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  const signInPage = new SignInPage(page)

  await page.goto(createFullUrl(UIRoutes.signIn()))
  await signInPage.usernameInput.fill(env.username)
  await signInPage.passwordInput.fill(env.username)
  await signInPage.signInButton.click()

  await page.waitForResponse((response) => response.status() === 200)
  await page.waitForLoadState(`networkidle`)
  await page.context().storageState({ path: storageState as string })
  await browser.close()
}

export default globalSetup
