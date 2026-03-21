# Roles & Responsibility Spec v1

Track: Internal Workflow Packaging

This is the canonical structure definition for the Roles & Responsibility Map in
the current founder-led phase.

## Scope

- Define roles as they operate now, not as a future org chart.
- Clarify workflow ownership across the existing Digital Hooligan custom GPTs.
- Produce a structure that can be reviewed by a human operator without prior
  context.
- Preserve current operating reality: founder-led, tool-assisted, low-headcount.

## Canonical document structure

The final role-map artifact must contain these sections in this order:

1. Purpose and operating context
2. Founder-led operating assumptions
3. Role inventory
4. Responsibility map by workflow stage
5. Artifact and handoff chain
6. Founder review checkpoints
7. Constraints and non-goals

## Canonical role inventory

### Founder

- Final reviewer and decision authority
- Approves operating logic, role boundaries, and execution readiness
- Remains the accountable human owner even when GPTs perform drafting or review

### Product & Ops (Launch HQ)

- Workflow conductor
- Converts the source task into an ordered execution sequence
- Packages the final review-ready workflow packet
- Owns cross-step continuity and human readability

### Systems & Architecture

- Defines the canonical role-map shape
- Establishes section structure, ownership rules, and artifact requirements
- Guards against unsupported workflow branches or invented operating layers

### C-Suite Command

- Validates whether the mapped responsibilities match founder-operating reality
- Rejects unrealistic delegation or implied executive staffing
- Marks founder review gates that still require direct human judgment

### Contracts & Governance

- Optional final normalization pass only
- Tightens language around review boundaries, approvals, and governance posture
- Does not redefine the workflow or reassign ownership

## Canonical workflow-stage fields

Every workflow stage in the final role map must include:

- `Stage`
- `Owner GPT`
- `Objective`
- `Prompt`
- `Artifact produced`
- `Handoff to next owner`
- `Founder checkpoint`

## Canonical artifact rules

- Artifacts must be named explicitly and be easy to read in sequence.
- Each artifact must state what it received and what it hands forward.
- Each artifact must preserve current naming:
  - `OpsToys` for the browser tool
  - `Custos` for the Scientia execution instrumentation layer
- Artifacts must not imply staffed departments where none currently exist.

## Founder-led phase assumptions

- The founder is still the real integrator across strategy, operations, and
  approval.
- Custom GPTs support framing, structure, and review, but do not replace final
  human accountability.
- Handoffs are documentation handoffs, not autonomous org-to-org transfers.
- Review gates remain lightweight and practical rather than enterprise-heavy.

## Non-goals

- No future-state headcount planning
- No RACI expansion beyond what this workflow needs
- No system redesign
- No new Scientia or public-web architecture
- No browser-tool renaming

## Quality bar

The final role map is acceptable only if:

- a human can read it cold and follow the workflow
- each stage has one clear GPT owner
- each stage names its output artifact
- each handoff names the next owner
- founder review checkpoints are obvious
- the packet stays grounded in the current founder-led phase
