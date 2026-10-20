import { describe, expect, it } from "vitest";
import { isBeta } from "./stage";

describe("isBeta", () => {
    it.each([
        ["beta", true],
        ["live", false],
        [undefined, false],
        ["", false],
        ["BETA", false],
    ])("%s → %s", (stage, beta) => {
        expect(isBeta(stage)).toBe(beta);
    });
});
