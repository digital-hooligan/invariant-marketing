import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Digital Hooligan LLC is the legal entity. Invariant is the commercial studio. Hooligan Labs is the product and R&D ecosystem.",
};

const PRODUCTS = [
  { name: "Syntaxed", tag: "Release confidence" },
  { name: "RadixOS", tag: "Founder OS" },
  { name: "Scientia", tag: "Platform intelligence" },
  { name: "OpsToys", tag: "Operator utilities" },
  { name: "PennyWize", tag: "Financial signal" },
  { name: "HypeWatch", tag: "Trend radar" },
];

export default function CompanyPage() {
  return (
    <article className="w-full">
      {/* ── OVERVIEW ── */}
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
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--mk-color-text)",
            }}
          >
            We build execution-grade software for operators who can&apos;t afford
            to guess.
          </h1>

          <p
            className="leading-[1.6] max-w-[68ch]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.9,
            }}
          >
            Digital Hooligan LLC is a veteran-owned software company. We design
            and ship SaaS products, automation workflows, internal tooling, and
            applied R&amp;D platforms for founders, operators, and
            mission-adjacent organizations that need clarity, speed, and
            control.
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
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Three layers. One operating team. Distinct purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MkCard>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{
                  color: "var(--mk-color-cta)",
                  fontFamily: "var(--mk-type-font-mono)",
                }}
              >
                Legal Entity
              </div>
              <h3
                className="font-semibold"
                style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
              >
                Digital Hooligan LLC
              </h3>
              <p
                className="mt-2 leading-[1.6]"
                style={{
                  fontSize: "var(--mk-type-size-small)",
                  color: "var(--mk-color-text-muted)",
                }}
              >
                The registered legal entity. Owns all intellectual property,
                contracts, and operating relationships.
              </p>
            </MkCard>

            <MkCard>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{
                  color: "var(--mk-color-cta)",
                  fontFamily: "var(--mk-type-font-mono)",
                }}
              >
                Commercial Studio / DBA
              </div>
              <h3
                className="font-semibold"
                style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
              >
                Invariant
              </h3>
              <p
                className="mt-2 leading-[1.6]"
                style={{
                  fontSize: "var(--mk-type-size-small)",
                  color: "var(--mk-color-text-muted)",
                }}
              >
                The client-facing brand and commercial layer. When you work
                with Invariant, you&apos;re contracting with Digital Hooligan LLC.
              </p>
            </MkCard>

            <MkCard>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{
                  color: "var(--mk-color-link)",
                  fontFamily: "var(--mk-type-font-mono)",
                }}
              >
                Product &amp; R&amp;D
              </div>
              <h3
                className="font-semibold"
                style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
              >
                Hooligan Labs
              </h3>
              <p
                className="mt-2 leading-[1.6]"
                style={{
                  fontSize: "var(--mk-type-size-small)",
                  color: "var(--mk-color-text-muted)",
                }}
              >
                The product and R&amp;D arm. Hooligan Labs builds tools,
                platforms, and applied experiments — for operators, by
                operators.
              </p>
            </MkCard>
          </div>
        </div>
      </MkSection>

      {/* ── MISSION ── */}
      <MkSection>
        <div className="flex flex-col gap-6 max-w-[72ch]">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Mission
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
            don&apos;t fix unclear ownership, undefined scope, or broken handoffs.
            Execution-grade software does — because it&apos;s built with operator
            constraints in mind, not hypothetical futures.
          </p>

          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            We ship working systems. Not roadmaps. Not &quot;platforms.&quot; Systems
            that earn their complexity by solving the actual problem.
          </p>
        </div>
      </MkSection>

      {/* ── HOOLIGAN LABS ── */}
      <MkSection tone="surface-1">
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
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Every product in Hooligan Labs exists because an operator problem
              was too good not to solve. The same execution discipline from
              client work applies here.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-[var(--mk-radius-md)] border flex flex-col gap-1"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <span
                  className="font-semibold"
                  style={{ fontSize: "15px", color: "var(--mk-color-text)" }}
                >
                  {p.name}
                </span>
                <span
                  className="text-[11px] font-semibold"
                  style={{
                    color: "var(--mk-color-link)",
                    fontFamily: "var(--mk-type-font-mono)",
                    opacity: 0.8,
                  }}
                >
                  {p.tag}
                </span>
              </div>
            ))}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
            {[
              { label: "Legal Entity", value: "Digital Hooligan LLC" },
              { label: "DBA", value: "Invariant" },
              { label: "Ownership", value: "Veteran-owned software company" },
              {
                label: "Federal Contracting",
                value: "Readiness in progress",
              },
              {
                label: "SBA 8(a)",
                value: "Application in progress — not yet certified",
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
      <MkSection>
        <div className="flex flex-col gap-5 items-start max-w-[56ch]">
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
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms]"
            style={{
              background: "var(--mk-color-cta)",
              color: "var(--mk-color-bg)",
            }}
          >
            Start a Project
          </Link>
        </div>
      </MkSection>
    </article>
  );
}
