# Design system

**Untitled UI React** (open source, MIT), the system tc-dashboard and the public station pages use. One look from
the landing page to `app.tropicastradio.com`. Decision and alternatives: #3.

## Tokens

`src/styles/theme.css` is Untitled UI's theme with the teal brand (`--color-brand-*` → teal), the same as
tc-dashboard's `web/src/styles/theme.css`. Both repos carry the same Tropicast overrides, marked `Tropicast:`:

- `--color-bg-brand-solid` is brand-700 and its hover brand-800, in both themes: white text on teal-600 is 3.66:1,
  below AA (4.5:1).

Keep the two files in step: change a token in both, with the same `Tropicast:` comment. A shared package is worth it
only if they start to drift.

- **Type**: Inter (`next/font`, self-hosted), Untitled UI's scale (`text-display-*`, `text-xl` … `text-xs`).
- **Themes**: light and dark (`light-mode` / `dark-mode` class on `<html>`, `next-themes`). The first visit follows
  `prefers-color-scheme`; the toggle in the header remembers the choice.
- **Icons**: `@untitledui/icons`.
- **Logo**: `public/tropicast-logo.svg`, the same in both themes. Favicon, icon and Apple icon from the workspace's
  `logos/`. The Open Graph image (`src/app/opengraph-image.tsx`) is the logo on dark teal.

## Code

- `src/components`, `src/hooks`, `src/utils`: Untitled UI's components, added with `npx untitledui@latest add` and
  kept as published (not linted).
- `src/site`: the site's own building blocks, made from them. `brand/` (logo, theme toggle), `layout/` (header,
  footer), `sections/` (the `Section` shell and the order of the page's sections in `sections.ts`), `links.ts` (URLs
  into the app).

## Page structure

Mobile first: one column below `md`. In order: header (logo, links to the sections from `md`, theme toggle, _Sign
in_, _Start free_), hero (headline, two calls to action, product picture), how it works (three steps), features
(grid of six), live demo (player), pricing (four plans), FAQ, footer (legal links). Every section uses `Section`:
same width (`max-w-container`), gutters (16 px, 32 px from `md`) and vertical rhythm (64 px, 96 px from `md`), with
alternating backgrounds.

## Content and languages

The page exists in French (`/fr`, the default) and English (`/en`). All copy is in `src/site/i18n/`: `en.ts` defines
the shape (`Content`), `fr.ts` follows it, and tests check they have the same keys, the same prices and limits, and
French typography (narrow no-break space before `: ; ! ?`, no-break space in `« »`, amounts and units, typographic
apostrophe). Plan limits come from tc-dashboard `Plan.cs` and prices from its `PRICE_LABEL_*` variables (what the app
shows): change every language together. Write only what ships.

- `src/proxy.ts` sends a path without a language (`/`, `/pricing`) to the visitor's, from `Accept-Language`
  (French by default), with `Vary: Accept-Language`.
- Each page declares the other with `hreflang`, plus `x-default` (`/`). The header and footer link to the other
  language, named in its own language.
- An unknown path is a 404 page in the language of its URL.
- Adding a language (Malagasy, for instance): one more file in `src/site/i18n/`, and its code in `locales`.

## Accessibility

Target WCAG 2.2 AA. `e2e/design.spec.ts` runs axe on the page in both themes (contrast included), checks the theme
toggle and that a phone never scrolls sideways.

## Search and speed

- **Search engines**: `sitemap.xml` (both languages, with their alternates) and `robots.txt`; per language a
  canonical URL, `hreflang` alternates, Open Graph and Twitter cards; schema.org JSON-LD (`src/site/structured-data.tsx`):
  the organization, the site, the desktop app with the four plans as offers, and the FAQ.
- **Little JavaScript**: links and buttons are plain `<a>`/`<button>` with Untitled UI's classes
  (`src/site/ui/styles.ts`, `LinkButton`, `Pill`); the theme toggle and the phone menu are small hand-written
  components. React Aria (what Untitled's interactive components are built on) was most of the page's script and is
  no longer loaded. Keep it that way: an Untitled component with `"use client"` brings it back.
- **Lighthouse CI** (`lighthouserc.cjs`, in CI after the e2e tests): both languages, mobile, median of three runs.
  Accessibility, best practices and SEO (all 1.0) and CLS (0) fail the build. Speed only warns: Lighthouse simulates a
  throttled phone from a trace taken at full speed, and the same build scores 0.79–0.97 from run to run on one
  machine. Before #7 the live site scored 0.71–0.75 with up to 1.6 s of blocking time.

## Beta notice

While `SITE_STAGE=beta` (#23, set by Terraform's `site_stage`), every page shows a thin banner above the header and
a « Bêta » / "Beta" pill next to the logo, in the page's language. It is not dismissible: remembering a dismissal
would need a cookie or storage, and the site keeps none. Paid plans can't be bought during the beta (tc-dashboard#149): the pricing cards keep their prices but show
« Bientôt disponible » / "Available soon" and a sign-up button, and the structured data offers only Free (#26).
Search engines still index the site. At launch, see
[Infrastructure](infrastructure.md#launch-end-of-the-beta).
