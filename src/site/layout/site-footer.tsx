import { Logo } from "@/site/brand/logo";
import { PRIVACY_URL, TERMS_URL } from "@/site/links";

/** Placeholder: the final links and contact come with the content (#5). */
export function SiteFooter() {
    return (
        <footer className="border-t border-secondary bg-secondary">
            <div className="mx-auto flex max-w-container flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
                <Logo />
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-md text-tertiary">
                    <li>
                        <a className="hover:text-tertiary_hover" href={TERMS_URL}>
                            Terms
                        </a>
                    </li>
                    <li>
                        <a className="hover:text-tertiary_hover" href={PRIVACY_URL}>
                            Privacy
                        </a>
                    </li>
                </ul>
                <p className="text-sm text-quaternary">© {new Date().getFullYear()} Tropicast</p>
            </div>
        </footer>
    );
}
