import Link from "next/link";
import type { Metadata } from "next";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — execution-grade software systems",
} as const;

export const metadata: Metadata = {
  title: "Invariant — Execution-grade software systems",
  description:
    "Digital Hooligan LLC dba Invariant builds SaaS products, automation workflows, internal tools, and operational intelligence platforms for founders, operators, and mission-adjacent teams.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Invariant — Execution-grade software systems",
    description:
      "Digital Hooligan LLC dba Invariant builds SaaS products, automation workflows, internal tools, and operational intelligence platforms for founders, operators, and mission-adjacent teams.",
    url: "/",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invariant — Execution-grade software systems",
    description:
      "Digital Hooligan LLC dba Invariant builds SaaS products, automation workflows, internal tools, and operational intelligence platforms for founders, operators, and mission-adjacent teams.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

function CtaLink({
  href,
  variant = "primary",
  children,
  fullWidth = false,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  const base = [
    "inline-flex items-center justify-center",
    "min-h-[44px]",
    "rounded-[var(--mk-radius-md)]",
    "px-6 py-3",
    "text-sm font-semibold",
    "no-underline",
    "transition-colors",
    "duration-[120ms]",
    "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
  ].join(" ");

  const primary = [
    "bg-[var(--mk-color-cta)]",
    "text-[var(--mk-color-bg)]",
    "hover:bg-[var(--mk-color-cta-hover)]",
  ].join(" ");

  const secondary = [
    "border border-[var(--mk-color-border)]",
    "text-[var(--mk-color-text)]",
    "hover:border-[var(--mk-color-cta)]",
    "hover:text-[var(--mk-color-cta)]",
  ].join(" ");

  return (
    <Link
      href={href}
      className={[
        base,
        variant === "primary" ? primary : secondary,
        fullWidth ? "w-full md:w-auto" : "",
      ]
        .join(" ")
        .trim()}
    >
      {children}
    </Link>
  );
}

const BUILDS = [
  {
    title: "SaaS Products",
    body: "Full-cycle product builds: architecture, development, and deployment for founder-led and operator-led SaaS.",
  },
  {
    title: "Workflow Automation",
    body: "Reduce manual overhead with clearly bounded, auditable automation workflows.",
  },
  {
    title: "Internal Dashboards",
    body: "Operator visibility tools — control panels, monitoring surfaces, and decision dashboards.",
  },
  {
    title: "AI-Assisted Operator Systems",
    body: "Applied AI integrations with explicit scope and human judgment retained throughout.",
  },
  {
    title: "Web Apps",
    body: "Custom web applications with clean architecture, responsive design, and shipping discipline.",
  },
  {
    title: "Applied R&D Prototypes",
    body: "Rapid prototyping to test ideas and de-risk technical assumptions before full builds.",
  },
];

const AUDIENCES = [
  {
    label: "Founders",
    body: "Turning messy workflows and unproven ideas into working software systems.",
  },
  {
    label: "Operators",
    body: "Teams that need visibility, control, and repeatability — not more tooling overhead.",
  },
  {
    label: "Small Teams",
    body: "Organizations that need leverage without enterprise complexity or bloat.",
  },
  {
    label: "Mission-adjacent orgs",
    body: "Veteran-led and mission-driven organizations modernizing operations and internal infrastructure.",
  },
];

const PRODUCTS = [
  {
    name: "Syntaxed",
    tag: "Release confidence",
    body: "Post-deploy sanity checks and release confidence tooling. Catch regressions before your users do.",
    href: "https://syntaxed.io",
  },
  {
    name: "RadixOS",
    tag: "Founder OS",
    body: "Operational OS for founder and operator decision flow. Clarity layer for the messy middle of running a company.",
    href: "https://scientiaos.io",
  },
  {
    name: "Scientia",
    tag: "Platform intelligence",
    body: "Platform intelligence and contract-aware systems for mission-adjacent and operationally complex organizations.",
    href: "https://scientiaos.io",
  },
  {
    name: "OpsToys",
    tag: "Operator utilities",
    body: "Browser-based operator utilities and workflow tooling. Small tools with outsized leverage.",
    href: null,
  },
  {
    name: "PennyWize",
    tag: "Financial signal",
    body: "Small-cap signal and research assist. Operator-grade market intelligence without the noise.",
    href: null,
  },
  {
    name: "HypeWatch",
    tag: "Trend radar",
    body: "Hype intelligence and trend radar. Know what's signal and what's noise before the cycle peaks.",
    href: null,
  },
];

const SERVICES = [
  {
    title: "MVP / Product Builds",
    body: "End-to-end product development from scoped discovery through shipped increment.",
  },
  {
    title: "Automation Systems",
    body: "Workflow design and implementation with explicit scope boundaries and human oversight.",
  },
  {
    title: "Founder Dashboards",
    body: "Operational visibility tooling: KPI surfaces, decision tools, and status boards.",
  },
  {
    title: "Product Strategy",
    body: "Structured discovery and prioritization for teams with too much signal and not enough clarity.",
  },
  {
    title: "API & Integration Work",
    body: "Backend integrations, API design, and data pipeline work for existing products and systems.",
  },
  {
    title: "Applied R&D Prototyping",
    body: "De-risk technical assumptions fast. Prototype to proof, not to permanence.",
  },
];

export default function HomePage() {
  return (
    <article className="w-full">
      {/* ── HERO ── */}
      <MkSection>
        <div className="flex flex-col gap-6 max-w-[760px]">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-cta)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Digital Hooligan LLC dba Invariant
          </span>

          <h1
            className="font-semibold leading-[1.05]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Execution-grade software systems for messy operations.
          </h1>

          <p
            className="leading-[1.6] max-w-[68ch]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.9,
            }}
          >
            We design and ship SaaS products, automation workflows, internal
            tools, and operational intelligence platforms for founders,
            operators, and mission-adjacent teams that need clarity, speed, and
            control.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <CtaLink href="/contact" variant="primary" fullWidth>
              Work with Invariant
            </CtaLink>
            <CtaLink href="#labs" variant="secondary" fullWidth>
              Explore Hooligan Labs
            </CtaLink>
          </div>
        </div>
      </MkSection>

      {/* ── WHAT INVARIANT BUILDS ── */}
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
              What Invariant builds
            </h2>
            <p
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Execution-grade systems across the full product surface — from
              first prototype to production-grade SaaS.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUILDS.map((card) => (
              <MkCard key={card.title}>
                <h3
                  className="font-semibold"
                  style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-2 leading-[1.6]"
                  style={{
                    fontSize: "var(--mk-type-size-small)",
                    color: "var(--mk-color-text-muted)",
                  }}
                >
                  {card.body}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── WHO WE BUILD FOR ── */}
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
              Who we build for
            </h2>
            <p
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              We work with people who need software that actually ships — not
              strategy decks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AUDIENCES.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2 p-6 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--mk-color-cta)" }}
                  />
                  <h3
                    className="font-semibold"
                    style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                  >
                    {item.label}
                  </h3>
                </div>
                <p
                  className="leading-[1.6] pl-[14px]"
                  style={{
                    fontSize: "var(--mk-type-size-small)",
                    color: "var(--mk-color-text-muted)",
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── HOOLIGAN LABS ── */}
      <MkSection tone="surface-1" id="labs">
        <div className="flex flex-col gap-8">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "var(--mk-color-link)",
                fontFamily: "var(--mk-type-font-mono)",
              }}
            >
              Hooligan Labs — Product &amp; R&amp;D Ecosystem
            </span>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Products in the lab
            </h2>
            <p
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Hooligan Labs is the R&amp;D and product-building arm of Digital
              Hooligan LLC. Live products and tools in active development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((product) => {
              const cardContent = (
                <>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3
                      className="font-semibold"
                      style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                    >
                      {product.name}
                      {product.href && (
                        <span className="ml-1 text-xs opacity-50">↗</span>
                      )}
                    </h3>
                    <span
                      className="text-[11px] font-semibold flex-shrink-0 mt-0.5"
                      style={{
                        color: "var(--mk-color-link)",
                        fontFamily: "var(--mk-type-font-mono)",
                        opacity: 0.8,
                      }}
                    >
                      {product.tag}
                    </span>
                  </div>
                  <p
                    className="leading-[1.6]"
                    style={{
                      fontSize: "var(--mk-type-size-small)",
                      color: "var(--mk-color-text-muted)",
                    }}
                  >
                    {product.body}
                  </p>
                  {!product.href && (
                    <p
                      className="mt-3 text-[11px]"
                      style={{ color: "var(--mk-color-text-muted)", opacity: 0.5 }}
                    >
                      In development
                    </p>
                  )}
                </>
              );

              return product.href ? (
                <a
                  key={product.name}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[var(--mk-radius-lg)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6 no-underline block hover:border-[var(--mk-color-link)] transition-colors duration-[120ms]"
                  style={{ boxShadow: "var(--mk-shadow-1)" }}
                >
                  {cardContent}
                </a>
              ) : (
                <MkCard key={product.name}>{cardContent}</MkCard>
              );
            })}
          </div>
        </div>
      </MkSection>

      {/* ── SERVICES ── */}
      <MkSection id="services">
        <div className="flex flex-col gap-8">
          <div>
            <h2
              className="font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Services
            </h2>
            <p
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Scoped engagements with clear deliverables. Work is led by
              operators, not delegated to autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="p-6 rounded-[var(--mk-radius-md)] border"
                style={{
                  borderColor: "var(--mk-color-border)",
                  background: "var(--mk-color-surface-1)",
                }}
              >
                <h3
                  className="font-semibold"
                  style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="mt-2 leading-[1.6]"
                  style={{
                    fontSize: "var(--mk-type-size-small)",
                    color: "var(--mk-color-text-muted)",
                  }}
                >
                  {svc.body}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <CtaLink href="/contact" variant="primary">
              Start a Project
            </CtaLink>
          </div>
        </div>
      </MkSection>

      {/* ── COMPANY STATUS / CREDIBILITY ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Company
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex flex-col gap-5">
              {[
                { label: "Legal Entity", value: "Digital Hooligan LLC" },
                { label: "DBA", value: "Invariant" },
                {
                  label: "Ownership",
                  value: "Veteran-owned software company",
                },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "var(--mk-color-text-muted)" }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="font-semibold"
                    style={{
                      fontSize: "16px",
                      color: "var(--mk-color-text)",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              {[
                {
                  label: "Federal Contracting",
                  value: "SAM.gov Registered · Federal Contracting Ready",
                },
                {
                  label: "Certifications",
                  value: "SBA Certified SDVOSB · SBA Certified VOSB",
                },
                {
                  label: "SBA 8(a)",
                  value: "Application in Progress",
                },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "var(--mk-color-text-muted)" }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="font-semibold"
                    style={{
                      fontSize: "16px",
                      color: "var(--mk-color-text)",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MkSection>

      {/* ── FOUNDER NOTE ── */}
      <MkSection>
        <div className="max-w-[72ch]">
          <span
            className="text-xs uppercase tracking-widest"
            style={{
              color: "var(--mk-color-text-muted)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Founder Note
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
              Digital Hooligan is built by an operator who understands messy
              workflows, mission pressure, product ambiguity, and the need to
              turn chaos into working systems. Invariant exists to turn that
              chaos into clear, usable software.
            </p>
          </blockquote>
        </div>
      </MkSection>

      {/* ── FINAL CTA ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-6 items-start">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Bring the chaos.
            <br />
            We&apos;ll build the system.
          </h2>
          <CtaLink href="/contact" variant="primary" fullWidth>
            Start a Project with Invariant
          </CtaLink>
        </div>
      </MkSection>
    </article>
  );
}
