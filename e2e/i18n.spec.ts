import { expect, test } from "@playwright/test";

// The browser sends Accept-Language from the context's locale.
for (const [locale, lang] of [
    ["fr-MG", "fr"],
    ["en-US", "en"],
    ["de-DE", "fr"],
] as const) {
    test(`/ goes to /${lang} for a browser in ${locale}`, async ({ browser }) => {
        const context = await browser.newContext({ locale });
        const page = await context.newPage();
        await page.goto("/");
        await expect(page).toHaveURL(new RegExp(`/${lang}$`));
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        await context.close();
    });
}

test("the redirect says it depends on Accept-Language", async ({ request }) => {
    const response = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "en" } });
    expect(response.status()).toBe(307);
    expect(response.headers()["location"]).toMatch(/\/en$/);
    expect(response.headers()["vary"]).toMatch(/accept-language/i);
});

test("both pages declare each other and x-default", async ({ page }) => {
    for (const lang of ["fr", "en"]) {
        await page.goto(`/${lang}`);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.tropicastradio.com/${lang}`);
        await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute("href", "https://www.tropicastradio.com/fr");
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://www.tropicastradio.com/en");
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", "https://www.tropicastradio.com");
    }
});

test("the language switch goes to the other language", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("contentinfo").getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your radio on air in minutes");
});

test("a 404 speaks the language of its URL", async ({ page }) => {
    let response = await page.goto("/fr/nope");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page introuvable");
    response = await page.goto("/en/nope");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("We can’t find that page");
});

test("a path without a language goes under one, where an unknown page is a 404", async ({ browser }) => {
    const context = await browser.newContext({ locale: "fr-FR" });
    const page = await context.newPage();
    const response = await page.goto("/de");
    await expect(page).toHaveURL(/\/fr\/de$/);
    expect(response?.status()).toBe(404);
    await context.close();
});
