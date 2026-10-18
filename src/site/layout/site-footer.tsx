import { Logo } from "@/site/brand/logo";
import { type Content, type Locale } from "@/site/i18n";
import { LanguageSwitch } from "@/site/layout/language-switch";
import { APP_URL, PRIVACY_URL, TERMS_URL } from "@/site/links";

export function SiteFooter({ t }: { t: Content }) {
    const { footer } = t;
    const links = [
        { label: footer.download, href: "#download" },
        { label: footer.signIn, href: APP_URL },
        { label: footer.terms, href: TERMS_URL },
        { label: footer.privacy, href: PRIVACY_URL },
    ];
    return (
        <footer className="border-t border-secondary bg-primary">
            <div className="mx-auto flex max-w-container flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
                <Logo />
                <ul className="flex flex-wrap gap-x-6 gap-y-3 text-md text-tertiary">
                    {links.map((link) => (
                        <li key={link.label}>
                            <a className="rounded-sm outline-focus-ring hover:text-tertiary_hover focus-visible:outline-2" href={link.href}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-6">
                    <LanguageSwitch current={t.lang as Locale} label={t.nav.language} />
                    <p className="text-sm text-tertiary">© {new Date().getFullYear()} Tropicast</p>
                </div>
            </div>
        </footer>
    );
}
