import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { content } from "@/site/content";
import { Demo } from "./demo";

describe("Demo", () => {
    it("loads the station's embedded player only when asked", async () => {
        render(<Demo station="radio-mada/morning" />);
        expect(document.querySelector("iframe")).toBeNull();
        await userEvent.click(screen.getByRole("button", { name: content.demo.play }));
        expect(document.querySelector("iframe")).toHaveAttribute("src", "https://app.tropicastradio.com/embed/radio-mada/morning");
    });

    it("offers the sign-up instead when no valid demo station is set", () => {
        for (const station of [undefined, "", "not a slug", "../../admin"]) {
            const { unmount } = render(<Demo station={station} />);
            expect(screen.queryByRole("button", { name: content.demo.play })).toBeNull();
            expect(screen.getByText(content.demo.unavailable)).toBeInTheDocument();
            unmount();
        }
    });
});
