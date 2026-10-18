import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { getContent } from "@/site/i18n";
import { Demo } from "./demo";

const t = getContent("en");

describe("Demo", () => {
    it("loads the station's embedded player only when asked", async () => {
        render(<Demo t={t} station="radio-mada/morning" />);
        expect(document.querySelector("iframe")).toBeNull();
        await userEvent.click(screen.getByRole("button", { name: t.demo.play }));
        expect(document.querySelector("iframe")).toHaveAttribute("src", "https://app.tropicastradio.com/embed/radio-mada/morning");
    });

    it("offers the sign-up instead when no valid demo station is set", () => {
        for (const station of [undefined, "", "not a slug", "../../admin"]) {
            const { unmount } = render(<Demo t={t} station={station} />);
            expect(screen.queryByRole("button", { name: t.demo.play })).toBeNull();
            expect(screen.getByText(t.demo.unavailable)).toBeInTheDocument();
            unmount();
        }
    });
});
