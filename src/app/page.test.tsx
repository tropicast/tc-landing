import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
    it("names the product and links to the sign-up", () => {
        render(<Home />);
        expect(screen.getByRole("heading", { level: 1, name: "Tropicast" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Create a free station" })).toHaveAttribute("href", "https://app.tropicastradio.com");
    });
});
