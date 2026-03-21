# Roles and Responsibility Map v1

Track: Internal Workflow Packaging

This document is the founder-review-ready Roles & Responsibility Map for the
current founder-led phase.

## Purpose and operating context

The Roles & Responsibility Map formalizes how the existing Digital Hooligan
custom GPTs collaborate to produce a single execution packet for role ownership
and workflow handoff clarity. The goal is not to create a new organization. The
goal is to make the current founder-led workflow explicit, reviewable, and
repeatable.

## Founder-led operating assumptions

- The founder remains the accountable human owner.
- GPTs structure, draft, validate, and normalize work, but do not replace final
  founder judgment.
- Product & Ops (Launch HQ) conducts the workflow from start to package.
- Systems & Architecture defines the canonical structure.
- C-Suite Command validates founder-operating reality.
- Contracts & Governance is optional and only normalizes wording at the end.
- OpsToys remains the browser tool by name.
- Custos remains Custos as part of Scientia.

## Responsibility map by workflow stage

| Stage | Owner GPT | Objective | Prompt | Artifact produced | Handoff to next owner | Founder checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| Workflow kickoff | Product & Ops (Launch HQ) | Turn the source task into a clear execution sequence. | "Create the Roles & Responsibility Map workflow packet for the current founder-led phase. Make ownership explicit, keep the packet human-readable, assign the downstream GPT owners correctly, and prepare the handoff chain without inventing a staffed team." | `ROLE_MAP_EXECUTION_PLAN.md` | Send execution plan and scope notes to Systems & Architecture. | Founder later confirms the orchestration logic is the right one. |
| Canonical structure definition | Systems & Architecture | Define the authoritative structure for the role map. | "Define the canonical structure for the Roles & Responsibility Map. Specify required sections, stage fields, role definitions, artifact rules, and handoff expectations. Preserve current operating reality and do not introduce new architecture." | `ROLES_RESPONSIBILITY_SPEC_v1.md` | Send canonical spec back to Product & Ops. | Founder later confirms the structure fits the actual way work is run. |
| Draft map assembly | Product & Ops (Launch HQ) | Assemble the full readable draft using the canonical structure. | "Assemble the Roles & Responsibility Map using the execution plan and canonical spec. For each stage, show owner GPT, exact prompt, produced artifact, and next handoff so a human operator can execute the sequence without prior context." | `ROLES_AND_RESPONSIBILITY_MAP_v1.md` | Send the assembled draft to C-Suite Command. | Founder later checks that the map is readable and actionable. |
| Founder-operating validation | C-Suite Command | Validate that the map reflects current founder reality. | "Review the draft map against founder-operating reality. Remove fake delegation, reject implied staffing assumptions, and identify where founder review is still required before execution." | `FOUNDER_REALITY_REVIEW.md` | Return review notes to Product & Ops. | Founder confirms review notes are accurate. |
| Optional governance normalization | Contracts & Governance | Normalize final language only if needed. | "Normalize governance and approval wording only if needed. Do not change workflow logic, ownership, or role boundaries. Keep this as an optional cleanup pass." | `ROLE_MAP_GOVERNANCE_NOTES.md` | Return optional notes to Product & Ops for inclusion. | Founder decides whether optional normalization is needed. |
| Final packaging | Product & Ops (Launch HQ) | Package the final founder review bundle. | "Package the final founder-review-ready bundle. Include the execution plan, canonical spec, founder reality review, optional governance notes if present, and the final role map. Confirm no silent architecture expansion occurred." | Founder review packet | Deliver the complete packet to the founder. | Founder performs final review and approval. |

## Artifact and handoff chain

1. Product & Ops creates the execution plan.
2. Systems & Architecture defines the canonical structure.
3. Product & Ops assembles the full role map.
4. C-Suite Command validates founder reality.
5. Contracts & Governance optionally normalizes language.
6. Product & Ops packages the founder-review-ready bundle.

## Founder review checkpoints

- After reading the canonical structure, confirm it matches the current
  founder-led mode of operation.
- After reading the assembled role map, confirm each stage has the right GPT
  owner and handoff target.
- After reading the founder-reality review, confirm no fake delegation remains.
- Before approval, confirm no silent architecture expansion occurred.

## Constraints and non-goals

- No new architecture
- No future-state org chart
- No invented department staffing
- No renaming of OpsToys
- No renaming of Custos
- No requirement for governance review when optional normalization is enough

## Packaging checklist

The founder-review-ready package consists of:

- `ROLE_MAP_EXECUTION_PLAN.md`
- `ROLES_RESPONSIBILITY_SPEC_v1.md`
- `FOUNDER_REALITY_REVIEW.md`
- `ROLES_AND_RESPONSIBILITY_MAP_v1.md`
- `ROLE_MAP_GOVERNANCE_NOTES.md` if optional normalization is used

If any later change requires new architecture or workflow branching, it must be
stated explicitly with:

- what is needed
- why it is required
- what breaks without it
