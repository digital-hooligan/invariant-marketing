import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { FOUNDER_EXPERIENCE } from "@/content/federal";

const COMPANY_DESCRIPTION =
  "Invariant is led by founder Courtez Cannady, a U.S. Marine Corps veteran. Digital Hooligan LLC is the legal entity; Invariant is its DBA; Hooligan Labs is its product and R&D work.";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Company",
} as const;

export const metadata: Metadata = {
  title: "Company",
  description: COMPANY_DESCRIPTION,
  alternates: { canonical: "/company" },
  openGraph: {
    type: "website",
    title: "Company — Invariant",
    description: COMPANY_DESCRIPTION,
    url: "/company",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Company — Invariant",
    description: COMPANY_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

const ENTITIES = [
  {
    name: "Digital Hooligan LLC",
    role: "Legal entity",
    body: "The company that contracts, holds the federal registrations and certifications, and owns the IP.",
  },
  {
    name: "Invariant",
    role: "DBA",
    body: "The name Digital Hooligan LLC does business under for client and federal work.",
  },
  {
    name: "Hooligan Labs",
    role: "Products & R&D",
    body: "Where the company builds and tests its own products.",
  },
];

const CREDIBILITY = [
  { label: "Legal Entity", value: "Digital Hooligan LLC" },
  { label: "DBA", value: "Invariant" },
  { label: "Ownership", value: "Veteran-owned software company" },
  {
    label: "Federal Contracting",
    value: "SAM.gov Registered · Federal Contracting Ready",
  },
  {
    label: "Certifications",
    value:
      "SBA Certified Service-Disabled Veteran-Owned Small Business (SDVOSB)",
  },
  {
    label: "SBA 8(a)",
    value: "Application in Progress",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs font-semibold uppercase tracking-widest"
      style={{
        color: "var(--mk-color-link)",
        fontFamily: "var(--mk-type-font-mono)",
      }}
    >
      {children}
    </span>
  );
}

export default function CompanyPage() {
  return (
    <article className="w-full">
      {/* ── FOUNDER ── */}
      <MkSection>
        <div className="flex flex-col gap-5 max-w-[720px]">
          <Eyebrow>Company</Eyebrow>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            {FOUNDER_EXPERIENCE.name}, {FOUNDER_EXPERIENCE.role}
          </h1>
          <p
            className="leading-[1.6] pl-5"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.9,
              borderLeft: "2px solid var(--mk-color-cta)",
            }}
          >
            {FOUNDER_EXPERIENCE.bio}
          </p>
          <p
            className="text-sm leading-[1.6]"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            {FOUNDER_EXPERIENCE.disclaimer}
          </p>
        </div>
      </MkSection>

      {/* ── STRUCTURE (CONDENSED) ── */}
      <MkSection tone="surface-1" compact>
        <div className="flex flex-col gap-6 max-w-[760px]">
          <div>
            <Eyebrow>Structure</Eyebrow>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              One company, three names
            </h2>
            <p
              className="mt-2 leading-[1.6]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              When you work with Invariant, you are contracting with Digital
              Hooligan LLC.
            </p>
          </div>
          <dl className="flex flex-col gap-3">
            {ENTITIES.map((e) => (
              <div
                key={e.name}
                className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-4 py-3 border-t"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <dt className="flex flex-col">
                  <span
                    className="font-semibold"
                    style={{ fontSize: "15px", color: "var(--mk-color-text)" }}
                  >
                    {e.name}
                  </span>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-widest"
                    style={{
                      color: "var(--mk-color-link)",
                      fontFamily: "var(--mk-type-font-mono)",
                    }}
                  >
                    {e.role}
                  </span>
                </dt>
                <dd
                  className="m-0 text-sm leading-[1.6]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {e.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </MkSection>

      {/* ── PRODUCT WORK VS. FOUNDER EXPERIENCE ── */}
      <MkSection compact>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <Eyebrow>Company product work</Eyebrow>
            <p
              className="text-sm leading-[1.65]"
              style={{ color: "var(--mk-color-text-muted)" }}
            >
              Invariant has built and shipped its own products:{" "}
              <a
                href="https://scientiaos.io/slack"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--mk-color-link)" }}
              >
                Scientia for Slack
              </a>{" "}
              (available to approved pilot workspaces) and{" "}
              <a
                href="https://syntaxed.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--mk-color-link)" }}
              >
                Syntaxed
              </a>
              . Earlier-stage work is on{" "}
              <Link href="/labs" style={{ color: "var(--mk-color-link)" }}>
                Hooligan Labs
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow>Founder experience</Eyebrow>
            <p
              className="text-sm leading-[1.65]"
              style={{ color: "var(--mk-color-text-muted)" }}
            >
              DoD enterprise technology and identity experience described on
              this site belongs to the founder as an individual. It is not
              represented as corporate federal past performance of Digital
              Hooligan LLC.
            </p>
          </div>
        </div>
      </MkSection>

      {/* ── COMPANY STATUS ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Company status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {CREDIBILITY.map((row) => (
              <div key={row.label} className="flex flex-col gap-1">
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {row.label}
                </span>
                <span
                  className="font-semibold"
                  style={{ fontSize: "15px", color: "var(--mk-color-text)" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/federal"
            className="inline-flex items-center gap-1 text-sm font-semibold no-underline hover:underline"
            style={{ color: "var(--mk-color-link)" }}
          >
            UEI, CAGE, NAICS, and teaming details on Federal
            <span aria-hidden>→</span>
          </Link>
        </div>
      </MkSection>

      {/* ── CTA ── */}
      <MkSection compact>
        <div className="flex flex-col gap-5 max-w-[560px]">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Work with Invariant
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:bg-[var(--mk-color-cta-hover)]"
              style={{
                background: "var(--mk-color-cta)",
                color: "var(--mk-color-bg)",
              }}
            >
              Start a Conversation
            </Link>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/digital-hooligan-llc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Digital Hooligan on LinkedIn"
                className="text-sm hover:underline no-underline"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/DHooliganIO"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Digital Hooligan on X"
                className="text-sm hover:underline no-underline"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
