import { Button } from "@/components/base/buttons/button";
import type { Content } from "@/site/i18n";
import { SIGN_UP_URL, demoEmbedUrl } from "@/site/links";
import { DemoPlayer } from "@/site/sections/demo-player";
import { Section } from "@/site/sections/section";

/** Read at build time: the page is static. */
export function Demo({ t, station = process.env.DEMO_STATION }: { t: Content; station?: string }) {
    const { demo, hero } = t;
    const embedUrl = demoEmbedUrl(station);
    return (
        <Section id="demo" eyebrow={demo.eyebrow} title={demo.title} intro={embedUrl ? demo.intro : undefined} muted>
            {embedUrl ? (
                <DemoPlayer embedUrl={embedUrl} title={demo.title} play={demo.play} loadNote={demo.loadNote} />
            ) : (
                <div className="flex flex-col items-start gap-4">
                    <p className="max-w-xl text-lg text-tertiary">{demo.unavailable}</p>
                    <Button size="xl" href={SIGN_UP_URL}>
                        {hero.primary}
                    </Button>
                </div>
            )}
        </Section>
    );
}
