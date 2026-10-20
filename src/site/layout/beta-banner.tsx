import { InfoCircle } from "@untitledui/icons";
import type { Content } from "@/site/i18n";

/** A thin band above the header while the site is in beta (#23). Not dismissible: nothing to remember, no cookie. */
export function BetaBanner({ t }: { t: Content }) {
    return (
        <aside aria-label={t.beta.label} className="border-b border-secondary bg-brand-primary_alt">
            <p className="mx-auto flex max-w-container items-center justify-center gap-2 px-4 py-2 text-center text-sm text-secondary md:px-8">
                <InfoCircle className="size-4 shrink-0 text-fg-brand-secondary max-sm:hidden" aria-hidden="true" />
                {t.beta.text}
            </p>
        </aside>
    );
}
