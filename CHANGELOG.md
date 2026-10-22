# Changelog

All notable changes to the landing page. Format: [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Fixed

- Vulnerable dependencies of Lighthouse CI (#33): `basic-ftp`, `tmp` and `uuid` under `@lhci/cli` are overridden to their fixed versions (GHSA-c475-qrg2-pj4r, GHSA-ph9p-34f9-6g65, GHSA-w5hq-g745-h8pq), which the GitLab dependency scan flagged. Lighthouse CI runs unchanged.

### Added

- GitLab CI (#31): `.gitlab-ci.yml` runs the GitHub workflows' checks on the self-hosted GitLab, with tc-devops's security scans, manual Terraform plan and apply, and a manual production deploy with the Vercel CLI. `github_repository = null` unlinks Vercel from GitHub at the move. See `docs/infrastructure.md`, GitLab.

- Pricing during the beta (#26): paid plans keep their prices and limits but show « Bientôt disponible » / "Available soon", their button signs up for Free, and a note says they open at the end of the beta; the structured data offers only Free. Unchanged once `SITE_STAGE=live`.
- Beta notice (#23): a banner above the header and a « Bêta » / "Beta" pill next to the logo, in both languages, while `SITE_STAGE=beta` (Terraform `site_stage`, `beta` by default). At launch, `site_stage = "live"`.
- Search and speed (#7): `sitemap.xml`, `robots.txt`, Twitter cards and schema.org data (organization, site, desktop app with its plans, FAQ). Links, badges, the theme toggle and the phone menu no longer use React Aria, most of the page's script: Lighthouse performance 0.79–0.97 instead of 0.71–0.75. Lighthouse CI on both languages: accessibility, best practices, SEO and layout shift fail the build, speed warns.
- French and English (#6): `/fr` (default) and `/en`, `/` goes to the visitor's language from `Accept-Language`; `hreflang` alternates, a language switch in the header and footer, a 404 page and an Open Graph image per language. Copy in `src/site/i18n/`, checked for matching keys, prices and French typography.
- The page's content (#5): hero with a drawing of a station on air, how it works with the app's downloads, six features, live demo (the station in `DEMO_STATION`, loaded on request), pricing (Free, Starter €19, Growth €55, Pro €120, limits from tc-dashboard), FAQ, footer, and a section menu on phones. All copy in `src/site/content.ts`.
- Hosting in Terraform (#4): Vercel project built from GitHub (production from `main`, a preview per pull request), `www.tropicastradio.com` as the address and the apex redirecting to it (308), Cloudflare DNS records (DNS only). Manual plan/apply workflow, validation in CI, Dependabot for the providers. See `docs/infrastructure.md`.
- Design system (#3): Tropicast brand on Untitled UI (tokens in step with tc-dashboard, primary buttons AA in both themes), light and dark themes with a toggle, logo and icons, Open Graph image, and the page's structure as a wireframe. axe checks both themes in CI. See `docs/design.md`.
- Next.js project from the Untitled UI React starter (teal brand), with ESLint, Prettier, Vitest, Playwright, CI and Dependabot (#2).
