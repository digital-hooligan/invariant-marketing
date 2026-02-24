# Guardrails v0.7 — PR Checklist (E1 Enforcement)

References:

- E1 — Guardrails Enforcement Spec v0.7
- Guardrails Ops Rollout Pack v0.7 (checklists + cadence + incident triggers)
- Governance Appendix (Ownership + Change Control + Exception Process)
- IP Classification + Boundary Enforcement Clauses

## Summary

- What changed:
- Why it changed:
- Verification steps:

## Track + RadixOS Mapping

- Track: Gravity / OpsOS Platform / Both
- RadixOS Objects touched: WorkItem / Decision / Incident / HealthCheck / Cadence (list)

## E1 Build-Time Guards (Must Pass)

- [ ] No cross-repo coupling (marketing ↔ platform)
- [ ] No reach-through persistence patterns (no platform runtime coupling)
- [ ] No authority origination language leaks (marketing copy must not imply system authority)
- [ ] No importing platform internals (foundations/auth/audit/evidence/engine/feature-flags)

## Marketing Boundary Rule (Non-Negotiable)

- [ ] `invariant-marketing` does NOT import/connect to `scientia-platform` foundations, auth, DB, audit, evidence/citations, feature flags, observability internals, or engine logic.

## Security / Data Handling

- [ ] No secrets committed (keys, tokens, `.env`)
- [ ] No PII in logs/content

## Reviewer Gate

- [ ] Reviewer confirmed E1 checks + checklist items above
