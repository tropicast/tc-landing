<p align="center">
  <img src="public/tropicast-logo.svg" alt="Tropicast logo" width="120" height="120">
</p>

<h1 align="center">Tropicast Landing</h1>

<p align="center">
  The public site of Tropicast at <a href="https://www.tropicastradio.com">www.tropicastradio.com</a>: the product, the plans, sign-up and the desktop app's downloads, in French and English.
</p>

<p align="center">
  <a href="https://github.com/tropicast/tc-landing/actions/workflows/ci.yml"><img src="https://github.com/tropicast/tc-landing/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI"></a>
  <a href="https://github.com/tropicast/tc-landing/actions/workflows/terraform.yml"><img src="https://github.com/tropicast/tc-landing/actions/workflows/terraform.yml/badge.svg?branch=main" alt="Terraform"></a>
  <a href="https://www.tropicastradio.com"><img src="https://img.shields.io/website?url=https%3A%2F%2Fwww.tropicastradio.com%2Ffr&label=www.tropicastradio.com" alt="www.tropicastradio.com"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/tropicast/tc-landing" alt="License: Apache-2.0"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js 16"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" alt="React 19"></a>
  <a href="https://www.untitledui.com/react"><img src="https://img.shields.io/badge/Untitled%20UI-React-7F56D9" alt="Untitled UI React"></a>
  <a href=".github/dependabot.yml"><img src="https://img.shields.io/badge/Dependabot-enabled-025E8C?logo=dependabot&logoColor=white" alt="Dependabot enabled"></a>
</p>

A static Next.js site on Vercel. It sends visitors to the control plane
([tc-dashboard](https://github.com/tropicast/tc-dashboard)) to sign up and sign in, and to its downloads of the
desktop app ([tc-station](https://github.com/tropicast/tc-station)); the live demo plays a station from the
streaming plane ([tc-streaming](https://github.com/tropicast/tc-streaming)) through the dashboard's embed. Epic:
[#1](https://github.com/tropicast/tc-landing/issues/1).

```text
 visitor --> www.tropicastradio.com (Vercel) -- /  --307--> /fr or /en (Accept-Language)
              |    prerendered pages, one per language
              +--> app.tropicastradio.com: /signup, /terms, /privacy, /download/station/{platform}, /embed/{station}
 tropicastradio.com --308--> www            DNS: Cloudflare (DNS only), Terraform in infra/terraform
```

## Features

- One page per language, French (default) and English, prerendered; `/` picks the visitor's language.
- Hero, how it works with the app's downloads, features, live demo, pricing from the control plane's plans, FAQ.
- Untitled UI React, the dashboard's design system: same tokens, teal brand, light and dark themes.
- Accessible: WCAG 2.2 AA checked with axe in both languages and both themes.
- Search-ready: canonical and `hreflang` links, Open Graph images per language.
- Hosting as code: Vercel project and Cloudflare records in Terraform; a preview for every pull request.

## Quick start

Node 24 (`.nvmrc`).

```sh
npm ci
npm run dev          # http://localhost:3000 → /fr
```

`DEMO_STATION=<tenant-slug>/<station-slug>` at build time turns on the live demo.

## Build and test

```sh
npm run format:check
npm run lint
npm run typecheck         # route types, then tsc
npm test                  # Vitest + Testing Library, both languages
npm run build
npm run test:e2e:install  # once: Chromium for Playwright
npm run test:e2e          # Playwright against the production build, mobile and desktop
```

CI (`.github/workflows/ci.yml`) runs all of them on every pull request; `terraform.yml` validates the
infrastructure. On the self-hosted GitLab, `.gitlab-ci.yml` runs the same checks, the shared security scans and the
production deploy ([infrastructure](docs/infrastructure.md#gitlab-31)).

## Layout

| Path                               | What                                                                        |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `src/app/[lang]`                   | The page, its layout, metadata, 404 and Open Graph image, per language      |
| `src/proxy.ts`                     | Sends paths without a language to the visitor's                             |
| `src/site`                         | The site's own code: sections, header and footer, brand, links into the app |
| `src/site/i18n`                    | Every word, in French and English                                           |
| `src/components`, `hooks`, `utils` | Untitled UI's components, as published (`npx untitledui@latest add`)        |
| `e2e`                              | Playwright tests                                                            |
| `infra/terraform`                  | Vercel project, domains, Cloudflare DNS                                     |

## Documentation

| Topic                                    | Covers                                                             |
| ---------------------------------------- | ------------------------------------------------------------------ |
| [Design system](docs/design.md)          | Tokens, themes, code layout, page structure, content and languages |
| [Infrastructure](docs/infrastructure.md) | Vercel and DNS: setup, plan and apply, checks, rollback, removal   |
| [Changelog](CHANGELOG.md)                | Changes per release                                                |

## Contributing

One issue, one branch (`feat/…`, `fix/…`, `docs/…`, `ci/…`) and one pull request. CI must pass before review;
`main` is protected and deploys to production on merge. Add changes to the `Unreleased` section of
[CHANGELOG.md](CHANGELOG.md). Copy goes in `src/site/i18n` in every language at once.

## License

Copyright 2026 Tropicast. Licensed under the [Apache License, Version 2.0](LICENSE);
see [NOTICE](NOTICE). Untitled UI's components in `src/components`, `src/hooks` and `src/utils` remain under their
MIT license ([src/components/LICENSE-UNTITLED-UI](src/components/LICENSE-UNTITLED-UI)). The license does not grant
use of the Tropicast name or logo (section 6).

## Responsible use

- The software is provided "AS IS", without warranties or conditions of any kind. The authors and Tropicast are not
  liable for any damages or claims arising from its use (Apache License 2.0, sections 7 and 8).
- A copy of this site must not pass itself off as Tropicast: change the name, logo, links and legal pages before
  publishing it.
