import type { ReactNode } from "react";
import { type ButtonColor, type ButtonSize, buttonClass, buttonTextClass } from "@/site/ui/styles";

/** A link that looks like Untitled UI's `Button`, as plain HTML: no client JavaScript. */
export function LinkButton({
    href,
    color,
    size,
    icon,
    className,
    hrefLang,
    children,
}: {
    href: string;
    color?: ButtonColor;
    size?: ButtonSize;
    /** An icon element with `data-icon` (Untitled's convention). */
    icon?: ReactNode;
    className?: string;
    hrefLang?: string;
    children: ReactNode;
}) {
    return (
        <a href={href} hrefLang={hrefLang} className={buttonClass(color, size, className)}>
            {icon}
            <span data-text className={buttonTextClass}>
                {children}
            </span>
        </a>
    );
}
