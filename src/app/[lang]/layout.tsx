import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Theme } from "@/providers/theme";
import { getContent, hasLocale, locales } from "@/site/i18n";
import { SITE_URL } from "@/site/links";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

/** One static page per language; any other first segment is a 404 (the proxy sends `/` to a language). */
export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};
    const t = getContent(lang);
    return {
        metadataBase: new URL(SITE_URL),
        title: t.meta.title,
        description: t.meta.description,
        alternates: {
            canonical: `/${lang}`,
            languages: { ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])), "x-default": "/" },
        },
        openGraph: {
            type: "website",
            siteName: "Tropicast",
            title: t.meta.title,
            description: t.meta.description,
            locale: lang === "fr" ? "fr_FR" : "en_GB",
            alternateLocale: lang === "fr" ? ["en_GB"] : ["fr_FR"],
            url: `/${lang}`,
        },
        twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    };
}

export const viewport: Viewport = {
    themeColor: "#009689",
    colorScheme: "light dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();

    return (
        <html lang={lang} suppressHydrationWarning>
            <body className={cx(inter.variable, "bg-primary antialiased")}>
                <Theme>{children}</Theme>
            </body>
        </html>
    );
}
