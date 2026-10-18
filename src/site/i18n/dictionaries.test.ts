import { describe, expect, it } from "vitest";
import { en } from "./en";
import { fr } from "./fr";

/** Every string of a dictionary, with its path: `pricing.plans.1.price`. */
function strings(value: unknown, path = ""): [string, string][] {
    if (typeof value === "string") return [[path, value]];
    if (value && typeof value === "object") {
        return Object.entries(value).flatMap(([key, child]) => strings(child, path ? `${path}.${key}` : key));
    }
    return [];
}

describe("dictionaries", () => {
    it("have the same keys in every language", () => {
        expect(strings(fr).map(([path]) => path)).toEqual(strings(en).map(([path]) => path));
    });

    it("have no empty text", () => {
        for (const [path, text] of [...strings(en), ...strings(fr)]) {
            expect(text.trim(), path).not.toBe("");
        }
    });

    it("use French typography in French: no plain space before : ; ! ? or inside « », and the typographic apostrophe", () => {
        for (const [path, text] of strings(fr)) {
            expect(text, path).not.toMatch(/ [:;!?»]|« /);
            expect(text, path).not.toMatch(/'/);
        }
    });

    it("keep the same prices and plan limits in every language", () => {
        const digits = (text: string) => text.replace(/\D/g, "");
        for (const [index, plan] of en.pricing.plans.entries()) {
            const french = fr.pricing.plans[index];
            expect(french.id).toBe(plan.id);
            expect(digits(french.price)).toBe(digits(plan.price));
            expect(french.features.map(digits)).toEqual(plan.features.map(digits));
        }
    });
});
