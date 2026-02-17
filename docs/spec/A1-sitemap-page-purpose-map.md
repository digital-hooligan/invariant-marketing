# A1 — Sitemap + Page Purpose Map (v1)

Track: Gravity (Public Web)

This artifact defines the v1 sitemap and the purpose/CTA discipline per page. It is implemented directly as Next.js routes and MDX content in this repo.

## Non-negotiable boundary

Public Web is standalone marketing. It does not import/connect/depend on the Scientia Platform repo (no shared auth, DB, audit, evidence/citations, feature flags, observability internals, or engine logic).

## v1 Sitemap (routes to ship)

### Top-level pages

- `/`
- `/platform`
- `/how-it-works`
- `/security`
- `/governance`
- `/solutions`
- `/case-studies`
- `/case-studies/[slug]`
- `/pricing`
- `/company`
- `/contact`

### Legal (hub + subpages)

- `/legal`
- `/legal/terms`
- `/legal/privacy`
- `/legal/disclaimer`

## Nav visibility (v1)

### Top nav

- `/`
- `/platform`
- `/how-it-works`
- `/security`
- `/governance`
- `/solutions`
- `/case-studies`
- `/pricing`

### Footer

- `/company`
- `/contact`
- `/legal`

## Page purpose map (v1)

Primary CTA (site-wide): **Schedule a Strategy Call** → `/contact`  
Secondary CTA (site-wide): **Read Security Posture** → `/security`

| Page                   | Goal                                                   | Primary CTA                         | Secondary CTA                     | Target audience                   | Key message                              | Success criteria                                |
| ---------------------- | ------------------------------------------------------ | ----------------------------------- | --------------------------------- | --------------------------------- | ---------------------------------------- | ----------------------------------------------- |
| `/`                    | Establish promise + credibility quickly                | Schedule a Strategy Call            | Read Security Posture             | Evaluators + operators            | Evidence-first posture; clear boundaries | CTA clicks; progression to Platform/Security    |
| `/platform`            | Define Scientia.io conceptually without layer collapse | Schedule a Strategy Call            | Read Security Posture             | Exec + technical evaluators       | What it is / isn’t                       | Clicks to How-it-works/Security; less confusion |
| `/how-it-works`        | Explain flow + authority boundaries                    | Schedule a Strategy Call            | Read Security Posture             | Operators / technical buyers      | Lifecycle + roles                        | Scroll depth; fewer “how does it work” loops    |
| `/security`            | Publish trust posture + controls                       | Schedule a Strategy Call            | Jump to sections (optional later) | Security/IT + cautious buyers     | Concrete controls & separation           | Lower security friction; conversions            |
| `/governance`          | Explain decision structure + accountability            | Schedule a Strategy Call            | Read Security Posture             | Execs + operators                 | Governance health + defensibility        | Qualified inbound referencing governance        |
| `/solutions`           | Present use cases mapped to constraints/outcomes       | Schedule a Strategy Call            | View Case Studies                 | “Is this for me?” buyers          | Outcomes framed without hype             | Case study clicks; conversion lift              |
| `/case-studies`        | Provide structured proof index                         | Schedule a Strategy Call            | Read Security Posture             | Proof seekers                     | Proof in consistent format               | Detail clicks; assisted conversions             |
| `/case-studies/[slug]` | Provide deep proof per case                            | Schedule a Strategy Call            | View More Case Studies            | Validators                        | Constraints → approach → outcomes        | Completion rate; referral to Contact/Pricing    |
| `/pricing`             | Clarify engagement models                              | Schedule a Strategy Call            | Read Security Posture             | Late-stage buyers                 | Simple, credible packaging               | CTA conversion; reduced bounce                  |
| `/company`             | Establish trust in who/why                             | Schedule a Strategy Call (optional) | Read Governance                   | Trust seekers                     | Digital Hooligan LLC d/b/a Invariant     | Time on page; return to Platform                |
| `/contact`             | Capture and route qualified inbound                    | Submit (“Schedule a Strategy Call”) | Read Security Posture             | Ready-to-talk buyers              | Intentional routing                      | Form quality; reduced spam                      |
| `/legal`               | Compliance hub + navigation                            | —                                   | —                                 | Legal/compliance + cautious users | Canonical legal structure                | Discoverability; low support churn              |
| `/legal/terms`         | Terms                                                  | —                                   | —                                 | Compliance + buyers               | Clear terms                              | Less back-and-forth                             |
| `/legal/privacy`       | Privacy policy                                         | —                                   | —                                 | Everyone                          | Data handling disclosure                 | Reduced privacy questions                       |
| `/legal/disclaimer`    | Disclaimers                                            | —                                   | —                                 | Everyone                          | Clear boundaries                         | Reduced misinterpretation risk                  |
