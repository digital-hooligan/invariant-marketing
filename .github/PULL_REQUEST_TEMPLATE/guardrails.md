<!-- .github/PULL_REQUEST_TEMPLATE/guardrails.md -->

## Guardrails Strict-Mode Checklist (Required)

### Boundary + Separation

- [ ] invariant-marketing does not import, link, or couple to scientia-platform internals.
- [ ] No references to platform internals (foundations/auth/audit/evidence/engine) in marketing code.

### Authority / Implied Autonomy Language

- [ ] No “Implied Autonomy” phrasing (e.g., “autonomous”, “AI decides”, “automatically prioritizes”, “decision engine”).
- [ ] If any line uses `guardrails:allow-authority`, I documented why and requested explicit reviewer sign-off.

### Security + Data Handling

- [ ] No secrets/keys/tokens committed.
- [ ] No PII in logs, tests, or fixtures.

### Verification

- [ ] I ran: `pnpm lint` (or equivalent)
- [ ] I ran: `node scripts/guardrails/cross-repo-imports.mjs`
- [ ] I ran: `node scripts/guardrails/authority-keywords.mjs`
