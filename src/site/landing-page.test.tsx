import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getContent, locales } from "@/site/i18n";
import { LandingPage } from "@/site/landing-page";
import { SIGN_UP_URL, downloadUrl } from "@/site/links";
import { sectionsOf } from "@/site/sections/sections";

/** Testing Library collapses whitespace in the page, no-break spaces included, but not in the text searched for. */
const shown = (text: string) => text.replace(/\s+/g, " ");

describe.each(locales)("LandingPage (%s)", (lang) => {
    const t = getContent(lang);

    it("has one h1 and sends the main call to action to the sign-up", () => {
        render(<LandingPage t={t} />);
        expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
        expect(screen.getAllByRole("link", { name: t.hero.primary })[0]).toHaveAttribute("href", SIGN_UP_URL);
    });

    it("has every section the header links to, in order", () => {
        const { container } = render(<LandingPage t={t} />);
        const nav = screen.getByRole("navigation", { name: t.nav.sections });
        const links = within(nav)
            .getAllByRole("link")
            .map((link) => link.getAttribute("href"));
        expect(links).toEqual(sectionsOf(t).map((section) => `#${section.id}`));
        const ids = [...container.querySelectorAll("main section[id]")].map((section) => section.id);
        expect(ids).toEqual(sectionsOf(t).map((section) => section.id));
    });

    it("shows the four plans with their prices", () => {
        render(<LandingPage t={t} />);
        const pricing = screen.getByRole("region", { name: t.pricing.title });
        for (const plan of t.pricing.plans) {
            const card = within(pricing).getByRole("heading", { level: 3, name: plan.name }).closest("li")!;
            expect(within(card).getByText(shown(plan.price))).toBeInTheDocument();
        }
    });

    it("links each platform to its download", () => {
        render(<LandingPage t={t} />);
        for (const download of t.howItWorks.downloads) {
            expect(screen.getByRole("link", { name: download.label })).toHaveAttribute("href", downloadUrl(download.platform));
        }
    });

    it("has every question of the FAQ", () => {
        render(<LandingPage t={t} />);
        for (const item of t.faq.items) {
            expect(screen.getByText(shown(item.question))).toBeInTheDocument();
        }
    });

    it("links to the other languages, each named in its own language", () => {
        render(<LandingPage t={t} />);
        for (const other of locales.filter((locale) => locale !== lang)) {
            const links = screen.getAllByRole("link", { name: getContent(other).languageName });
            expect(links[0]).toHaveAttribute("href", `/${other}`);
            expect(links[0]).toHaveAttribute("hreflang", other);
        }
    });
});

describe.each(locales)("beta notice (%s)", (lang) => {
    const t = getContent(lang);

    it("shows the banner and the badge in beta", () => {
        render(<LandingPage t={t} beta />);
        expect(screen.getByRole("complementary", { name: t.beta.label })).toHaveTextContent(shown(t.beta.text));
        expect(screen.getByRole("banner")).toHaveTextContent(t.beta.badge);
    });

    it("shows neither once live", () => {
        render(<LandingPage t={t} beta={false} />);
        expect(screen.queryByRole("complementary", { name: t.beta.label })).toBeNull();
        expect(screen.getByRole("banner")).not.toHaveTextContent(t.beta.badge);
    });
});
