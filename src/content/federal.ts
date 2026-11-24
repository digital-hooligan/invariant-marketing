/**
 * Federal & Defense — single source of truth.
 *
 * Both the /federal page and the printable capability statement read from this
 * file so the authoritative content stays in one place and is easy to update.
 *
 * GUARDRAILS:
 * - Keep copy free of implied-autonomy / authority-collapse language
 *   (see scripts/guardrails/authority-keywords.mjs). Use "human review",
 *   "human judgment retained", "surfaces signals", "accountable automation".
 * - Do NOT invent procurement identifiers, certifications, contract vehicles,
 *   past performance, or customers. Unverified fields are set to `null` and
 *   render as "Available on request" until confirmed by the founder.
 */

/** A value that is deliberately not yet published. Renders as "Available on request". */
export const PENDING = null;

export const FEDERAL_COMPANY = {
  legalName: "Digital Hooligan LLC",
  dba: "Invariant",
  classification:
    "Service-Disabled Veteran-Owned Small Business (SDVOSB) · Veteran-Owned Small Business (VOSB)",
  // Owner-confirmed 2026-11-13: SBA SDVOSB certification is current.
  certifications:
    "SBA Certified Service-Disabled Veteran-Owned Small Business (SDVOSB)",
  sba8a: "Application in Progress",
  samStatus: "Registered",
  // Owner-confirmed 2026-11-13 from official records.
  uei: "UDYWXUL6KCY5" as string | null,
  cageCode: "17SY4" as string | null,
  website: "https://digitalhooligan.io",
  contactPath: "/contact",
  linkedIn: "https://www.linkedin.com/company/digital-hooligan-llc/",
} as const;

/** NAICS codes — owner-confirmed 2026-11-13 against the official SBA profile.
 *  Keep in sync with SAM.gov / SBA; do not add codes not on the profile. */
export const FEDERAL_NAICS: ReadonlyArray<{
  code: string;
  title: string;
  primary?: boolean;
}> = [
  {
    code: "541511",
    title: "Custom Computer Programming Services",
    primary: true,
  },
  { code: "541512", title: "Computer Systems Design Services" },
  { code: "541519", title: "Other Computer Related Services" },
  {
    code: "518210",
    title: "Computing Infrastructure Providers, Data Processing & Hosting",
  },
];

/** Finalized one-page capability statement PDF. It is a separately designed
 *  file, not generated from /federal/capability-statement, so the two can
 *  drift — keep their content aligned by hand. Replace the file in place to
 *  keep this public URL stable. Its NAICS codes must match FEDERAL_NAICS. */
export const CAPABILITY_STATEMENT_PDF =
  "/federal/invariant-federal-capability-statement.pdf";

/** Short credential used next to offers. Detailed procurement data lives on /federal. */
export const SDVOSB_SHORT = "SBA-certified SDVOSB";

/** Exact GSA wording — do not paraphrase. */
export const FEDERAL_GSA_STATEMENT =
  "Invariant is available to subcontract under a GSA Schedule prime, subject to the requirements of the opportunity.";

export type CapabilityTier = "lead" | "specialty" | "supporting" | "additional";

export const CAPABILITY_TIER_LABEL: Record<CapabilityTier, string> = {
  lead: "Lead capability",
  specialty: "Specialty",
  supporting: "Supporting capability",
  additional: "Additional",
};

/** Federal positioning — mirrors the finalized capability statement PDF.
 *  Used by /federal and /federal/capability-statement. */
export const FEDERAL_POSITIONING = {
  headline: "Mission systems engineering & federal technology delivery",
  focus: "Systems integration | ICAM/PKI modernization | Technical product delivery",
  summary:
    "Invariant supports federal primes with mission systems engineering, technical integration, product leadership, and applied AI/ML workflow development. We translate operational requirements into scoped work packages, testable acceptance criteria, and documented technical handoffs.",
} as const;

/** Core technical capabilities for the federal pages — mirrors the
 *  finalized capability statement PDF. */
