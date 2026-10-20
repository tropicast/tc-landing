import { expect, test } from "@playwright/test";

test("the home page loads and links to the sign-up", async ({ page }) => {
    const response = await page.goto("/en");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Create a free station" }).first()).toHaveAttribute("href", "https://app.tropicastradio.com/signup");
});

test("on a phone, the menu lists the sections and a link closes it", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "phones only");
    await page.goto("/en");
    await page.getByRole("button", { name: "Menu" }).click();
    const menu = page.getByRole("navigation", { name: "Sections" }).last();
    await menu.getByRole("link", { name: "Pricing" }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.getByRole("heading", { name: "Start free, grow when your audience does" })).toBeInViewport();
});

test("an FAQ answer opens with the keyboard", async ({ page }) => {
    await page.goto("/en");
    const question = page.getByText("What do I need to broadcast?");
    await question.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText(/A computer with Windows, macOS or Linux/)).toBeVisible();
});

test("an unknown page answers 404", async ({ page }) => {
    const response = await page.goto("/en/no-such-page");
    expect(response?.status()).toBe(404);
});
