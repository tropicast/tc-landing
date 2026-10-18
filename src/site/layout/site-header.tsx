import { Button } from "@/components/base/buttons/button";
import { Logo } from "@/site/brand/logo";
import { ThemeToggle } from "@/site/brand/theme-toggle";
import { type Content, type Locale, getContent, locales } from "@/site/i18n";
import { LanguageSwitch } from "@/site/layout/language-switch";
import { MobileMenu } from "@/site/layout/mobile-menu";
import { APP_URL, SIGN_UP_URL } from "@/site/links";
import { sectionsOf } from "@/site/sections/sections";

/** Logo, links to the page's sections (a menu below `md`), language, theme toggle and the two calls to action. */
export function SiteHeader({ t }: { t: Content }) {
    const { nav } = t;
    const lang = t.lang as Locale;
    const sections = sectionsOf(t).map((section) => ({ href: `#${section.id}`, label: section.title }));
    const otherLanguages = locales
        .filter((locale) => locale !== lang)
        .map((locale) => ({ href: `/${locale}`, label: getContent(locale).languageName, hrefLang: locale }));

    return (
        <header className="sticky top-0 z-10 border-b border-secondary bg-primary/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-container items-center gap-4 px-4 md:h-18 md:px-8">
                <a href="#top" className="shrink-0 rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                    <Logo />
                </a>
                <nav aria-label={nav.sections} className="ml-4 max-lg:hidden">
                    <ul className="flex items-center gap-6">
                        {sections.map((section) => (
                            <li key={section.href}>
                                <Button color="link-gray" size="md" href={section.href}>
                                    {section.label}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="ml-auto flex items-center gap-2">
                    <div className="max-md:hidden">
                        <LanguageSwitch current={lang} label={nav.language} />
                    </div>
                    <ThemeToggle light={t.theme.light} dark={t.theme.dark} />
                    <Button color="tertiary" size="md" href={APP_URL} className="max-md:hidden">
                        {nav.signIn}
                    </Button>
                    <Button size="md" href={SIGN_UP_URL} className="max-sm:hidden">
                        {nav.startFree}
                    </Button>
                    <MobileMenu
                        label={nav.menu}
                        title={nav.sections}
                        sections={sections}
                        extra={[{ href: APP_URL, label: nav.signIn }, { href: SIGN_UP_URL, label: nav.startFree }, ...otherLanguages]}
                    />
                </div>
            </div>
        </header>
    );
}
