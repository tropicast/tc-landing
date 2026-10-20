"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu02, XClose } from "@untitledui/icons";

type Link = { href: string; label: string; hrefLang?: string };

/**
 * Below `lg`: the sections, *Sign in*, *Start free* and the other language in a menu under the header. A link,
 * Escape or a click outside closes it. A disclosure button and a list of links: no React Aria (#7).
 */
export function MobileMenu({ label, title, sections, extra }: { label: string; title: string; sections: Link[]; extra: Link[] }) {
    const [open, setOpen] = useState(false);
    const id = useId();
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
        const onClick = (event: MouseEvent) => root.current && !root.current.contains(event.target as Node) && setOpen(false);
        document.addEventListener("keydown", onKey);
        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("click", onClick);
        };
    }, [open]);

    return (
        <div ref={root} className="relative lg:hidden">
            <button
                type="button"
                aria-label={label}
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpen(!open)}
                className="flex size-10 cursor-pointer items-center justify-center rounded-lg text-fg-secondary outline-focus-ring hover:bg-primary_hover focus-visible:outline-2"
            >
                {open ? <XClose className="size-6" aria-hidden="true" /> : <Menu02 className="size-6" aria-hidden="true" />}
            </button>
            <nav
                id={id}
                aria-label={title}
                hidden={!open}
                className="absolute top-full right-0 mt-3 w-[calc(100vw-2rem)] max-w-sm rounded-xl bg-primary shadow-lg ring-1 ring-secondary_alt"
            >
                <ul className="flex flex-col py-2">
                    {sections.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 text-md font-semibold text-primary hover:bg-primary_hover"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    {extra.map((link, index) => (
                        <li key={link.href} className={index === 0 ? "mt-2 border-t border-secondary pt-2" : undefined}>
                            <a
                                href={link.href}
                                hrefLang={link.hrefLang}
                                className="block px-4 py-3 text-md font-semibold text-secondary hover:bg-primary_hover"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
