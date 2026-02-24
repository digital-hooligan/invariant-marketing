# Implementation Diff Summary — E1 Guardrails Enforcement (v0.7)

## Scope

Adds deterministic enforcement aligned to E1:

- CI fails on prohibited patterns (boundary + reach-through + authority-collapse indicators)
- PR template includes Guardrails v0.7 compliance checklist
- Invariant tests validate that enforcement detects violations

## Changes Added

### CI Enforcement

- Added `.github/workflows/guardrails-e1-enforcement.yml`
  - Runs on PRs to `main` and pushes to `main`
  - Executes:
    - `node scripts/guardrails/scan-prohibited-patterns.mjs`
    - `node --test scripts/guardrails/tests/*.test.mjs`

### Prohibited Pattern Scanner

- Added `scripts/guardrails/scan-prohibited-patterns.mjs`
  - Cross-repo coupling hard-fail:
    - `invariant-marketing` may not reference `scientia-platform` or platform-internal packages
  - Reach-through persistence hard-fail:
    - Denies `@scientia/db`, `@radixos/db`, `@solum/db` imports anywhere in marketing repo
  - Authority-collapse guard for public copy:
    - Keyword-based detection in `content/`, `docs/`, and `*.md(x)` sources

### Invariant Violation Tests

- Added `scripts/guardrails/tests/e1-invariants.test.mjs`
  - Proof tests for:
    - cross-repo coupling detection
    - authority-collapse phrase detection in docs/content

### PR Template

- Added `.github/pull_request_template.md` referencing Guardrails v0.7

## Operational Result

- Boundary violations become unmergeable (CI gate)
- Marketing copy is protected from implying system advisory/execution authority
