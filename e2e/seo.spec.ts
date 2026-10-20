import { expect, test } from "@playwright/test";

test("robots.txt allows crawling and names the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toMatch(/Allow: \//);
    expect(text).toContain("Sitemap: https://www.tropicastradio.com/sitemap.xml");
});

test("the sitemap lists both languages with their alternates", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();
    for (const lang of ["fr", "en"]) {
        expect(xml).toContain(`<loc>https://www.tropicastradio.com/${lang}</loc>`);
        expect(xml).toContain(`hreflang="${lang}"`);
    }
});

for (const lang of ["fr", "en"]) {
    test(`/${lang} has the social cards and structured data in its language`, async ({ page }) => {
        await page.goto(`/${lang}`);
        await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`/${lang}/opengraph-image`));
        const json = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
        const types = json["@graph"].map((node: { "@type": string }) => node["@type"]);
        expect(types).toEqual(["Organization", "WebSite", "SoftwareApplication", "FAQPage"]);
        const faq = json["@graph"][3];
        expect(faq.inLanguage).toBe(lang);
        expect(faq.mainEntity).toHaveLength(6);
    });
}
