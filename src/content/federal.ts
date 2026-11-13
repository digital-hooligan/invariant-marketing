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
  // Mirrors the owner-confirmed wording already published on the home, company,
  // and footer surfaces. Do not alter without founder confirmation.
  certifications: "SBA Certified SDVOSB · SBA Certified VOSB",
  sba8a: "Application in Progress",
  samStatus: "Registered",
  // Unverified identifiers — not present anywhere in the repo. Fill in when
  // confirmed from SAM.gov / official records.
  uei: PENDING as string | null,
  cageCode: PENDING as string | null,
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

export const FEDERAL_CAPABILITIES: ReadonlyArray<{
  title: string;
  body: string;
}> = [
  {
    title: "Enterprise Software Engineering",
    body: "Custom application development for complex, regulated environments — architecture, secure coding, testing, deployment, and documentation built to integrate with existing enterprise systems and sustainment processes.",
  },
  {
    title: "AI-Enabled Workflow Automation",
    body: "Bounded automation and applied AI tied to specific operational problems. Explicit scope, defined inputs and outputs, and human review at each checkpoint — accountable automation, not a replacement for oversight.",
  },
  {
    title: "Identity & Access Management",
    body: "ICAM engineering: authentication, authorization, directory integration, role- and attribute-based access control, and credential lifecycle work aligned to enterprise and DoD identity patterns.",
  },
  {
    title: "Enterprise Systems Integration",
    body: "Connect disparate systems, services, and data sources into coherent workflows. Interface design, middleware, and migration support that reduces coupling instead of adding it.",
  },
  {
    title: "API & Data Integration",
    body: "API design and development, data pipelines, and data engineering that move and reconcile information reliably across system and organizational boundaries.",
  },
  {
    title: "Rapid Prototyping & Applied R&D",
    body: "Fast, low-risk prototypes to test technical approaches and de-risk assumptions before full-scale build — proof of feasibility, not throwaway demos.",
  },
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
    "Invariant welcomes discussions with prime contractors about defined engineering work packages, specialized technical support, rapid prototyping, and subcontracting on federal programs. We are an engineering partner — not a commodity staffing provider.",
  items: [
    "Defined engineering work packages within a prime's scope of work",
    "Specialized technical support: software engineering, ICAM, integration, data, and applied AI",
    "Rapid prototyping and technical feasibility efforts",
    "Subcontracting on DoD enterprise modernization, AI integration, and software programs",
  ] as const,
  // Clarifies a common misconception for small-business teaming reps.
  note: "Teaming with Invariant does not require Invariant to hold its own GSA Schedule or prime contract vehicle. We participate as a subcontractor on an established contractor's team.",
};

/** Target mission areas for teaming — framed as areas of interest, not customers. */
export const FEDERAL_FOCUS_AREAS: ReadonlyArray<string> = [
  "DoD enterprise modernization",
  "AI integration and workflow automation",
  "Software engineering",
  "Identity, credential, and access management (ICAM)",
  "Data systems and integration",
];
