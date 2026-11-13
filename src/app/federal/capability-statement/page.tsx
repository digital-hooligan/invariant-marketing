import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { PrintButton } from "./PrintButton";
import {
  FEDERAL_CAPABILITIES,
  FEDERAL_COMPANY,
  FEDERAL_DIFFERENTIATORS,
  FEDERAL_NAICS,
  FEDERAL_TEAMING,
  FOUNDER_EXPERIENCE,
} from "@/content/federal";

const DESCRIPTION =
  "Federal capability statement for Digital Hooligan LLC d/b/a Invariant — a veteran-owned software engineering firm available for federal teaming and subcontracting.";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Federal Capability Statement",
} as const;

export const metadata: Metadata = {
  title: "Capability Statement",
  description: DESCRIPTION,
  alternates: { canonical: "/federal/capability-statement" },
  openGraph: {
    type: "website",
    title: "Capability Statement — Invariant",
    description: DESCRIPTION,
    url: "/federal/capability-statement",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capability Statement — Invariant",
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

function orRequest(value: string | null): string {
  return value ?? "Available on request";
}

function Heading({ children }: { children: string }) {
  return (
    <h2
      className="cap-heading text-xs font-semibold uppercase tracking-widest mb-2"
      style={{
        color: "var(--mk-color-link)",
        fontFamily: "var(--mk-type-font-mono)",
      }}
    >
      {children}
    </h2>
  );
}

export default function CapabilityStatementPage() {
  return (
    <MkSection>
      {/* Screen-only toolbar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-link)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Capability Statement
          </span>
          <p
            className="text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            Use the button to save as PDF or print.{" "}
            <Link href="/federal" style={{ color: "var(--mk-color-link)" }}>
              Back to Federal &amp; Defense
            </Link>
          </p>
        </div>
        <PrintButton />
      </div>

      {/* The printable document */}
      <div
        className="cap-statement rounded-[var(--mk-radius-lg)] border p-6 sm:p-8"
        style={{
          borderColor: "var(--mk-color-border)",
          background: "var(--mk-color-surface-1)",
        }}
      >
        {/* Masthead */}
        <header
          className="cap-masthead flex flex-col gap-2 pb-5 mb-6 border-b"
          style={{ borderColor: "var(--mk-color-border)" }}
        >
          <h1
            className="font-semibold leading-[1.15]"
            style={{ fontSize: "24px", color: "var(--mk-color-text)" }}
          >
            Digital Hooligan LLC{" "}
            <span style={{ color: "var(--mk-color-text-muted)" }}>
              d/b/a Invariant
            </span>
          </h1>
          <p
            className="font-semibold"
            style={{ fontSize: "14px", color: "var(--mk-color-cta)" }}
          >
            Federal Capability Statement
          </p>
          <p className="text-sm" style={{ color: "var(--mk-color-text-muted)" }}>
            {FEDERAL_COMPANY.classification}
          </p>
        </header>

        <div className="cap-grid grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
          {/* Core competencies */}
          <section>
            <Heading>Core Competencies</Heading>
            <ul className="flex flex-col gap-1.5">
              {FEDERAL_CAPABILITIES.map((cap) => (
                <li
                  key={cap.title}
                  className="text-sm leading-[1.5]"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  <span className="font-semibold">{cap.title}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Differentiators */}
          <section>
            <Heading>Differentiators</Heading>
            <ul className="flex flex-col gap-1.5">
              {FEDERAL_DIFFERENTIATORS.map((d) => (
                <li
                  key={d.title}
                  className="text-sm leading-[1.45]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: "var(--mk-color-text)" }}
                  >
                    {d.title}.
                  </span>{" "}
                  {d.body}
                </li>
              ))}
            </ul>
          </section>

          {/* Relevant experience */}
          <section>
            <Heading>Relevant Experience</Heading>
            <p
              className="text-sm leading-[1.5] mb-2"
              style={{ color: "var(--mk-color-text-muted)" }}
            >
              {FOUNDER_EXPERIENCE.summary}
            </p>
            <ul className="flex flex-col gap-1">
              {FOUNDER_EXPERIENCE.areas.map((area) => (
                <li
                  key={area}
                  className="text-sm leading-[1.4]"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  • {area}
                </li>
              ))}
            </ul>
            <p
              className="text-[11px] leading-[1.5] mt-2 italic"
              style={{ color: "var(--mk-color-text-muted)" }}
            >
              {FOUNDER_EXPERIENCE.disclaimer}
            </p>
          </section>

          {/* Federal teaming */}
          <section>
            <Heading>Federal Teaming Focus</Heading>
            <ul className="flex flex-col gap-1">
              {FEDERAL_TEAMING.items.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-[1.4]"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  • {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Company data */}
        <section
          className="cap-data mt-7 pt-6 border-t"
          style={{ borderColor: "var(--mk-color-border)" }}
        >
          <Heading>Company Data</Heading>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {[
              { label: "Legal Business Name", value: FEDERAL_COMPANY.legalName },
              { label: "DBA", value: FEDERAL_COMPANY.dba },
              {
                label: "Certifications",
                value: FEDERAL_COMPANY.certifications,
              },
              {
                label: "SBA 8(a)",
                value: FEDERAL_COMPANY.sba8a,
              },
              { label: "SAM.gov", value: FEDERAL_COMPANY.samStatus },
              { label: "UEI", value: orRequest(FEDERAL_COMPANY.uei) },
              { label: "CAGE Code", value: orRequest(FEDERAL_COMPANY.cageCode) },
              {
                label: "NAICS",
                value: FEDERAL_NAICS.map((n) => n.code).join(", "),
              },
              {
                label: "Website",
                value: "digitalhooligan.io",
              },
            ].map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5">
                <dt
                  className="text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {row.label}
                </dt>
                <dd
                  className="font-semibold m-0 leading-[1.4]"
                  style={{ fontSize: "13px", color: "var(--mk-color-text)" }}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Contact footer */}
        <footer
          className="cap-contact mt-6 pt-5 border-t flex flex-wrap items-center gap-x-6 gap-y-2"
          style={{ borderColor: "var(--mk-color-border)" }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-text-muted)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Contact
          </span>
          <span className="text-sm" style={{ color: "var(--mk-color-text)" }}>
            Teaming &amp; capability inquiries:{" "}
            <a href={FEDERAL_COMPANY.website + FEDERAL_COMPANY.contactPath}>
              digitalhooligan.io/contact
            </a>
          </span>
          <a href={FEDERAL_COMPANY.linkedIn} className="text-sm">
            LinkedIn
          </a>
        </footer>
      </div>
    </MkSection>
  );
}
