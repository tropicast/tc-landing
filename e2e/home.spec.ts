import { expect, test } from "@playwright/test";

test("the home page loads and links to the sign-up", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tropicast");
    await expect(page.getByRole("link", { name: "Create a free station" })).toHaveAttribute("href", "https://app.tropicastradio.com");
});

test("an unknown page answers 404", async ({ page }) => {
    const response = await page.goto("/no-such-page");
    expect(response?.status()).toBe(404);
});
