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

/** Relevant NAICS codes for the company's service lines.
 *  Confirm the final set against the SAM.gov registration before relying on it. */
export const FEDERAL_NAICS: ReadonlyArray<{ code: string; title: string }> = [
  { code: "541511", title: "Custom Computer Programming Services" },
  { code: "541512", title: "Computer Systems Design Services" },
  { code: "541519", title: "Other Computer Related Services" },
  { code: "541715", title: "R&D in the Physical, Engineering & Life Sciences" },
  {
    code: "518210",
    title: "Computing Infrastructure Providers, Data Processing & Hosting",
  },
];

/** Static one-page PDF, regenerated from /federal/capability-statement. */
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

/** Ordered to match the homepage: integration leads, identity is the
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
    title: "Veteran-founded, operator-led",
    body: "Engineering led by a Marine Corps veteran with hands-on experience delivering DoD enterprise technology.",
  },
  {
    title: "Small-team speed, enterprise discipline",
    body: "Scoped engagements with documented decisions, review points, and explicit change control.",
  },
  {
    title: "Accountable AI integration",
    body: "Human judgment retained throughout. We do not build systems that claim to replace human oversight or accountability.",
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
    "Invariant welcomes discussions with prime contractors about defined work packages in application integration, identity and access, and workflow automation. We are an engineering partner — not a commodity staffing provider.",
  items: [
    "Defined work packages within a prime's statement of work",
    "Application and data integration, identity and access integration, and workflow automation",
    "Rapid prototyping and technical feasibility efforts",
    "Subcontracting on DoD and civilian modernization programs",
  ] as const,
  note: FEDERAL_GSA_STATEMENT,
};

/** Target mission areas for teaming — framed as areas of interest, not customers. */
export const FEDERAL_FOCUS_AREAS: ReadonlyArray<string> = [
  "Application and data integration",
  "Identity, credential, and access management (ICAM)",
  "Workflow automation",
  "DoD enterprise modernization",
  "Software engineering",
];
