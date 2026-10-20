import type { ReactNode } from "react";
import { pillClass, pillDotClass } from "@/site/ui/styles";

/** Untitled UI's pill badge, as plain HTML. `dot` adds the status dot of `BadgeWithDot`. */
export function Pill({ color, size, dot, children }: { color: "brand" | "error"; size?: "sm" | "md"; dot?: boolean; children: ReactNode }) {
    return (
        <span className={pillClass(color, size, dot)}>
            {dot && (
                <svg viewBox="0 0 6 6" aria-hidden="true" className={`size-1.5 fill-current ${pillDotClass[color]}`}>
                    <circle cx="3" cy="3" r="3" />
                </svg>
            )}
            {children}
        </span>
    );
}
