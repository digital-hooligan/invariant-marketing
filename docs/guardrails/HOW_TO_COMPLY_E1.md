# How to Comply — E1 Guardrails Enforcement (v0.7)

## What E1 Enforces

E1 turns governance constraints into build-failing checks:

- Marketing repo must never import/connect to platform internals
- No platform DB/persistence client references
- Marketing copy must not claim system advisory/execution authority

## Run Locally

From repo root:

```bash
pnpm run guardrails:e1
pnpm run guardrails:e1:test
```
