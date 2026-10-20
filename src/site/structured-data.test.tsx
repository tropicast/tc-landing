import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getContent } from "@/site/i18n";
import { StructuredData, structuredData } from "@/site/structured-data";

describe("structured data", () => {
    it("lists every plan as an offer in euros, with its numeric price", () => {
        const app = structuredData(getContent("fr"))["@graph"][2] as { offers: { name: string; price: string; priceCurrency: string }[] };
        expect(app.offers.map((offer) => [offer.name, offer.price, offer.priceCurrency])).toEqual([
            ["Free", "0", "EUR"],
            ["Starter", "19", "EUR"],
            ["Growth", "55", "EUR"],
            ["Pro", "120", "EUR"],
        ]);
    });

    it("offers only Free during the beta", () => {
        const app = structuredData(getContent("en"), true)["@graph"][2] as { offers: { name: string }[] };
        expect(app.offers.map((offer) => offer.name)).toEqual(["Free"]);
    });

    it("cannot be closed early by text in the content", () => {
        const t = getContent("en");
        const hostile = { ...t, faq: { ...t.faq, items: [{ question: "</script><script>alert(1)</script>", answer: "x" }] } };
        const { container } = render(<StructuredData t={hostile} />);
        const script = container.querySelector('script[type="application/ld+json"]')!;
        expect(script.innerHTML).not.toContain("</script>");
        expect(JSON.parse(script.innerHTML)["@graph"][3].mainEntity[0].name).toBe("</script><script>alert(1)</script>");
    });
});
