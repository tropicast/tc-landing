import { type Content, en } from "./en";
import { fr } from "./fr";

export type { Content, Feature, FeatureIcon, Plan } from "./en";

/** French first: the first markets are French-speaking (#6). Malagasy can be added as one more file. */
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

const dictionaries: Record<Locale, Content> = { fr, en };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
export const getContent = (locale: Locale): Content => dictionaries[locale];

/**
 * The locale for a visitor without one in the URL, from `Accept-Language` (quality values honoured, region ignored:
 * `fr-MG` is French). Falls back to French.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
    const ranked = (acceptLanguage ?? "")
        .split(",")
        .map((part, index) => {
            const [tag, ...params] = part.trim().split(";");
            const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
            return { language: tag.split("-")[0].toLowerCase(), q: q ? Number(q.slice(2)) : 1, index };
        })
        .filter((entry) => entry.language && !Number.isNaN(entry.q) && entry.q > 0)
        .sort((a, b) => b.q - a.q || a.index - b.index);
    return ranked.map((entry) => entry.language).find(hasLocale) ?? defaultLocale;
}
