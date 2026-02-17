# A6 — Content Model / Authoring Schema (v1)

Track: Gravity (Public Web)

MDX-first for page content + JSON for global settings. All content lives inside this Public Web repo only.

## Non-negotiable boundary

No coupling to Scientia Platform. Public Web contains no imports or dependencies on platform foundations/auth/DB/audit/evidence/citations/feature flags/observability internals/engine logic.

## Authoring + storage model

- **MDX-first** for pages
- **JSON** for global site settings (nav/footer/CTAs/legal entity name)
- **Build-time validation** using Zod schemas (fails fast if frontmatter/settings are malformed)

## Folder conventions

- `/content/site/settings.json` — global settings (nav, footer, CTA labels/links)
- `/content/pages/*.mdx` — top-level pages
- `/content/legal/*.mdx` — legal hub + legal subpages
- `/content/case-studies/*.mdx` — case study details
- `/public/og/*.png` — OG images (optional per page)

## Route mapping

- `/content/pages/home.mdx` → `/`
- `/content/pages/platform.mdx` → `/platform`
- `/content/pages/how-it-works.mdx` → `/how-it-works`
- `/content/pages/security.mdx` → `/security`
- `/content/pages/governance.mdx` → `/governance`
- `/content/pages/solutions.mdx` → `/solutions`
- `/content/pages/pricing.mdx` → `/pricing`
- `/content/pages/company.mdx` → `/company`
- `/content/pages/contact.mdx` → `/contact`

Legal:

- `/content/legal/index.mdx` → `/legal`
- `/content/legal/terms.mdx` → `/legal/terms`
- `/content/legal/privacy.mdx` → `/legal/privacy`
- `/content/legal/disclaimer.mdx` → `/legal/disclaimer`

Case studies:

- `/content/case-studies/[slug].mdx` → `/case-studies/[slug]`

## Schema (implemented in `src/content/schema.ts`)

### SiteSettings (global)

Stored in `content/site/settings.json`

Fields:

- `primaryCtaLabel` (string, required) — "Schedule a Strategy Call"
- `primaryCtaHref` (string, required) — "/contact"
- `secondaryCtaLabel` (string, required) — "Read Security Posture"
- `secondaryCtaHref` (string, required) — "/security"
- `mainNav` (array<{label,href}>, required)
- `footerNav` (array<{label,href}>, required)
- `legalEntityName` (string, required)

### PageSEO (shared)

Frontmatter object:

- `title` (string, required)
- `description` (string, required)
- `canonical` (string, required; must match route)
- `ogImage` (string, optional; e.g. "/og/platform.png")

### HomePage (MDX frontmatter)

- `type`: "home"
- `seo`: PageSEO
- `title`: string
- `lede`: string

### Top-level Page (MDX frontmatter)

- `type`: "page"
- `slug`: string (must match filename and route segment)
- `seo`: PageSEO
- `title`: string

### LegalHub (MDX frontmatter)

- `type`: "legalHub"
- `seo`: PageSEO
- `title`: string
- `intro`: string
- `documents`: array<{label, href, lastUpdated}>
- `legalEntityName`: string

### LegalDocumentPage (MDX frontmatter)

- `type`: "legalDocument"
- `slug`: one of "terms" | "privacy" | "disclaimer"
- `seo`: PageSEO (canonical must be exact route)
- `title`: string
- `lastUpdated`: string (ISO date)
- `jurisdiction`: string (optional)
- `legalEntityName`: string
- `contentOwner`: string (optional)

### CaseStudy (MDX frontmatter)

- `type`: "caseStudy"
- `slug`: string
- `seo`: PageSEO
- `title`: string
- `summary`: string

## Governance posture

- Simple edits (copy changes, nav order, CTA labels) can be made by editing MDX/JSON only.
- All content is safe to publish by default (no internal platform IP embedded).
- Adding new pages/blocks is additive (new MDX files + optional components) without refactoring the routing core.
