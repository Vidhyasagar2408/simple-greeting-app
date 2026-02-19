import { test, expect } from '@playwright/test'

test.describe('Greeting App', () => {
  test('displays "Enter Your Name" label on load', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Enter Your Name')).toBeVisible()
  })

  test('renders text input with placeholder "Type your name here"', async ({ page }) => {
    await page.goto('/')
    const input = page.getByPlaceholder('Type your name here')
    await expect(input).toBeVisible()
  })

  test('renders a "Greet" button', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: /greet/i })).toBeVisible()
  })

  test('displays "Hello [name]" when name is entered and Greet is clicked', async ({ page }) => {
    await page.goto('/')
    const input = page.getByPlaceholder('Type your name here')
    const button = page.getByRole('button', { name: /greet/i })

    await input.fill('Alice')
    await button.click()

    await expect(page.getByText('Hello Alice')).toBeVisible()
  })

  test('displays "Hello" when no name is entered and Greet is clicked', async ({ page }) => {
    await page.goto('/')
    const button = page.getByRole('button', { name: /greet/i })
    await button.click()

    await expect(page.getByText('Hello')).toBeVisible()
  })

  test('greeting appears below the button', async ({ page }) => {
    await page.goto('/')
    const input = page.getByPlaceholder('Type your name here')
    const button = page.getByRole('button', { name: /greet/i })

    await input.fill('World')
    await button.click()

    const greeting = page.getByRole('status')
    await expect(greeting).toHaveText('Hello World')
    await expect(greeting).toBeVisible()
  })

  test('triggers one of three animations when Greet is clicked', async ({ page }) => {
    await page.goto('/')
    const button = page.getByRole('button', { name: /greet/i })

    await button.click()

    const hasConfetti = await page.locator('.confetti-container').count() > 0
    const hasPartyPopper = await page.locator('.party-popper-container').count() > 0
    const hasGlowingBurst = await page.locator('.glowing-burst-container').count() > 0

    expect(hasConfetti || hasPartyPopper || hasGlowingBurst).toBeTruthy()
  })

  test('only one animation container is visible at a time on multiple clicks', async ({ page }) => {
    await page.goto('/')
    const button = page.getByRole('button', { name: /greet/i })

    await button.click()
    await page.waitForTimeout(100)
    await button.click()
    await page.waitForTimeout(100)

    const confetti = await page.locator('.confetti-container').count()
    const partyPopper = await page.locator('.party-popper-container').count()
    const glowingBurst = await page.locator('.glowing-burst-container').count()

    const total = confetti + partyPopper + glowingBurst
    expect(total).toBe(1)
  })

  test('responds to Enter key in input', async ({ page }) => {
    await page.goto('/')
    const input = page.getByPlaceholder('Type your name here')

    await input.fill('Test')
    await input.press('Enter')

    await expect(page.getByText('Hello Test')).toBeVisible()
  })
})
