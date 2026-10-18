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
