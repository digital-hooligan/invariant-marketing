# Boundary Enforcement (Marketing Repo)

This repo must never couple (directly or transitively) to scientia-platform internals.

## E1-BOUNDARY

Surface scans block direct coupling references in marketing surface.

## E1-BOUNDARY-TRANSITIVE

A dependency-graph gate runs after `pnpm install --frozen-lockfile` and fails if the resolved dependency tree includes forbidden packages or forbidden origins.

### Forbidden roots / namespaces

- scientia-platform
- @scientia/\*
- any IP Vault internal packages: foundations/auth/db/audit/evidence/feature-flags/observability/engine logic
- engines/\*

### How to comply

- Remove direct deps that pull forbidden packages
- Remove transitive deps by replacing upstream packages or pinning safe alternatives
- Avoid `workspace:*` indirection to forbidden namespaces
- Avoid git URL deps that map back to forbidden repos
- Re-run locally:
  - `pnpm install --frozen-lockfile`
  - `node scripts/guardrails/e1-boundary-transitive.mjs`
