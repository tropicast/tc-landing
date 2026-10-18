import { content } from "@/site/content";

/** The page's sections, in order: the header's links and the page follow this list. */
export const sections = [
    { id: "how-it-works", title: content.howItWorks.eyebrow },
    { id: "features", title: content.features.eyebrow },
    { id: "demo", title: content.demo.eyebrow },
    { id: "pricing", title: content.pricing.eyebrow },
    { id: "faq", title: content.faq.eyebrow },
] as const;
