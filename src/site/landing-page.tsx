import type { Content } from "@/site/i18n";
import { SiteFooter } from "@/site/layout/site-footer";
import { SiteHeader } from "@/site/layout/site-header";
import { Demo } from "@/site/sections/demo";
import { Faq } from "@/site/sections/faq";
import { Features } from "@/site/sections/features";
import { Hero } from "@/site/sections/hero";
import { HowItWorks } from "@/site/sections/how-it-works";
import { Pricing } from "@/site/sections/pricing";

/** The whole page in one language, in the order of `sections.ts`. Mobile first: one column below `md`. */
export function LandingPage({ t }: { t: Content }) {
    return (
        <>
            <SiteHeader t={t} />
            <main id="top">
                <Hero t={t} />
                <HowItWorks t={t} />
                <Features t={t} />
                <Demo t={t} />
                <Pricing t={t} />
                <Faq t={t} />
            </main>
            <SiteFooter t={t} />
        </>
    );
}
