import { test, expect } from "@playwright/test"
import { env } from "./config/env"

test.describe.parallel("Meta tags test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.baseUrl)
  })

  test("Meta tags", async ({ page }) => {
    await expect(page).toHaveTitle("SMS Galaxy - Přehled novinek")

    const metaIcon = page.locator('link[rel="icon"]')
    await expect(metaIcon).toHaveAttribute("type", "image/svg+xml")
    await expect(metaIcon).toHaveAttribute("href", "/favicon.svg")

    const metaViewport = page.locator('meta[name="viewport"]')
    await expect(metaViewport).toHaveAttribute("content", "width=device-width, initial-scale=1.0")

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute("content", "SMS Galaxy | Finančně poradenská aplikace")

    const metaKeywords = page.locator('meta[name="keywords"]')
    await expect(metaKeywords).toHaveAttribute(
      "content",
      "kalkulačky, záznamy z jednání, compliance, finanční poradenství, finanční poradci",
    )
  })

  test("Social media meta tags", async ({ page }) => {
    const metaOgTitle = page.locator('meta[property="og:title"]')
    await expect(metaOgTitle).toHaveAttribute("content", "SMS Galaxy | Finančně poradenská aplikace")

    const metaOgDescription = page.locator('meta[property="og:description"]')
    await expect(metaOgDescription).toHaveAttribute("content", "SMS Galaxy | Finančně poradenská aplikace")

    const metaOgImage = page.locator('meta[property="og:image"]')
    await expect(metaOgImage).toHaveAttribute("content", "https://smsfinance.netlify.app/meta-img.jpg")

    const metaOgType = page.locator('meta[property="og:type"]')
    await expect(metaOgType).toHaveAttribute("content", "website")
  })
})
