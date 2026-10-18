import { Button } from "@/components/base/buttons/button";
import { content } from "@/site/content";
import { SIGN_UP_URL, demoEmbedUrl } from "@/site/links";
import { DemoPlayer } from "@/site/sections/demo-player";
import { Section } from "@/site/sections/section";

const { demo, hero } = content;

/** Read at build time: the page is static. */
export function Demo({ station = process.env.DEMO_STATION }: { station?: string }) {
    const embedUrl = demoEmbedUrl(station);
    return (
        <Section id="demo" eyebrow={demo.eyebrow} title={demo.title} intro={embedUrl ? demo.intro : undefined} muted>
            {embedUrl ? (
                <DemoPlayer embedUrl={embedUrl} />
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
