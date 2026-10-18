import { Button } from "@/components/base/buttons/button";
import { Logo } from "@/site/brand/logo";
import { ThemeToggle } from "@/site/brand/theme-toggle";
import { APP_URL, SIGN_UP_URL } from "@/site/links";
import { sections } from "@/site/sections/sections";

/** Logo, links to the page's sections (from `md`), theme toggle and the two calls to action. */
export function SiteHeader() {
    return (
        <header className="sticky top-0 z-10 border-b border-secondary bg-primary/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-container items-center gap-4 px-4 md:h-18 md:px-8">
                <a href="#top" className="rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                    <Logo />
                </a>
                <nav aria-label="Sections" className="ml-4 max-md:hidden">
                    <ul className="flex items-center gap-6">
                        {sections
                            .filter((section) => section.inNav)
                            .map((section) => (
                                <li key={section.id}>
                                    <Button color="link-gray" size="md" href={`#${section.id}`}>
                                        {section.title}
                                    </Button>
                                </li>
                            ))}
                    </ul>
                </nav>
                <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <Button color="tertiary" size="md" href={APP_URL} className="max-sm:hidden">
                        Sign in
                    </Button>
                    <Button size="md" href={SIGN_UP_URL}>
                        Start free
                    </Button>
                </div>
            </div>
        </header>
    );
}
