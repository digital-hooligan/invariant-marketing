# Secrets Compliance (v0.1)

This repository follows the Secrets & Environment Standard v0.1.

## Required Files

- `.env.example` exists at repo root (keys only; no real values).
- `.env.local` and environment-specific `.env.*` files are gitignored.

## Required Environment Variables

These are required (and validated) for local startup:

- `ENVIRONMENT`
- `PUBLIC_SITE_URL`

They are also enforced by the repo’s env contract tooling (`tooling/env-contract/validate.mjs`).

## Local Environment Setup

1. Copy `.env.example` → `.env.local`
2. Fill values (never commit `.env.local`)
3. Run the app:
   - `pnpm dev`

## Startup Validation

The application validates required environment variables at startup and fails fast if any are missing.

Rules:
- Never log secret values
- Errors may list missing key names only

## CI Enforcement

GitHub Actions runs secret scanning on PRs and on `main`.
- PRs fail if a secret is detected.
- CI must not echo environment variables.

## Approved Secret Sources

- Local: `.env.local` (gitignored)
- CI/CD: GitHub Secrets / Environment-scoped secrets

## Incident Procedure

If a secret is committed or exposed:
1. Remove the secret from the repository
2. Rotate the secret immediately
3. Document the incident using `docs/SECURITY_INCIDENT_TEMPLATE.md`
4. Consider history rewrite if required (be explicit in the incident doc)
