import { test, expect } from "@playwright/test"
import { SignInPage } from "./helpers/SignIn"
import { Navigation } from "./helpers/Navigation"
import { TopBar } from "./helpers/TopBar"
import { env } from "./config/env"
import { createFullUrl, UIRoutes } from "./routes"

test.describe.parallel("Login test", () => {
  test("Login test with right credentials", async ({ page }) => {
    const signInPage = new SignInPage(page)
    const topBar = new TopBar(page)

    await page.goto(UIRoutes.signIn())
    await signInPage.usernameInput.fill(env.username)
    await signInPage.passwordInput.fill(env.password)
    await signInPage.signInButton.click()
    await expect(signInPage.signInButton).toBeDisabled()
    await page.waitForResponse((response) => response.status() === 200)
    await page.waitForURL(createFullUrl())
    expect(page.url()).toEqual(createFullUrl())
    await expect(topBar.title && topBar.avatar && topBar.userName).toBeVisible()
  })

  test("Login test with wrong credentials", async ({ page }) => {
    const signInPage = new SignInPage(page)

    await page.goto(UIRoutes.signIn())
    await signInPage.usernameInput.fill(env.username)
    await signInPage.passwordInput.fill(env.password)
    await signInPage.signInButton.click()
    await expect(signInPage.signInButton).toBeDisabled()
    await page.waitForURL(UIRoutes.signIn())
    expect(signInPage.signingAlert).not.toBeNull()
  })

  test("Logout test", async ({ page }) => {
    const signInPage = new SignInPage(page)
    const navigation = new Navigation(page)
    const topBar = new TopBar(page)

    await page.goto(createFullUrl())
    expect(page.url()).toEqual(createFullUrl())
    await expect(topBar.title && topBar.avatar && topBar.userName).toBeVisible()
    await navigation.logOutButton.click()
    await page.waitForURL(UIRoutes.signIn())
    expect(signInPage.usernameInput).toBeDefined()
  })

  test("No token available", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await context.clearCookies()
    await page.goto(createFullUrl())
    await page.waitForURL(UIRoutes.signIn())
    expect(page.url()).toContain(UIRoutes.signIn())
  })
})
