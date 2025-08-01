import {expect, test} from "@playwright/test";

test("username appears", async ({page}) => {
    await page.goto("/")
    await expect(page.getByText("Username")).toBeVisible()
})

test("submit button appears", async ({page}) => {
    await page.goto("/")
    await expect(page.getByRole("button", {name: "Submit"})).toBeVisible()
})

test("add user", async ({page}) => {
    await page.goto("/auth/register")
    await page.locator("input[type=email]").fill("test1@test.com")
    await page.locator("input[type=password]").fill("password")
    await page.getByRole("button", {name: "Register"}).click()
    expect(page.url()).toContain('/auth/login')
})

test("login form appears", async ({page}) => {
    await page.goto("/auth/login")
    await page.locator("input[type=email]").fill("test@test.com")
    await page.locator("input[type=password]").fill("password")
    await page.getByRole("button", {name: "Login"}).click()
    await expect(page.getByText(/Hello/)).toBeVisible()
})

test("failed to fetch", async ({page}) => {
    await page.goto('/notes')
    await page.locator("input[type=text]").fill("note1")
    await page.getByRole("button", {name: "Add note"}).click()
    await expect(page.getByText("Failed to add note.")).toBeVisible()
})