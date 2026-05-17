# Roles & Responsibility Map Execution Plan

Track: Internal Workflow Packaging

This document formalizes the ordered custom-GPT workflow for producing a
founder-review-ready Roles & Responsibility Map packet.

## Purpose

- Make GPT ownership explicit instead of implied across screenshots or separate
  ATLAS conversations.
- Show the exact handoff chain from workflow setup through founder review.
- Keep execution realistic for the current founder-led phase.
- Prevent silent architecture expansion during packaging.

## Operating constraints

- **Product & Ops (Launch HQ)** is the workflow conductor.
- **Systems & Architecture** defines the canonical role-map structure.
- **C-Suite Command** validates founder-operating reality.
- **Contracts & Governance** is optional and only normalizes the final package.
- **OpsToys** remains the separate browser tool in browser-tool references.
- **Custos** remains **Custos** as part of Scientia.
- The packet must not assume a staffed org that does not exist yet.
- The packet must not introduce new system architecture, product scope, or team
  layers outside this task.

## Ordered workflow

| Step | GPT owner | Prompt | Artifact produced | Next handoff |
| --- | --- | --- | --- | --- |
| 1 | Product & Ops (Launch HQ) | "Run the Roles & Responsibility Map workflow. Gather the current founder-led operating context, keep the work human-readable, and prepare the execution packet for the downstream GPTs. Treat Systems & Architecture as the source of canonical structure, C-Suite Command as founder-reality validator, Contracts & Governance as optional final normalization only. Do not invent a staffed team. Keep OpsToys labeled as the browser tool and keep Custos named as part of Scientia." | `ROLE_MAP_EXECUTION_PLAN.md` | Hand off the operating context, scope, and packet checklist to Systems & Architecture. |
| 2 | Systems & Architecture | "Define the canonical Roles & Responsibility Map structure for the current founder-led phase. Specify the role-map sections, role definitions, ownership model, artifact format, and handoff requirements. Preserve existing reality, avoid future-state org design, and do not introduce new architecture." | `ROLES_RESPONSIBILITY_SPEC_v1.md` | Hand off the canonical structure and role-map template to Product & Ops for assembly. |
| 3 | Product & Ops (Launch HQ) | "Using the execution plan and the canonical spec, assemble the first complete Roles & Responsibility Map draft. Assign the correct GPT owner to each workflow stage, show what each stage produces, and package the artifact so a human operator can follow it without prior context." | `ROLES_AND_RESPONSIBILITY_MAP_v1.md` | Hand off the assembled draft to C-Suite Command for founder-reality review. |
| 4 | C-Suite Command | "Review the Roles & Responsibility Map as the founder-operating reality validator. Confirm that the map matches how the founder actually operates now, flag any implied staffing assumptions, remove fake delegation, and identify where founder review is still required before execution." | `FOUNDER_REALITY_REVIEW.md` | Hand off the reviewed package back to Product & Ops for final packaging, with optional escalation to Contracts & Governance only if normalization is needed. |
| 5 | Contracts & Governance (optional) | "Perform a final normalization pass on the approved role-map package only if language or governance framing needs cleanup. Do not change ownership, workflow logic, or operating reality. Normalize terminology, approval boundaries, and review notes only." | `ROLE_MAP_GOVERNANCE_NOTES.md` | Hand off optional normalization notes to Product & Ops for inclusion in the final review packet. |
| 6 | Product & Ops (Launch HQ) | "Package the founder-review-ready Roles & Responsibility Map packet. Include the execution plan, canonical spec, founder-reality review, optional governance notes if they exist, and the final role map. Confirm no silent architecture expansion occurred." | Final founder review packet | Deliver to founder for review. |

## Handoff payload requirements

Each handoff must include:

- The source artifact from the previous step
- A one-paragraph summary of what changed
- Open questions that still require founder review
- Explicit note of anything intentionally deferred
- Explicit statement that no new architecture was introduced

## Packaging instructions

The final founder-review-ready package must include at minimum:

- `ROLE_MAP_EXECUTION_PLAN.md`
- `ROLES_RESPONSIBILITY_SPEC_v1.md`
- `FOUNDER_REALITY_REVIEW.md`
- `ROLES_AND_RESPONSIBILITY_MAP_v1.md`

Optional:

- `ROLE_MAP_GOVERNANCE_NOTES.md`

## Dev Agent guardrail

The Dev Agent may package, clarify, and normalize the workflow artifacts in this
ticket, but may not silently expand architecture.

If an addition is truly required, the Dev Agent must state:

- what is needed
- why it is required
- what breaks without it

Without that explicit statement, no new architecture, staffing model, system
layer, or workflow branch may be introduced.