export const FEDERAL_CORE_CAPABILITIES: ReadonlyArray<{
  title: string;
  tier: CapabilityTier;
  body: string;
}> = [
  {
    title: "Technical Project & Product Delivery",
    tier: "lead",
    body: "Requirements baselines, roadmaps, prioritized backlogs, milestones, acceptance criteria, and release readiness — scoped as a defined work package within a prime's statement of work.",
  },
  {
    title: "Systems Engineering & Integration",
    tier: "lead",
    body: "Interface requirements, traceability, integration planning, validation strategy, and structured handoff for mission systems and the applications around them.",
  },
  {
    title: "Applied AI/ML Engineering",
    tier: "supporting",
    body: "AI-enabled workflows, model evaluation, human-review checkpoints, bounded decision support, and auditable outputs — accountable automation, not a replacement for oversight.",
  },
];

/** Prime-ready work packages — mirrors the finalized capability statement
 *  PDF. Illustrative scope, NOT past engagements; always render with
 *  EXAMPLE_LABEL. */
export const FEDERAL_PRIME_WORK_PACKAGES: ReadonlyArray<{
  title: string;
  steps: ReadonlyArray<string>;
}> = [
  {
    title: "01 — Technical project & product delivery",
    steps: [
      "Requirements baseline and prioritized backlog",
      "Milestones and acceptance criteria",
      "Release-readiness plan",
    ],
  },
  {
    title: "02 — Systems integration & validation",
    steps: [
      "Interface mapping and integration risks",
      "Requirements traceability and test plan",
      "Technical handoff",
    ],
  },
  {
    title: "03 — ICAM/PKI modernization support",
    steps: [
      "EJBCA upgrade dependencies",
      "RBAC/ABAC review and identity test cases",
      "Readiness documentation",
    ],
  },
  {
    title: "04 — AI/ML workflow prototype",
    steps: [
      "Defined use case and working prototype",
      "Evaluation metrics and human-review checkpoints",
      "Documented findings",
    ],
  },
];

/** Founder background for the federal pages — wording from the finalized
 *  capability statement PDF. Do not embellish. /company keeps
 *  FOUNDER_EXPERIENCE.bio. */
export const FEDERAL_FOUNDER_BACKGROUND = {
  bio: "Courtez Cannady is a U.S. Marine Corps veteran with experience in RF/SATCOM operations, systems engineering, and technical product management for USMC SATCOM systems. Subsequent professional experience includes DoD ICAM/PKI delivery, EJBCA modernization, identity QA, Army cloud governance, and applied AI/ML workflow development and automation.",
  areas: [
    "USMC RF/SATCOM operations and product management",
    "Systems engineering",
    "DoD ICAM/PKI delivery and EJBCA modernization",
    "Applied AI/ML workflow development",
  ] as const,
};

/** Used by the homepage. The federal pages use FEDERAL_CORE_CAPABILITIES.
 *  Ordered to match the homepage: integration leads, identity is the
 *  specialty, workflow automation supports. */
export const FEDERAL_CAPABILITIES: ReadonlyArray<{
  title: string;
  tier: CapabilityTier;
  body: string;
}> = [
  {
    title: "Application & Data Integration",
    tier: "lead",
    body: "Connect existing applications, services, and data sources. Interface and API work, data mapping and validation, and migration support — delivered with tests and documentation a prime's team can sustain.",
  },
  {
    title: "Identity & Access Integration",
    tier: "specialty",
    body: "ICAM engineering: onboarding applications to existing identity providers, authentication and authorization, role- and attribute-based access, and access testing aligned to enterprise and DoD identity patterns.",
  },
  {
    title: "Workflow Automation",
    tier: "supporting",
    body: "Bounded automation tied to a specific operational process. Explicit scope, defined inputs and outputs, and human review at each checkpoint — accountable automation, not a replacement for oversight.",
  },
  {
    title: "Enterprise Software Engineering",
    tier: "additional",
    body: "Custom application development for regulated environments — architecture, secure coding, testing, deployment, and documentation built to fit existing sustainment processes.",
  },
  {
    title: "Rapid Prototyping & Applied R&D",
    tier: "additional",
    body: "Fast, low-risk prototypes to test technical approaches and de-risk assumptions before full-scale build — proof of feasibility, not throwaway demos.",
  },
];

