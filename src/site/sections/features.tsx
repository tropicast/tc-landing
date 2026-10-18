import type { FC } from "react";
import { BarChart07, Globe01, Microphone01, Repeat01, Signal01, Zap } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import type { Content, FeatureIcon } from "@/site/i18n";
import { Section } from "@/site/sections/section";

const icons: Record<FeatureIcon, FC<{ className?: string }>> = {
    microphone: Microphone01,
    repeat: Repeat01,
    zap: Zap,
    signal: Signal01,
    globe: Globe01,
    chart: BarChart07,
};

export function Features({ t }: { t: Content }) {
    const { features } = t;
    return (
        <Section id="features" eyebrow={features.eyebrow} title={features.title} intro={features.intro}>
            <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
                {features.items.map((feature) => (
                    <li key={feature.title} className="flex flex-col gap-4">
                        <FeaturedIcon icon={icons[feature.icon]} color="brand" theme="light" size="lg" />
                        <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
                        <p className="text-md text-tertiary">{feature.text}</p>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
