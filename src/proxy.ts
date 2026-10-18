import { type NextRequest, NextResponse } from "next/server";
import { hasLocale, negotiateLocale } from "@/site/i18n";

/**
 * Every page lives under `/fr` or `/en`. A path without one (`/`, `/pricing`) is redirected to the visitor's language
 * from `Accept-Language`, French by default. The redirect depends on that header: `Vary` says so to caches.
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const first = pathname.split("/")[1] ?? "";
    if (hasLocale(first)) return;

    const url = request.nextUrl.clone();
    url.pathname = `/${negotiateLocale(request.headers.get("accept-language"))}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url, 307);
    response.headers.set("Vary", "Accept-Language");
    return response;
}

export const config = {
    // Not Next's files, nor files with an extension (icons, logo, robots.txt, sitemap.xml).
    matcher: ["/((?!_next/|.*\\.[a-zA-Z0-9]+$).*)"],
};
