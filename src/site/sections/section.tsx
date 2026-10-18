import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * The shell every section of the page uses: the same width, gutters and vertical rhythm, an eyebrow, a heading
 * and an intro. `muted` alternates the background so sections read as separate bands.
 */
export function Section({
    id,
    eyebrow,
    title,
    intro,
    muted,
    children,
}: {
    id: string;
    eyebrow?: string;
    title: string;
    intro?: string;
    muted?: boolean;
    children?: ReactNode;
}) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className={cx("scroll-mt-20 py-16 md:py-24", muted ? "bg-secondary" : "bg-primary")}>
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="max-w-3xl">
                    {eyebrow && <p className="text-sm font-semibold text-brand-secondary md:text-md">{eyebrow}</p>}
                    <h2 id={`${id}-title`} className="mt-3 text-display-xs font-semibold text-primary md:text-display-md">
                        {title}
                    </h2>
                    {intro && <p className="mt-4 text-lg text-tertiary md:text-xl">{intro}</p>}
                </div>
                {children && <div className="mt-12 md:mt-16">{children}</div>}
            </div>
        </section>
    );
}

/** A grey block standing for content to come (#5): keeps the wireframe's proportions. */
export function Placeholder({ label, className }: { label: string; className?: string }) {
    return (
        <div className={cx("flex items-center justify-center rounded-xl border border-dashed border-primary p-8 text-sm text-quaternary", className)}>
            {label}
        </div>
    );
}
