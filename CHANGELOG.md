# Changelog

All notable changes to the landing page. Format: [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- Hosting in Terraform (#4): Vercel project built from GitHub (production from `main`, a preview per pull request), `www.tropicastradio.com` as the address and the apex redirecting to it (308), Cloudflare DNS records (DNS only). Manual plan/apply workflow, validation in CI, Dependabot for the providers. See `docs/infrastructure.md`.
- Design system (#3): Tropicast brand on Untitled UI (tokens in step with tc-dashboard, primary buttons AA in both themes), light and dark themes with a toggle, logo and icons, Open Graph image, and the page's structure as a wireframe. axe checks both themes in CI. See `docs/design.md`.
- Next.js project from the Untitled UI React starter (teal brand), with ESLint, Prettier, Vitest, Playwright, CI and Dependabot (#2).
