import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { content } from "@/site/content";
import { SIGN_UP_URL, downloadUrl } from "@/site/links";
import { sections } from "@/site/sections/sections";
import Home from "./page";

describe("Home", () => {
    it("has one h1 and sends the main call to action to the sign-up", () => {
        render(<Home />);
        expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
        expect(screen.getAllByRole("link", { name: content.hero.primary })[0]).toHaveAttribute("href", SIGN_UP_URL);
    });

    it("has every section the header links to, in order", () => {
        const { container } = render(<Home />);
        const nav = screen.getByRole("navigation", { name: content.nav.sections });
        const links = within(nav)
            .getAllByRole("link")
            .map((link) => link.getAttribute("href"));
        expect(links).toEqual(sections.map((section) => `#${section.id}`));
        const ids = [...container.querySelectorAll("main section[id]")].map((section) => section.id);
        expect(ids).toEqual(sections.map((section) => section.id));
    });

    it("shows the four plans with their prices", () => {
        render(<Home />);
        const pricing = screen.getByRole("region", { name: content.pricing.title });
        for (const plan of content.pricing.plans) {
            const card = within(pricing).getByRole("heading", { level: 3, name: plan.name }).closest("li")!;
            expect(within(card).getByText(plan.price)).toBeInTheDocument();
        }
    });

    it("links each platform to its download", () => {
        render(<Home />);
        for (const download of content.howItWorks.downloads) {
            expect(screen.getByRole("link", { name: download.label })).toHaveAttribute("href", downloadUrl(download.platform));
        }
    });

    it("has every question of the FAQ", () => {
        render(<Home />);
        for (const item of content.faq.items) {
            expect(screen.getByText(item.question)).toBeInTheDocument();
        }
    });
});
