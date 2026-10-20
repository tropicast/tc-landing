# Tropicast landing page

The public site at **https://www.tropicastradio.com**: what Tropicast is, the plans, and the way to sign up
(`app.tropicastradio.com`) or download the desktop app. Epic: #1.

- **Stack**: Next.js (App Router, TypeScript), pages prerendered as static content, hosted on Vercel.
- **Design system**: [Untitled UI React](https://www.untitledui.com/react) (open source, MIT), the same as the dashboard:
  React Aria Components, Tailwind CSS v4, `@untitledui/icons`, Inter, teal brand.
- **Infrastructure**: Terraform for the Vercel project and the Cloudflare DNS records: [docs/infrastructure.md](docs/infrastructure.md).

## Develop

Node 24 (`.nvmrc`).

```sh
npm ci
npm run dev          # http://localhost:3000
```

## Test

```sh
npm run format:check
npm run lint
npm run typecheck
npm test                  # Vitest + Testing Library
npm run build
npm run test:e2e:install  # once: Chromium for Playwright
npm run test:e2e          # Playwright against the production build, mobile and desktop
```

CI (`.github/workflows/ci.yml`) runs all of them on every pull request.

## Components

`src/components`, `src/hooks` and `src/utils` are Untitled UI's code, added with `npx untitledui@latest add <component>`
and kept as published. ESLint skips them, so they can be updated from upstream. Untitled UI's conventions for them
(for example, `react-aria-components` imports prefixed with `Aria`) are in `CLAUDE.md`. Our own code lives in
`src/app` and new folders next to it, and is linted.

## Contributing

One issue, one branch (`feat/…`, `fix/…`, `docs/…`, `ci/…`) and one pull request. CI must pass before review. Add
changes to the `Unreleased` section of [CHANGELOG.md](CHANGELOG.md).

## License

Copyright 2026 Tropicast. Licensed under the [Apache License, Version 2.0](LICENSE);
see [NOTICE](NOTICE). Untitled UI's components in `src/components`, `src/hooks` and `src/utils` remain under their
MIT license ([src/components/LICENSE-UNTITLED-UI](src/components/LICENSE-UNTITLED-UI)). The license does not grant
use of the Tropicast name or logo (section 6).
