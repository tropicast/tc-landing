import { Button } from "@/components/base/buttons/button";
import { content } from "@/site/content";
import { INSTALL_GUIDE_URL, downloadUrl } from "@/site/links";
import { DownloadButton } from "@/site/sections/download-button";
import { Section } from "@/site/sections/section";

const { howItWorks } = content;

/** Three numbered steps, then the app's downloads (the hero's "Download the app" lands here). */
export function HowItWorks() {
    return (
        <Section id="how-it-works" eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro} muted>
            <ol className="grid gap-8 md:grid-cols-3">
                {howItWorks.steps.map((step, index) => (
                    <li key={step.title} className="flex flex-col gap-4">
                        <span className="flex size-12 items-center justify-center rounded-full bg-brand-solid text-lg font-semibold text-white">
                            {index + 1}
                        </span>
                        <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
                        <p className="text-md text-tertiary">{step.text}</p>
                    </li>
                ))}
            </ol>
            <div id="download" className="mt-12 scroll-mt-24 rounded-2xl bg-primary p-6 ring-1 ring-secondary md:mt-16 md:p-8">
                <h3 className="text-lg font-semibold text-primary">{howItWorks.downloadsTitle}</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {howItWorks.downloads.map((download) => (
                        <li key={download.platform}>
                            <DownloadButton href={downloadUrl(download.platform)} label={download.label} />
                        </li>
                    ))}
                </ul>
                <Button color="link-color" size="md" href={INSTALL_GUIDE_URL} className="mt-4">
                    {howItWorks.installGuide}
                </Button>
            </div>
        </Section>
    );
}
