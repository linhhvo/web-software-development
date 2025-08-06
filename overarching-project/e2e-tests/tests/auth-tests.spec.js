import {expect, test} from "@playwright/test";
import fs from "fs";

const randomUserEmail = `test-user-${Math.floor(10000 + Math.random() * 90000)}@test.com`

test("register an user", async ({page}) => {
    await page.goto("/auth/register")
    await page.locator("input[type=email]").fill(randomUserEmail)
    await page.locator("input[type=password]").fill("password")
    await page.getByRole("button", {name: "Register"}).click()
    expect(page.url()).toContain('/auth/login')
})

test("log in as an user", async ({page}) => {
    await page.goto("/auth/login")
    await page.locator("input[type=email]").fill(randomUserEmail)
    await page.locator("input[type=password]").fill("password")
    await page.getByRole("button", {name: "Login"}).click()

    await page.context().storageState({path: "./state.json"})
    // Verify file was created
    const fileExists = fs.existsSync("./state.json");
    console.log('State file created successfully:', fileExists);

    if (fileExists) {
        const stateContent = fs.readFileSync("./state.json", 'utf8');
        console.log('State file content:', stateContent);
    }

    await expect(page.getByText(randomUserEmail)).toBeVisible()
})