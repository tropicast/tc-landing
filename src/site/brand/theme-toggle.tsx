"use client";

import { useSyncExternalStore } from "react";
import { Moon01, Sun } from "@untitledui/icons";
import { useTheme } from "next-themes";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

/** Switches between light and dark. The first visit follows the system (`prefers-color-scheme`). */
export function ThemeToggle({ light, dark: darkLabel }: { light: string; dark: string }) {
    const { resolvedTheme, setTheme } = useTheme();
    // The theme is only known in the browser: the server render and hydration show the light icon.
    const hydrated = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
    const dark = hydrated && resolvedTheme === "dark";

    return (
        <ButtonUtility
            color="tertiary"
            icon={dark ? Sun : Moon01}
            tooltip={dark ? light : darkLabel}
            onClick={() => setTheme(dark ? "light" : "dark")}
            data-testid="theme-toggle"
        />
    );
}
