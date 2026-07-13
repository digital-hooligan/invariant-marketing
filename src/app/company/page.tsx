import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";

const COMPANY_DESCRIPTION =
  "Digital Hooligan LLC is the legal entity behind Invariant, a studio identity focused on applied systems design, decision architecture, workflow implementation, and operational tooling.";

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

type LabProduct = { name: string; tag: string; href: string | null };

const SHIPPED_PRODUCTS: LabProduct[] = [
  { name: "Syntaxed", tag: "Release confidence", href: "https://syntaxed.io" },
  {
    name: "Scientia for Slack",
    tag: "Decision capture",
    href: "https://scientiaos.io/slack",
  },
];

const EARLY_ACCESS_PRODUCTS: LabProduct[] = [
  { name: "PennyWize", tag: "Financial signal", href: "https://www.pennywize.ai/" },
];

const IN_DEVELOPMENT_PRODUCTS: LabProduct[] = [
  { name: "OpsToys", tag: "Operator utilities", href: null },
  { name: "HypeWatch", tag: "Trend radar", href: null },
];

function ProductChip({ p }: { p: LabProduct }) {
  const inner = (
    <>
      <span
        className="font-semibold"
        style={{ fontSize: "15px", color: "var(--mk-color-text)" }}
      >
        {p.name}
        {p.href && <span className="ml-1 text-xs opacity-60">↗</span>}
      </span>
      <span
        className="text-[11px] font-semibold mt-0.5"
        style={{
          color: "var(--mk-color-link)",
          fontFamily: "var(--mk-type-font-mono)",
          opacity: 0.8,
        }}
      >
        {p.tag}
      </span>
    </>
  );

  return p.href ? (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-[var(--mk-radius-md)] border flex flex-col gap-0.5 no-underline hover:border-[var(--mk-color-link)] transition-colors duration-[120ms]"
      style={{ borderColor: "var(--mk-color-border)" }}
    >
      {inner}
    </a>
  ) : (
    <div
      className="p-4 rounded-[var(--mk-radius-md)] border flex flex-col gap-0.5"
      style={{ borderColor: "var(--mk-color-border)" }}
    >
      {inner}
    </div>
  );
}

const FOCUS_AREAS = [
  "Applied systems design",
  "Decision architecture",
  "Workflow implementation",
  "Operational experimentation",
  "Internal tooling",
  "Applied AI with human judgment retained",
];

const CREDIBILITY = [
  { label: "Legal Entity", value: "Digital Hooligan LLC" },
  { label: "DBA", value: "Invariant" },
  { label: "Ownership", value: "Veteran-owned software company" },
  {
    label: "Federal Contracting",
    value: "SAM.gov Registered · Federal Contracting Ready",
  },
  { label: "Certifications", value: "SBA Certified SDVOSB · SBA Certified VOSB" },
  {
    label: "SBA 8(a)",
    value: "Application in Progress",
  },
];

