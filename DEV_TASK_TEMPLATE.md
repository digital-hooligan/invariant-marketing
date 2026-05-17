# Dev Task Card Template

Use this template when asking the Dev Agent to implement changes.

---

## Title
Short description of the task.

Example:
Add Generate Brief button to decision header.

---

## Objective
Describe what needs to be implemented and why.

Example:
Add a "Generate Brief" CTA button to the decision detail page that triggers the existing brief generation flow.

---

## Relevant File Paths
List files the agent should inspect first.

Example:

- app/decisions/[id]/page.tsx
- components/decisions/DecisionHeader.tsx

---

## Constraints

- Do not redesign UI
- Reuse existing styles
- Preserve current behavior

---

## Acceptance Criteria

The task is complete when:

- Button appears on decision page
- Button triggers existing brief flow
- No existing behavior breaks

---

## Validation Required

Run these commands if available:

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Notes

Any additional implementation details or context.
