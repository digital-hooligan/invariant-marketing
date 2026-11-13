import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";
import {
  FEDERAL_CAPABILITIES,
  FEDERAL_COMPANY,
  FEDERAL_DIFFERENTIATORS,
  FEDERAL_FOCUS_AREAS,
  FEDERAL_NAICS,
  FEDERAL_TEAMING,
  FOUNDER_EXPERIENCE,
} from "@/content/federal";

const DESCRIPTION =
  "Digital Hooligan LLC, operating as Invariant, is a veteran-owned software engineering firm supporting federal organizations and prime contractors with custom software, AI-enabled workflow automation, ICAM, systems integration, and applied R&D. Available for teaming and subcontracting.";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Federal & Defense",
} as const;

export const metadata: Metadata = {
  title: "Federal & Defense",
  description: DESCRIPTION,
  alternates: { canonical: "/federal" },
  openGraph: {
    type: "website",
    title: "Federal & Defense — Invariant",
    description: DESCRIPTION,
    url: "/federal",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Federal & Defense — Invariant",
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

/** Render an unverified identifier without fabricating one. */
function orRequest(value: string | null): string {
  return value ?? "Available on request";
}

function Eyebrow({ children }: { children: string }) {
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

export default function FederalPage() {
  return (
    <article className="w-full">
      {/* ── HERO ── */}
      <MkSection>
        <div className="flex flex-col gap-5 max-w-[760px]">
          <Eyebrow>Federal &amp; Defense</Eyebrow>
          <h1
            className="font-semibold leading-[1.08]"
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Federal software engineering &amp; AI integration.
          </h1>
          <p
            className="leading-[1.6] max-w-[68ch]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.9,
            }}
          >
            Digital Hooligan LLC, operating as Invariant, is a veteran-owned
            software engineering firm. We help federal organizations and prime
            contractors solve operational and technical problems — with custom
            software, accountable automation, and secure systems integration
            built for mission environments.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/federal/capability-statement"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms]"
              style={{
                background: "var(--mk-color-cta)",
                color: "var(--mk-color-bg)",
              }}
            >
              View Capability Statement
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] border px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:border-[var(--mk-color-cta)] hover:text-[var(--mk-color-cta)]"
              style={{
                borderColor: "var(--mk-color-border)",
                color: "var(--mk-color-text)",
              }}
            >
              Discuss Teaming
            </Link>
          </div>
        </div>
      </MkSection>

      {/* ── CORE CAPABILITIES ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <div>
            <Eyebrow>Core Capabilities</Eyebrow>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Applied engineering for federal programs
            </h2>
            <p
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Specific technical work packages — scoped, documented, and built
              to integrate with a prime&apos;s existing systems.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEDERAL_CAPABILITIES.map((cap) => (
              <MkCard key={cap.title}>
                <h3
                  className="font-semibold mb-2"
                  style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                >
                  {cap.title}
                </h3>
                <p
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {cap.body}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── RELEVANT EXPERIENCE ── */}
      <MkSection>
        <div className="flex flex-col gap-6 max-w-[760px]">
          <div>
            <Eyebrow>Relevant Experience</Eyebrow>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Founder background
            </h2>
          </div>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.9,
            }}
          >
            {FOUNDER_EXPERIENCE.summary}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FOUNDER_EXPERIENCE.areas.map((area) => (
              <li
                key={area}
                className="flex items-start gap-3 p-4 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <span
                  className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--mk-color-cta)" }}
                />
                <span
                  className="text-sm font-medium leading-[1.5]"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  {area}
                </span>
              </li>
            ))}
          </ul>
          <p
            className="rounded-[var(--mk-radius-md)] border px-4 py-3 text-sm leading-[1.6]"
            style={{
              borderColor: "var(--mk-color-border)",
              background: "var(--mk-color-surface-1)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            <strong style={{ color: "var(--mk-color-text)" }}>Note:</strong>{" "}
            {FOUNDER_EXPERIENCE.disclaimer}
          </p>
        </div>
      </MkSection>

      {/* ── DIFFERENTIATORS ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <div>
            <Eyebrow>Why Invariant</Eyebrow>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Differentiators
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEDERAL_DIFFERENTIATORS.map((d) => (
              <div
                key={d.title}
                className="p-5 rounded-[var(--mk-radius-md)] border"
                style={{
                  borderColor: "var(--mk-color-border)",
                  background: "var(--mk-color-bg)",
                }}
              >
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  {d.title}
                </h3>
                <p
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── TEAMING & SUBCONTRACTING ── */}
      <MkSection>
        <div className="flex flex-col gap-8">
          <div className="max-w-[760px]">
            <Eyebrow>Teaming &amp; Subcontracting</Eyebrow>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              An engineering partner for your team
            </h2>
            <p
              className="mt-3 leading-[1.6]"
              style={{
                fontSize: "var(--mk-type-size-body)",
                color: "var(--mk-color-text)",
                opacity: 0.85,
              }}
            >
              {FEDERAL_TEAMING.intro}
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEDERAL_TEAMING.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 p-4 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <span
                  className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--mk-color-cta)" }}
                />
                <span
                  className="text-sm leading-[1.6]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <p
            className="rounded-[var(--mk-radius-md)] border px-4 py-3 text-sm leading-[1.6] max-w-[760px]"
            style={{
              borderColor: "var(--mk-color-border)",
              background: "var(--mk-color-surface-1)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            {FEDERAL_TEAMING.note}
          </p>

          <div className="flex flex-col gap-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "var(--mk-color-text-muted)",
                fontFamily: "var(--mk-type-font-mono)",
              }}
            >
              Mission areas of interest
            </span>
            <div className="flex flex-wrap gap-2">
              {FEDERAL_FOCUS_AREAS.map((area) => (
                <span
                  key={area}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: "var(--mk-color-border)",
                    color: "var(--mk-color-text-muted)",
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </MkSection>

      {/* ── COMPANY / PROCUREMENT INFORMATION ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <div>
            <Eyebrow>Company Information</Eyebrow>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Procurement snapshot
            </h2>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {[
              { label: "Legal Business Name", value: FEDERAL_COMPANY.legalName },
              { label: "Doing Business As", value: FEDERAL_COMPANY.dba },
              {
                label: "Business Classification",
                value: FEDERAL_COMPANY.classification,
              },
              {
                label: "Certifications",
                value: FEDERAL_COMPANY.certifications,
              },
              { label: "SBA 8(a)", value: FEDERAL_COMPANY.sba8a },
              { label: "SAM.gov", value: `${FEDERAL_COMPANY.samStatus}` },
              { label: "UEI", value: orRequest(FEDERAL_COMPANY.uei) },
              { label: "CAGE Code", value: orRequest(FEDERAL_COMPANY.cageCode) },
            ].map((row) => (
              <div key={row.label} className="flex flex-col gap-1">
                <dt
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {row.label}
                </dt>
                <dd
                  className="font-semibold m-0"
                  style={{ fontSize: "15px", color: "var(--mk-color-text)" }}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-3">
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: "var(--mk-color-text-muted)" }}
            >
              Relevant NAICS Codes
            </span>
            <ul className="flex flex-wrap gap-2">
              {FEDERAL_NAICS.map((n) => (
                <li
                  key={n.code}
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: "var(--mk-color-border)",
                    color: "var(--mk-color-text-muted)",
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{
                      color: "var(--mk-color-link)",
                      fontFamily: "var(--mk-type-font-mono)",
                    }}
                  >
                    {n.code}
                  </span>
                  <span>{n.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MkSection>

      {/* ── CTA ── */}
      <MkSection compact>
        <div className="flex flex-col gap-5 max-w-[620px]">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Request a capability statement or start a teaming conversation.
          </h2>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-small)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            Tell us about the program, the work package, and where Invariant
            could fit. We review every inquiry and respond within 2–3 business
            days.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms]"
              style={{
                background: "var(--mk-color-cta)",
                color: "var(--mk-color-bg)",
              }}
            >
              Start a Conversation
            </Link>
            <Link
              href="/federal/capability-statement"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] border px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:border-[var(--mk-color-cta)] hover:text-[var(--mk-color-cta)]"
              style={{
                borderColor: "var(--mk-color-border)",
                color: "var(--mk-color-text)",
              }}
            >
              View Capability Statement
            </Link>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
