# SEO Metadata Baseline

This document captures the current technical SEO contract for the public web repo.

It is intended to be durable implementation documentation for this repository, not a task artifact.

## Scope

- Repo: `invariant-marketing`
- Surface: indexable public web routes only
- Excludes:
  - platform internals
  - private or protected app surfaces
  - alias redirects as indexable pages

## Source Of Truth

Filesystem route truth is authoritative.

Current indexable public routes:

- `/`
- `/cohort`
- `/platform`
- `/how-it-works`
- `/security`
- `/governance`
- `/solutions`
- `/pricing`
- `/company`
- `/contact`
- `/offering`
- `/legal`
- `/terms`
- `/privacy`
- `/disclaimer`

Current redirect aliases:

- `/legal/privacy` -> `/privacy`
- `/legal/terms` -> `/terms`
- `/legal/disclaimer` -> `/disclaimer`

## Metadata Contract

Every indexable route must render:

- `title`
- `description`
- absolute canonical URL
- Open Graph title, description, URL, and image
- Twitter card, title, description, and image
- `robots` set to `index, follow`

Implementation notes:

- [src/app/layout.tsx](/Users/courtezcannady/code/dh/invariant-marketing/src/app/layout.tsx) provides shared defaults and `metadataBase`.
- Page-specific metadata is owned by either:
  - `generateMetadata()` on dynamic routes
  - `export const metadata` on static routes
- Canonicals should remain route-relative in page metadata and become absolute through `metadataBase`.
- `og:url` must match the canonical route.
- Twitter values should mirror Open Graph messaging.

## Sitemap Rules

Sitemap output is served from [src/app/sitemap.xml/route.ts](/Users/courtezcannady/code/dh/invariant-marketing/src/app/sitemap.xml/route.ts).

Rules:

- Include only canonical indexable routes.
- Exclude redirect aliases.
- Keep `/offering` in the sitemap unless the route is intentionally removed.
- `loc` values must resolve against `PUBLIC_SITE_URL`.

## Robots Rules

Robots output is served from [src/app/robots.txt/route.ts](/Users/courtezcannady/code/dh/invariant-marketing/src/app/robots.txt/route.ts).

Rules:

- Allow `/`
- Reference the absolute sitemap URL
- Do not add broad disallow rules without an explicit product decision

## Shared Social Asset

The repository currently serves a shared fallback social preview image:

- [public/social/og-default.png](/Users/courtezcannady/code/dh/invariant-marketing/public/social/og-default.png)

Current baseline:

- 1200 x 630 PNG
- safe shared fallback for OG and Twitter

This is a technical baseline, not a per-page creative system.

## Route Notes

`/contact` is owned by the static route at [src/app/contact/page.tsx](/Users/courtezcannady/code/dh/invariant-marketing/src/app/contact/page.tsx).

To avoid duplicate route authority:

- `contact` must not be added back to `TOP_LEVEL_SLUGS` in [src/content/pages.ts](/Users/courtezcannady/code/dh/invariant-marketing/src/content/pages.ts)
- the dynamic `[slug]` route should continue to own only the MDX-backed top-level content pages and root legal documents

## Validation

Run these before shipping metadata changes:

```bash
npm run lint
npm run typecheck
npm run build
```

For local verification, use a production-style site URL:

```bash
ENVIRONMENT=production \
PUBLIC_SITE_URL=https://digitalhooligan.io \
APP_ID=invariant-marketing \
APP_VERSION=0.1.0 \
BUILD_TIMESTAMP=2026-03-26T00:00:00Z \
npm run build
```

Recommended spot checks after build:

- homepage canonical/OG/Twitter tags
- `/offering` canonical and sitemap presence
- `/legal` canonical and social tags
- redirect alias response on `/legal/privacy`
- `robots.txt` sitemap reference
- `sitemap.xml` contains only canonical routes

## Change Guidance

When editing SEO metadata in this repo:

- prefer updating existing page metadata exports before adding new helpers
- preserve separation from any platform or private app repo
- avoid introducing runtime metadata injection
- do not add route auto-discovery systems unless explicitly approved

If a future change needs something larger than these patterns support, document:

1. what is needed
2. why current repo patterns are insufficient
3. the smallest acceptable addition
4. why approval is required before implementation
