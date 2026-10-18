"use client";

import { Download01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

/**
 * A download link with its icon. A client component, so the icon is passed as a component: from a server component it
 * has to cross as an element, and React's payload then dedupes repeated ones into references that the first HTML
 * can miss.
 */
export function DownloadButton({ href, label }: { href: string; label: string }) {
    return (
        <Button color="secondary" size="lg" iconLeading={Download01} href={href} className="w-full">
            {label}
        </Button>
    );
}