/** Illustrative work packages Invariant can scope. These are NOT past
 *  engagements and must always render with EXAMPLE_LABEL. */
export const EXAMPLE_LABEL =
  "Example work package — illustrative scope, not a past engagement";

export const FEDERAL_WORK_PACKAGE_EXAMPLES: ReadonlyArray<{
  title: string;
  steps: ReadonlyArray<string>;
}> = [
  {
    title: "Application-to-data integration",
    steps: [
      "Connect an existing application to a defined data source",
      "Map and validate the data against agreed rules",
      "Deliver the integration with automated tests and handoff documentation",
    ],
  },
  {
    title: "Identity provider onboarding",
    steps: [
      "Onboard an application to the program's existing identity provider",
      "Map application roles to identity groups and attributes",
      "Test access for each role and document the configuration",
    ],
  },
];

/** What a prime receives at handoff. */
export const FEDERAL_HANDOFF: ReadonlyArray<string> = [
  "Source code committed to the prime's repository",
  "Automated tests covering the delivered scope",
  "Integration and configuration documentation",
  "A runbook for operating and sustaining the work",
  "A walkthrough with the prime's team",
];

export const FEDERAL_DIFFERENTIATORS: ReadonlyArray<{
  title: string;
  body: string;
}> = [
  {
    title: "DoD ICAM/PKI modernization",
    body: "Enterprise ICAM delivery, EJBCA modernization, RBAC/ABAC requirements, identity QA, and test planning.",
  },
  {
    title: "Technical delivery leadership",
    body: "USMC RF/SATCOM product management, systems engineering, and Army cloud governance experience.",
  },
  {
    title: "Accountable AI prototyping",
    body: "Scoped AI/ML use cases, testable evaluation criteria, human-review gates, and documented findings. Human judgment retained throughout.",
  },
  {
    title: "Built to integrate, not to lock in",
    body: "Clean interfaces, documentation, and handoff so a prime's team can own and sustain the work.",
  },
];

/** Founder background — individual experience, explicitly distinguished from
 *  corporate past performance of Digital Hooligan LLC. */
export const FOUNDER_EXPERIENCE = {
  name: "Courtez Cannady",
  role: "Founder",
  // Founder-approved wording (2026-11-13). Do not embellish.
  bio: "Courtez Cannady is the founder of Invariant and a U.S. Marine Corps veteran. His professional background includes DoD enterprise technology delivery, identity, credential, and access management (ICAM), and C4ISR systems integration.",
  disclaimer:
    "The following reflects the founder's individual professional background. It is not represented as corporate past performance of Digital Hooligan LLC.",
  summary:
    "Invariant is led by a U.S. Marine Corps veteran with professional experience in DoD enterprise technology delivery. That background informs how the company scopes, builds, and sustains technical work for mission environments.",
  areas: [
    "DoD enterprise technology delivery",
    "Identity and access management (ICAM)",
    "C4ISR and systems integration",
    "Software engineering and applied R&D",
  ] as const,
};

export const FEDERAL_TEAMING = {
  intro:
    "Invariant welcomes prime teaming and subcontracting discussions on defined work packages in mission systems engineering, systems integration, ICAM/PKI modernization, technical product delivery, and applied AI/ML. We are an engineering partner — not a commodity staffing provider.",
  items: [
    "Prime-led task orders, embedded support, and scoped SOW subcontracts",
    "Product delivery, systems integration and verification, ICAM QA, and bounded AI/ML pilots",
    "SBIR/STTR feasibility and prototypes where solicitation and teaming rules permit",
    "Work in authorized prime-hosted environments, with safeguarding and access controls per contract",
  ] as const,
  note: FEDERAL_GSA_STATEMENT,
};

/** Target mission areas for teaming — framed as areas of interest, not customers. */
export const FEDERAL_FOCUS_AREAS: ReadonlyArray<string> = [
  "Navy/Marine Corps C4ISR and mission systems",
  "Army modernization",
  "Federal ICAM/PKI",
  "Applied AI/ML",
];
