"use client";

import { Menu02, XClose } from "@untitledui/icons";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";

type Link = { href: string; label: string; hrefLang?: string };

/** Below `lg`: the sections, *Sign in*, *Start free* and the other language in a menu under the header. A link closes it. */
export function MobileMenu({ label, title, sections, extra }: { label: string; title: string; sections: Link[]; extra: Link[] }) {
    return (
        <AriaDialogTrigger>
            <AriaButton
                aria-label={label}
                className="group flex size-10 items-center justify-center rounded-lg text-fg-secondary outline-focus-ring hover:bg-primary_hover focus-visible:outline-2 lg:hidden"
            >
                <Menu02 className="size-6 group-aria-expanded:hidden" aria-hidden="true" />
                <XClose className="hidden size-6 group-aria-expanded:block" aria-hidden="true" />
            </AriaButton>
            <AriaPopover
                placement="bottom end"
                offset={12}
                className="w-[calc(100vw-2rem)] max-w-sm rounded-xl bg-primary shadow-lg ring-1 ring-secondary_alt lg:hidden"
            >
                <AriaDialog aria-label={title} className="outline-hidden">
                    {({ close }) => (
                        <nav>
                            <ul className="flex flex-col py-2">
                                {sections.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            onClick={close}
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
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
}
