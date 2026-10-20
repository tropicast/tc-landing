import { Check } from "@untitledui/icons";
import type { Content } from "@/site/i18n";
import { SIGN_UP_URL } from "@/site/links";
import { Section } from "@/site/sections/section";
import { LinkButton } from "@/site/ui/link-button";
import { Pill } from "@/site/ui/pill";
import { cx } from "@/utils/cx";

/** During the beta (#26), paid plans show their prices but can't be bought yet: "Available soon", and the button signs up for Free. */
export function Pricing({ t, beta = false }: { t: Content; beta?: boolean }) {
    const { pricing } = t;
    return (
        <Section id="pricing" eyebrow={pricing.eyebrow} title={pricing.title} intro={beta ? pricing.introBeta : pricing.intro}>
            {beta && <p className="-mt-6 mb-10 max-w-3xl text-md font-medium text-secondary md:-mt-10 md:mb-12">{pricing.betaNote}</p>}
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {pricing.plans.map((plan) => {
                    const soon = beta && plan.id !== "free";
                    const highlighted = plan.highlighted === true && !soon;
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
                                {(highlighted || soon) && (
                                    <Pill color="brand" size="sm">
                                        {soon ? pricing.soon : pricing.popular}
                                    </Pill>
                                )}
                            </div>
                            <p className="mt-4 flex items-baseline gap-1">
                                <span className="text-display-md font-semibold text-primary">{plan.price}</span>
                                {plan.period && <span className="text-md text-tertiary">{plan.period}</span>}
                            </p>
                            <p className="mt-2 text-md text-tertiary">{plan.summary}</p>
                            <LinkButton
                                size="lg"
                                color={highlighted || (beta && plan.id === "free") ? "primary" : "secondary"}
                                href={SIGN_UP_URL}
                                className="mt-6 w-full"
                            >
                                {plan.id === "free" || soon ? pricing.ctaFree : pricing.cta}
                            </LinkButton>
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
