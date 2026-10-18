import type { Content } from "@/site/i18n";

/** The page's sections, in order: the header's links and the page follow this list. */
export const sectionsOf = (t: Content) => [
    { id: "how-it-works", title: t.howItWorks.eyebrow },
    { id: "features", title: t.features.eyebrow },
    { id: "demo", title: t.demo.eyebrow },
    { id: "pricing", title: t.pricing.eyebrow },
    { id: "faq", title: t.faq.eyebrow },
];
