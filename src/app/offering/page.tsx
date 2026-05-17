import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Offering",
} as const;

export const metadata: Metadata = {
  title: "Offering",
  description:
    "Applied systems work for founders, operators, and mission-adjacent organizations. Discovery, build sprints, workflow automation, and applied AI integrations.",
  alternates: { canonical: "/offering" },
  openGraph: {
    type: "website",
    title: "Offering — Invariant",
    description:
      "Applied systems work for founders, operators, and mission-adjacent organizations.",
    url: "/offering",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offering — Invariant",
    description:
      "Applied systems work for founders, operators, and mission-adjacent organizations.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

const WHO = [
  {
    label: "Founder-led teams",
    body: "Turning messy workflows, unproven ideas, and operating chaos into working software systems.",
  },
  {
    label: "Operationally complex organizations",
    body: "Regulated, mission-adjacent, and coordination-heavy businesses that need structure before software.",
  },
  {
    label: "Teams shipping internal tools or applied AI",
    body: "Organizations building internal systems, automation workflows, or AI-assisted operating layers.",
  },
  {
    label: "Mission-adjacent and veteran-led teams",
    body: "Veteran-owned and mission-driven organizations modernizing operations and internal infrastructure.",
  },
];

const WHAT_WE_DO = [
  {
    title: "Discovery & Signal Clarification",
    body: "Define the problem surface, inputs, constraints, and what a useful outcome actually looks like — before any implementation work begins.",
  },
  {
    title: "Prototype & Build Increments",
    body: "Scoped delivery with documented decisions and review points. Work expands only when there is a clear path.",
  },
  {
    title: "Workflow Automation",
    body: "Reduce manual overhead with clearly bounded workflows. No autonomy overclaims — automation with human review baked in.",
  },
  {
    title: "Applied AI Integrations",
    body: "Operator-led AI integrations with explicit scope, documented assumptions, and human judgment retained at the right points.",
  },
];

const ENGAGEMENT_TYPES = [
  {
    title: "Discovery",
    body: "A structured scope and fit review to clarify the problem, define the system, and confirm whether there is a clear implementation path.",
  },
  {
    title: "Build Sprint",
    body: "A focused, milestoned delivery increment. Scope defined before work begins. Change requests logged explicitly.",
  },
  {
    title: "Incremental Delivery",
    body: "Sequential delivery across multiple sprints. Each increment reviewed before the next is scoped.",
  },
  {
    title: "Fractional Systems Partner",
    body: "Ongoing advisory, systems review, and implementation support. For teams that need sustained operator-level thinking, not just project execution.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Scope defined before work begins",
    body: "Every engagement starts with a clear definition of what will be delivered, what constraints apply, and what done looks like.",
  },
  {
    n: "02",
    title: "Milestones tracked",
    body: "Work is broken into review points with documented progress and explicit decision logs.",
  },
  {
    n: "03",
    title: "Changes logged",
    body: "Scope changes are made explicit and agreed upon — not absorbed silently into the work.",
  },
  {
    n: "04",
    title: "Review points preserved",
    body: "Each review is a genuine checkpoint. Work expands only when the current increment is validated.",
  },
];

export default function OfferingPage() {
  return (
    <article className="w-full">
      {/* ── HERO ── */}
      <MkSection>
        <div className="flex flex-col gap-4 max-w-[680px]">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-cta)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Offering
          </span>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Applied systems work for teams operating through complexity.
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Invariant helps founders and operators clarify the work, design the
            system, and implement practical software or automation — without
            adding unnecessary bloat or abstraction.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] border px-5 py-2.5 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:border-[var(--mk-color-cta)] hover:text-[var(--mk-color-cta)]"
              style={{
                borderColor: "var(--mk-color-border)",
                color: "var(--mk-color-text)",
              }}
            >
              See Pricing
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-5 py-2.5 text-sm font-semibold no-underline transition-colors duration-[120ms]"
              style={{
                background: "var(--mk-color-cta)",
                color: "var(--mk-color-bg)",
              }}
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </MkSection>

      {/* ── WHO IT IS FOR ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <div>
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Who it is for
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Teams that need software that actually ships — not strategy decks.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHO.map((w) => (
              <MkCard key={w.label}>
                <div className="flex items-start gap-2 mb-3">
                  <span
                    className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--mk-color-cta)" }}
                  />
                  <h3
                    className="font-semibold"
                    style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                  >
                    {w.label}
                  </h3>
                </div>
                <p
                  className="text-sm leading-[1.65] pl-[14px]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {w.body}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── WHAT WE DO ── */}
      <MkSection>
        <div className="flex flex-col gap-8">
          <div>
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              What we do
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Practical systems work across the full product and operations surface.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHAT_WE_DO.map((item) => (
              <MkCard key={item.title}>
                <h3
                  className="font-semibold mb-2"
                  style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {item.body}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── WHAT WE DON'T DO ── */}
      <MkSection tone="surface-1" compact>
        <div className="flex flex-col gap-6 max-w-[680px]">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            What we don&apos;t do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Open-ended R&D without a decision path",
              "Staff augmentation without system ownership",
              "Generic marketing or creative agency services",
              "Guaranteed outcomes or unsupported performance claims",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <span
                  className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--mk-color-text-muted)" }}
                />
                <span
                  className="text-sm leading-[1.6]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── ENGAGEMENT TYPES ── */}
      <MkSection>
        <div className="flex flex-col gap-8">
          <div>
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Engagement types
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              All engagements are scoped before work begins.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENGAGEMENT_TYPES.map((e) => (
              <div
                key={e.title}
                className="p-5 rounded-[var(--mk-radius-md)] border flex flex-col gap-2"
                style={{
                  borderColor: "var(--mk-color-border)",
                  background: "var(--mk-color-surface-1)",
                }}
              >
                <h3
                  className="font-semibold text-sm"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  {e.title}
                </h3>
                <p
                  className="text-sm leading-[1.6]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── PROCESS ── */}
      <MkSection tone="surface-1" compact>
        <div className="flex flex-col gap-8 max-w-[720px]">
          <div>
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Process overview
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              How all Invariant engagements are structured.
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROCESS.map((step) => (
              <li
                key={step.n}
                className="flex items-start gap-4 p-5 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <span
                  className="shrink-0 text-sm font-semibold pt-0.5"
                  style={{
                    color: "var(--mk-color-cta)",
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  {step.n}
                </span>
                <div>
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: "var(--mk-color-text)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-[1.6]"
                    style={{ color: "var(--mk-color-text-muted)" }}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
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
            Start with the system, not the tool.
          </h2>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-small)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            Tell us what you&apos;re trying to build and what&apos;s in your
            way. We review every inquiry for fit.
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
              href="/pricing"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] border px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:border-[var(--mk-color-cta)] hover:text-[var(--mk-color-cta)]"
              style={{
                borderColor: "var(--mk-color-border)",
                color: "var(--mk-color-text)",
              }}
            >
              See Pricing
            </Link>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