export default function CompanyPage() {
  return (
    <article className="w-full">
      {/* ── HERO ── */}
      <MkSection>
        <div className="flex flex-col gap-5 max-w-[720px]">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-link)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Company
          </span>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            The studio and legal entity behind the work.
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Digital Hooligan LLC is the legal company behind Invariant — a
            studio identity focused on applied systems design, decision
            architecture, workflow implementation, and operational tooling for
            founders, operators, and mission-adjacent organizations.
          </p>
        </div>
      </MkSection>

      {/* ── STRUCTURE ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <div>
            <h2
              className="font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              How the company is structured
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Three layers. One operating team. Distinct purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                tag: "Legal Entity",
                name: "Digital Hooligan LLC",
                body: "Legal parent company. Contracts and operates the studio work. Owns the intellectual property developed through company initiatives and provides the legal and operational foundation for all engagements.",
                tagColor: "var(--mk-color-link)",
              },
              {
                tag: "Commercial Studio / DBA",
                name: "Invariant",
                body: "DBA and studio identity used for public marketing, systems work, and client-facing engagements. When you work with Invariant, you’re contracting with Digital Hooligan LLC.",
                tagColor: "var(--mk-color-link)",
              },
              {
                tag: "Product & R&D",
                name: "Hooligan Labs",
                body: "Product and R&D ecosystem for internal products, experiments, and software surfaces. Hooligan Labs builds tools and platforms for operators — by operators.",
                tagColor: "var(--mk-color-link)",
              },
            ].map((card) => (
              <MkCard key={card.name}>
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{
                    color: card.tagColor,
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  {card.tag}
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                >
                  {card.name}
                </h3>
                <p
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {card.body}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── WHAT INVARIANT FOCUSES ON ── */}
      <MkSection>
        <div className="flex flex-col gap-8">
          <div>
            <h2
              className="font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              What Invariant focuses on
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Applied systems work across the full product and operations surface.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FOCUS_AREAS.map((area) => (
              <div
                key={area}
                className="flex items-start gap-3 p-4 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <span
                  className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--mk-color-cta)" }}
                />
                <span
                  className="text-sm font-medium leading-[1.5]"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── MISSION ── */}
      <MkSection tone="surface-1" compact>
        <div className="flex flex-col gap-5 max-w-[720px]">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Direction
          </h2>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.9,
            }}
          >
            Most software problems are operations problems in disguise. Tools
            don&apos;t fix unclear ownership, undefined scope, or broken
            handoffs. Execution-grade software does — because it&apos;s built
            with operator constraints in mind, not hypothetical futures.
          </p>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.8,
            }}
          >
            The goal is to help organizations build systems where decisions stay
            understandable, traceable, and accountable over time.
          </p>
        </div>
      </MkSection>

      {/* ── HOOLIGAN LABS ── */}
      <MkSection>
        <div className="flex flex-col gap-8">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "var(--mk-color-link)",
                fontFamily: "var(--mk-type-font-mono)",
              }}
            >
              Hooligan Labs
            </span>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Products built on the same discipline
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Every product in Hooligan Labs exists because an operator problem
              was too good not to solve.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{
                  color: "var(--mk-color-text-muted)",
                  fontFamily: "var(--mk-type-font-mono)",
                }}
              >
                Shipped
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SHIPPED_PRODUCTS.map((p) => (
                  <ProductChip key={p.name} p={p} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{
                  color: "var(--mk-color-text-muted)",
                  fontFamily: "var(--mk-type-font-mono)",
                }}
              >
                Early access
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {EARLY_ACCESS_PRODUCTS.map((p) => (
                  <ProductChip key={p.name} p={p} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{
                  color: "var(--mk-color-text-muted)",
                  fontFamily: "var(--mk-type-font-mono)",
                }}
              >
                In development
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {IN_DEVELOPMENT_PRODUCTS.map((p) => (
                  <ProductChip key={p.name} p={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </MkSection>

      {/* ── FOUNDER ── */}
      <MkSection tone="surface-1" compact>
        <div className="max-w-[680px]">
          <span
            className="text-xs uppercase tracking-widest"
            style={{
              color: "var(--mk-color-text-muted)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Founder
          </span>
          <blockquote
            className="mt-4 pl-6"
            style={{ borderLeft: "2px solid var(--mk-color-cta)" }}
          >
            <p
              className="leading-[1.7]"
              style={{
                fontSize: "var(--mk-type-size-body)",
                color: "var(--mk-color-text)",
                opacity: 0.9,
              }}
            >
              I built Digital Hooligan because I understand what it means to
              operate under mission pressure with imperfect tools and ambiguous
              requirements. Invariant exists to turn that kind of chaos into
              working systems — built fast, built right, built to hold up.
            </p>
          </blockquote>
        </div>
      </MkSection>

      {/* ── CREDIBILITY ── */}
      <MkSection>
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
        </div>
      </MkSection>

      {/* ── CTA ── */}
      <MkSection tone="surface-1" compact>
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
          <p
            style={{
              fontSize: "var(--mk-type-size-small)",
              color: "var(--mk-color-text-muted)",
              lineHeight: "1.6",
            }}
          >
            We take on scoped engagements for founders, operators, and
            mission-adjacent organizations. Start with a conversation.
          </p>
          <div className="flex flex-wrap items-center gap-4">
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
