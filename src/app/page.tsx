import { SiteFooter } from "@/site/layout/site-footer";
import { SiteHeader } from "@/site/layout/site-header";
import { Demo } from "@/site/sections/demo";
import { Faq } from "@/site/sections/faq";
import { Features } from "@/site/sections/features";
import { Hero } from "@/site/sections/hero";
import { HowItWorks } from "@/site/sections/how-it-works";
import { Pricing } from "@/site/sections/pricing";

/** One page, in the order of `sections.ts`. Mobile first: one column below `md`. */
export default function Home() {
    return (
        <>
            <SiteHeader />
            <main id="top">
                <Hero />
                <HowItWorks />
                <Features />
                <Demo />
                <Pricing />
                <Faq />
            </main>
            <SiteFooter />
        </>
    );
}
