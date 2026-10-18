import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SIGN_UP_URL } from "@/site/links";
import { sections } from "@/site/sections/sections";
import Home from "./page";

describe("Home", () => {
    it("has one h1 and sends the main call to action to the sign-up", () => {
        render(<Home />);
        expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
        expect(screen.getByRole("link", { name: "Create a free station" })).toHaveAttribute("href", SIGN_UP_URL);
    });

    it("has every section the header links to, in order", () => {
        const { container } = render(<Home />);
        const nav = screen.getByRole("navigation", { name: "Sections" });
        const links = within(nav)
            .getAllByRole("link")
            .map((link) => link.getAttribute("href"));
        expect(links).toEqual(sections.map((section) => `#${section.id}`));
        const ids = [...container.querySelectorAll("main section[id]")].map((section) => section.id);
        expect(ids).toEqual(sections.map((section) => section.id));
    });
});
