"use client";

import { useSyncExternalStore } from "react";
import { Moon01, Sun } from "@untitledui/icons";
import { useTheme } from "next-themes";

/**
 * Switches between light and dark. The first visit follows the system (`prefers-color-scheme`). A plain button with
 * Untitled UI's `ButtonUtility` look, without React Aria (#7).
 */
export function ThemeToggle({ light, dark: darkLabel }: { light: string; dark: string }) {
    const { resolvedTheme, setTheme } = useTheme();
    // The theme is only known in the browser: the server render and hydration show the light icon.
    const hydrated = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
    const dark = hydrated && resolvedTheme === "dark";
    const Icon = dark ? Sun : Moon01;
    const label = dark ? light : darkLabel;

    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={() => setTheme(dark ? "light" : "dark")}
            data-testid="theme-toggle"
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2"
        >
            <Icon className="size-5" aria-hidden="true" />
        </button>
    );
}
