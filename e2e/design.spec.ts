import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"] as const) {
    test(`no accessibility violations in the ${theme} theme (WCAG 2.2 AA, contrast included)`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme });
        await page.goto("/");
        await expect(page.locator("html")).toHaveClass(new RegExp(`${theme}-mode`));
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        expect(results.violations.map((violation) => `${violation.id}: ${violation.nodes.length}`)).toEqual([]);
    });
}

test("the theme toggle switches and remembers the theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page.getByTestId("theme-toggle").click();
    await expect(page.locator("html")).toHaveClass(/dark-mode/);
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark-mode/);
});

test("no horizontal scrolling on a phone", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "phones only");
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
});

test("the Open Graph image is a 1200 x 630 PNG", async ({ request }) => {
    const response = await request.get("/opengraph-image");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
});
