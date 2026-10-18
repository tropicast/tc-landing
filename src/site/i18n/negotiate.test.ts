import { describe, expect, it } from "vitest";
import { negotiateLocale } from "./index";

describe("negotiateLocale", () => {
    it.each([
        [null, "fr"],
        ["", "fr"],
        ["en-US,en;q=0.9", "en"],
        ["fr-MG,fr;q=0.9,en;q=0.8", "fr"],
        ["mg,en;q=0.5", "en"],
        ["de-DE,de;q=0.9", "fr"],
        ["en;q=0.4,fr;q=0.8", "fr"],
        ["fr;q=0,en", "en"],
        ["*", "fr"],
    ])("%s → %s", (header, locale) => {
        expect(negotiateLocale(header)).toBe(locale);
    });
});
