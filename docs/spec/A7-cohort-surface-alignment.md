# A7 — Cohort Surface Alignment (v0.1)

Track: Gravity (Public Web)

This artifact records the approved relationship between the temporary cohort
campaign surface and the broader long-term public site in this repository.

## Classification

- `/cohort` is a temporary campaign and conversion surface.
- `/cohort` is not the homepage.
- `/cohort` is not the durable public-site architecture.
- `/cohort` does not introduce new infrastructure, shared abstractions, or
  generalized routing.

## Route placement

- Early rollout uses `/cohort` as the dedicated campaign path.
- `/` remains a distinct public-site surface regardless of how much traffic
  lands on `/cohort`.
- No redirect from `/` to `/cohort` is introduced in this ticket.
- The route stays stable at `/cohort`; later lifecycle changes should happen
  through content and traffic shifts rather than route churn.

## CTA relationship

- `/cohort` owns the single primary conversion CTA: `Request Cohort Access` →
  `/contact`.
- `/cohort` may include one low-prominence contextual link back to `/`.
- The broader public site should not duplicate cohort conversion flows.
- Later platform-oriented narrative pages can point toward `/cohort` as the
  canonical cohort conversion endpoint.

## Migration guidance

1. Stage 0: `/cohort` receives most campaign traffic and converts qualified
   interest directly.
2. Stage 1: `/` expands as the broader long-term public site while `/cohort`
   remains the focused cohort endpoint.
3. Stage 2: CTA emphasis can shift from broader-site narrative pages toward
   `/cohort` without changing the `/cohort` route.

## Implementation constraints

- No new design system work.
- No new shared component abstractions.
- No navigation, pseudo-routes, or multi-step funnel behavior on `/cohort`.
- No homepage replacement.
- No architecture beyond the static route and static documentation in this
  ticket.
