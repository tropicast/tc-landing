import type { Content } from "@/site/i18n";
import { APP_URL, SITE_URL } from "@/site/links";

/**
 * schema.org data for search engines (#7): the organization, the site, the desktop app (free, with paid plans), and
 * the FAQ, in the page's language. Only facts the page itself states.
 */
export function structuredData(t: Content, beta = false) {
    const page = `${SITE_URL}/${t.lang}`;
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "Tropicast",
                url: SITE_URL,
                logo: `${SITE_URL}/tropicast-logo.svg`,
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: "Tropicast",
                inLanguage: ["fr", "en"],
                publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
                "@type": "SoftwareApplication",
                name: "Tropicast Station",
                applicationCategory: "MultimediaApplication",
                operatingSystem: "Windows, macOS, Linux",
                description: t.howItWorks.steps[1].text,
                downloadUrl: `${APP_URL}/download/station/win-x64`,
                publisher: { "@id": `${SITE_URL}/#organization` },
                // In beta only Free can be had (#26): no offer for what can't be bought.
                offers: t.pricing.plans
                    .filter((plan) => !beta || plan.id === "free")
                    .map((plan) => ({
                        "@type": "Offer",
                        name: plan.name,
                        price: plan.price.replace(/[^\d.,]/g, "").replace(",", "."),
                        priceCurrency: "EUR",
                        url: `${page}#pricing`,
                    })),
            },
            {
                "@type": "FAQPage",
                "@id": `${page}#faq`,
                inLanguage: t.lang,
                mainEntity: t.faq.items.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
            },
        ],
    };
}

/** As Next's JSON-LD guide: `<` escaped so the text can never close the script element. */
export function StructuredData({ t, beta = false }: { t: Content; beta?: boolean }) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(t, beta)).replace(/</g, "\\u003c") }} />;
}
