# AI Development Workflow

This repository uses an AI Dev Agent to assist with implementation tasks.

The founder remains the architect and final reviewer.

---

# Development Loop

1. Founder writes a task card
2. Dev Agent inspects the repository
3. Dev Agent creates a feature branch
4. Dev Agent implements the change
5. Dev Agent runs validation commands
6. Dev Agent returns a PR-ready summary
7. Founder reviews changes before merge

---

# Branch Workflow

All work must occur in a feature branch.

Allowed branch prefixes:

feat/
fix/
chore/
refactor/

Example:

feat/add-brief-generator

---

# Validation

Before presenting work for review the agent should run:

```bash
npm run lint
npm run typecheck
npm run build
```

If any command fails, the agent must report the failure.

---

# Safety Rules

The Dev Agent must never:

- Merge branches
- Deploy code
- Modify infrastructure
- Introduce unrelated refactors

All merges are founder-approved.

---

# Purpose

The Dev Agent accelerates implementation while keeping:

- clear diffs
- safe refactors
- predictable builds
- reviewable changes
