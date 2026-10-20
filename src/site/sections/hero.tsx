import { Headphones01, PlayCircle } from "@untitledui/icons";
import type { Content } from "@/site/i18n";
import { SIGN_UP_URL } from "@/site/links";
import { LinkButton } from "@/site/ui/link-button";
import { Pill } from "@/site/ui/pill";

/** Headline, the two calls to action, and a picture of what a listener sees. */
export function Hero({ t }: { t: Content }) {
    const { hero } = t;
    return (
        <section aria-labelledby="hero-title" className="overflow-hidden bg-primary py-16 md:py-24">
            <div className="mx-auto grid max-w-container items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                <div>
                    <Pill color="brand">{hero.badge}</Pill>
                    <h1 id="hero-title" className="mt-4 text-display-md font-semibold text-primary md:text-display-xl">
                        {hero.title}
                    </h1>
                    <p className="mt-4 max-w-xl text-lg text-tertiary md:mt-6 md:text-xl">{hero.lead}</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <LinkButton size="xl" href={SIGN_UP_URL}>
                            {hero.primary}
                        </LinkButton>
                        <LinkButton size="xl" color="secondary" href="#download">
                            {hero.secondary}
                        </LinkButton>
                    </div>
                    <p className="mt-4 text-sm text-tertiary">{hero.note}</p>
                </div>
                <StationCard t={t} />
            </div>
        </section>
    );
}

/** An illustration of a station on air, drawn with the design system (no screenshot to keep up to date). */
function StationCard({ t }: { t: Content }) {
    const { card } = t.hero;
    return (
        <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-8 -z-0 rounded-[40px] bg-brand-secondary opacity-60 blur-2xl" />
            <div className="relative rounded-2xl bg-primary p-6 shadow-xl ring-1 ring-secondary md:p-8">
                <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/tropicast-logo.svg" alt="" width={56} height={56} className="size-14 rounded-xl" />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-lg font-semibold text-primary">{card.station}</p>
                        <p className="text-sm text-tertiary">{card.show}</p>
                    </div>
                    <Pill color="error" dot>
                        {card.live}
                    </Pill>
                </div>
                <div className="mt-8 flex h-16 items-end gap-1" role="presentation">
                    {[40, 65, 30, 80, 55, 90, 45, 70, 35, 85, 60, 50, 75, 40, 95, 55, 65, 30, 80, 45, 70, 50, 60, 35].map((height, index) => (
                        <span
                            key={index}
                            className="flex-1 rounded-full bg-brand-solid"
                            style={{ height: `${height}%`, opacity: 0.35 + (height / 100) * 0.65 }}
                        />
                    ))}
                </div>
                <div className="mt-8 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm text-tertiary">
                        <Headphones01 className="size-5 text-fg-quaternary" />
                        <span>
                            <span className="font-semibold text-secondary">{(1284).toLocaleString(t.numberLocale)}</span> {card.listeners}
                        </span>
                    </span>
                    <span className="text-sm text-tertiary">{card.format}</span>
                    <PlayCircle className="size-12 text-fg-brand-primary" />
                </div>
            </div>
        </div>
    );
}
