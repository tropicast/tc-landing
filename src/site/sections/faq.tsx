import { ChevronDown } from "@untitledui/icons";
import type { Content } from "@/site/i18n";
import { Section } from "@/site/sections/section";

/** Native disclosure widgets: keyboard and screen readers work without script, and search engines see the answers. */
export function Faq({ t }: { t: Content }) {
    const { faq } = t;
    return (
        <Section id="faq" eyebrow={faq.eyebrow} title={faq.title} muted>
            <div className="max-w-3xl divide-y divide-secondary border-y border-secondary">
                {faq.items.map((item) => (
                    <details key={item.question} className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-5 text-lg font-semibold text-primary outline-focus-ring focus-visible:outline-2 [&::-webkit-details-marker]:hidden">
                            {item.question}
                            <ChevronDown
                                className="size-6 shrink-0 text-fg-quaternary transition duration-100 ease-linear group-open:-rotate-180"
                                aria-hidden="true"
                            />
                        </summary>
                        <p className="pb-5 text-md text-tertiary">{item.answer}</p>
                    </details>
                ))}
            </div>
        </Section>
    );
}
