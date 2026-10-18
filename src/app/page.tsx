import { Button } from "@/components/base/buttons/button";
import { SiteFooter } from "@/site/layout/site-footer";
import { SiteHeader } from "@/site/layout/site-header";
import { SIGN_UP_URL } from "@/site/links";
import { Placeholder, Section } from "@/site/sections/section";

/**
 * The page's structure (#3): every section in its place and proportions, with placeholders where the content
 * comes in #5. Mobile first: one column below `md`.
 */
export default function Home() {
    return (
        <>
            <SiteHeader />
            <main id="top">
                <section aria-labelledby="hero-title" className="bg-primary py-16 md:py-24">
                    <div className="mx-auto grid max-w-container items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
                        <div>
                            <h1 id="hero-title" className="text-display-md font-semibold text-primary md:text-display-xl">
                                Your radio on air in minutes
                            </h1>
                            <p className="mt-4 max-w-xl text-lg text-tertiary md:text-xl">
                                Go live from your computer, keep playing with AutoDJ when you are away, and reach listeners on any device.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Button size="xl" href={SIGN_UP_URL}>
                                    Create a free station
                                </Button>
                                <Button size="xl" color="secondary" href="#how-it-works">
                                    See how it works
                                </Button>
                            </div>
                        </div>
                        <Placeholder label="App and dashboard screenshot" className="aspect-[4/3]" />
                    </div>
                </section>

                <Section id="how-it-works" eyebrow="How it works" title="Three steps to go live" muted>
                    <ol className="grid gap-6 md:grid-cols-3">
                        {["Download Tropicast Station", "Sign in", "Go live"].map((step, index) => (
                            <li key={step}>
                                <Placeholder label={`${index + 1}. ${step}`} className="h-40" />
                            </li>
                        ))}
                    </ol>
                </Section>

                <Section id="features" eyebrow="Features" title="Everything a radio needs">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }, (_, index) => (
                            <Placeholder key={index} label="Feature" className="h-36" />
                        ))}
                    </div>
                </Section>

                <Section id="demo" eyebrow="Listen" title="Hear a station live" muted>
                    <Placeholder label="Player of the demo station" className="h-32" />
                </Section>

                <Section id="pricing" eyebrow="Pricing" title="Start free, grow when your audience does">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {["Free", "Starter", "Growth", "Pro"].map((plan) => (
                            <Placeholder key={plan} label={plan} className="h-96" />
                        ))}
                    </div>
                </Section>

                <Section id="faq" eyebrow="FAQ" title="Questions" muted>
                    <Placeholder label="Questions and answers" className="h-64" />
                </Section>
            </main>
            <SiteFooter />
        </>
    );
}
