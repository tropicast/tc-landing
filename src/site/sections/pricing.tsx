import { Check } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import type { Content } from "@/site/i18n";
import { SIGN_UP_URL } from "@/site/links";
import { Section } from "@/site/sections/section";
import { cx } from "@/utils/cx";

export function Pricing({ t }: { t: Content }) {
    const { pricing } = t;
    return (
        <Section id="pricing" eyebrow={pricing.eyebrow} title={pricing.title} intro={pricing.intro}>
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {pricing.plans.map((plan) => {
                    const highlighted = plan.highlighted === true;
                    return (
                        <li
                            key={plan.id}
                            className={cx(
                                "flex flex-col rounded-2xl bg-primary p-6 shadow-sm ring-1 md:p-8",
                                highlighted ? "ring-2 ring-brand" : "ring-secondary",
                            )}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <h3 className="text-lg font-semibold text-primary">{plan.name}</h3>
                                {highlighted && (
                                    <Badge type="pill-color" color="brand" size="sm">
                                        {pricing.popular}
                                    </Badge>
                                )}
                            </div>
                            <p className="mt-4 flex items-baseline gap-1">
                                <span className="text-display-md font-semibold text-primary">{plan.price}</span>
                                {plan.period && <span className="text-md text-tertiary">{plan.period}</span>}
                            </p>
                            <p className="mt-2 text-md text-tertiary">{plan.summary}</p>
                            <Button size="lg" color={highlighted ? "primary" : "secondary"} href={SIGN_UP_URL} className="mt-6 w-full">
                                {plan.id === "free" ? pricing.ctaFree : pricing.cta}
                            </Button>
                            <ul className="mt-8 flex flex-col gap-3 border-t border-secondary pt-6">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-3 text-md text-tertiary">
                                        <Check className="mt-0.5 size-5 shrink-0 text-fg-brand-primary" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
            <p className="mt-8 text-sm text-tertiary">{pricing.listenersNote}</p>
        </Section>
    );
}
