import { cx } from "@/utils/cx";

/**
 * The classes of Untitled UI's `Button` (src/components/base/buttons/button.tsx) for the variants this site uses,
 * so links and buttons render as plain `<a>`/`<button>`: they need none of React Aria's JavaScript, which was most
 * of the page's script (#7). Keep in step with Untitled's file when it is updated.
 */
const common =
    "group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 *:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all";

const sizes = {
    md: "gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px]",
    lg: "gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold before:rounded-[7px]",
    xl: "gap-1.5 rounded-lg px-4.5 py-3 text-md font-semibold before:rounded-[7px]",
};

const linkSizes = { md: "gap-1 *:data-text:underline-offset-4", lg: "gap-1.5 *:data-text:underline-offset-4", xl: "gap-1.5 *:data-text:underline-offset-4" };

const colors = {
    primary:
        "bg-brand-solid text-white shadow-xs-skeuomorphic ring-1 ring-transparent ring-inset hover:bg-brand-solid_hover before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% *:data-icon:text-white/60 hover:*:data-icon:text-white/70",
    secondary:
        "bg-primary text-secondary shadow-xs-skeuomorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover",
    tertiary: "text-tertiary hover:bg-primary_hover hover:text-tertiary_hover *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover",
    "link-color":
        "justify-normal rounded p-0! text-brand-secondary hover:text-brand-secondary_hover *:data-text:underline *:data-text:decoration-transparent hover:*:data-text:decoration-fg-brand-secondary_alt *:data-icon:text-fg-brand-secondary_alt",
    "link-gray":
        "justify-normal rounded p-0! text-tertiary hover:text-tertiary_hover *:data-text:underline *:data-text:decoration-transparent hover:*:data-text:decoration-fg-quaternary *:data-icon:text-fg-quaternary",
};

export type ButtonColor = keyof typeof colors;
export type ButtonSize = keyof typeof sizes;

export const buttonClass = (color: ButtonColor = "primary", size: ButtonSize = "md", className?: string) =>
    cx(common, color.startsWith("link") ? linkSizes[size] : sizes[size], colors[color], className);

/** Untitled's text span inside a button: keeps the same padding and underline behaviour. */
export const buttonTextClass = "transition-inherit-all px-0.5";

const pillColors = {
    brand: "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200",
    error: "bg-utility-red-50 text-utility-red-700 ring-utility-red-200",
};

/** Untitled's pill badge (`Badge` / `BadgeWithDot`, type `pill-color`). */
export const pillClass = (color: keyof typeof pillColors, size: "sm" | "md" = "md", dot = false) =>
    cx(
        "flex size-max items-center rounded-full whitespace-nowrap ring-1 ring-inset",
        size === "sm" ? "px-2 py-0.5 text-xs font-medium" : dot ? "gap-1.5 py-0.5 pr-2.5 pl-2 text-sm font-medium" : "px-2.5 py-0.5 text-sm font-medium",
        pillColors[color],
    );
export const pillDotClass = { brand: "text-utility-brand-500", error: "text-utility-red-500" };
