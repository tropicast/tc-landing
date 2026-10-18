import { Globe02 } from "@untitledui/icons";
import { type Locale, getContent, locales } from "@/site/i18n";

/** Links to the same page in the other languages, each named in its own language. */
export function LanguageSwitch({ current, label }: { current: Locale; label: string }) {
    return (
        <nav aria-label={label} className="flex items-center gap-1">
            <Globe02 className="size-5 text-fg-quaternary" aria-hidden="true" />
            {locales
                .filter((locale) => locale !== current)
                .map((locale) => (
                    <a
                        key={locale}
                        href={`/${locale}`}
                        hrefLang={locale}
                        lang={locale}
                        className="rounded-md px-1.5 py-1 text-sm font-semibold text-secondary outline-focus-ring hover:text-secondary_hover focus-visible:outline-2"
                    >
                        {getContent(locale).languageName}
                    </a>
                ))}
        </nav>
    );
}
