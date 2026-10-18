import { Logo } from "@/site/brand/logo";
import { content } from "@/site/content";
import { APP_URL, PRIVACY_URL, TERMS_URL } from "@/site/links";

const { footer } = content;

export function SiteFooter() {
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
                <p className="text-sm text-tertiary">© {new Date().getFullYear()} Tropicast</p>
            </div>
        </footer>
    );
}
