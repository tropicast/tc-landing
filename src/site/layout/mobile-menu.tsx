"use client";

import { Menu02, XClose } from "@untitledui/icons";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { content } from "@/site/content";
import { APP_URL } from "@/site/links";
import { sections } from "@/site/sections/sections";

const { nav } = content;

/** Below `md`: the sections and *Sign in* in a menu under the header. A link closes it. */
export function MobileMenu() {
    return (
        <AriaDialogTrigger>
            <AriaButton
                aria-label={nav.menu}
                className="group flex size-10 items-center justify-center rounded-lg text-fg-secondary outline-focus-ring hover:bg-primary_hover focus-visible:outline-2 md:hidden"
            >
                <Menu02 className="size-6 group-aria-expanded:hidden" aria-hidden="true" />
                <XClose className="hidden size-6 group-aria-expanded:block" aria-hidden="true" />
            </AriaButton>
            <AriaPopover
                placement="bottom end"
                offset={12}
                className="w-[calc(100vw-2rem)] max-w-sm rounded-xl bg-primary shadow-lg ring-1 ring-secondary_alt md:hidden"
            >
                <AriaDialog aria-label={nav.sections} className="outline-hidden">
                    {({ close }) => (
                        <nav>
                            <ul className="flex flex-col py-2">
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            onClick={close}
                                            className="block px-4 py-3 text-md font-semibold text-primary hover:bg-primary_hover"
                                        >
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                                <li className="mt-2 border-t border-secondary pt-2">
                                    <a href={APP_URL} className="block px-4 py-3 text-md font-semibold text-secondary hover:bg-primary_hover">
                                        {nav.signIn}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
}
