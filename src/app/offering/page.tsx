import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Offerings",
} as const;

export const metadata: Metadata = {
  title: "Offerings",
  description:
    "Scoped engagements for founders, operators, and mission-adjacent organizations. Decision sprints, operating system design, and fractional systems partnership.",
  alternates: { canonical: "/offering" },
  openGraph: {
    type: "website",
    title: "Offerings — Invariant",
    description:
      "Scoped engagements for founders, operators, and mission-adjacent organizations. Decision sprints, operating system design, and fractional systems partnership.",
    url: "/offering",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offerings — Invariant",
    description:
      "Scoped engagements for founders, operators, and mission-adjacent organizations.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

const OFFERINGS = [
  {
    id: "decision-architecture-sprint",
    name: "Decision Architecture Sprint",
    price: "$2,500",
    cadence: "One-time sprint",
    forWho:
      "Teams drowning in decisions, Slack threads, context loss, and ambiguity about what matters.",
    description:
      "A focused sprint to diagnose operating friction, surface the decisions that are actually blocking progress, and produce a clear, actionable decision roadmap your team can execute against.",
    deliverables: [
      "Decision map: what decisions exist, who owns them, what context is needed",
      "Operating assumptions documented",
      "Accountability boundaries defined",
      "Review points and follow-through structure",
      "Next-step system your team can immediately use",
    ],
    cta: "Discuss this sprint",
  },
  {
    id: "operating-system-design-sprint",
    name: "Operating System Design Sprint",
    price: "Starting at $7,500",
    cadence: "Scoped sprint — final pricing confirmed in proposal",
    forWho:
      "Founders and operators who need a clearer operating model before adding more tools, headcount, or complexity.",
    description:
      "A deeper engagement to redesign how your business actually runs — workflows, decision structure, tooling alignment, and execution logic — so that what you build next fits how the work actually flows.",
    deliverables: [
      "Workflow map: how work moves through the organization",
      "Operating rhythm: cadence, review points, accountability nodes",
      "System blueprint: tooling alignment and integration architecture",
      "Automation opportunities: where leverage exists without fragility",
      "Implementation plan with sequenced next steps",
    ],
    cta: "Discuss this sprint",
  },
  {
    id: "fractional-systems-partner",
    name: "Fractional Systems Partner",
    price: "Starting at $3,000/mo",
    cadence: "Ongoing monthly — scope confirmed in proposal",
    forWho:
      "Teams that need continuous systems thinking, workflow design, automation guidance, and operator-level product support without a full-time hire.",
    description:
      "Ongoing founder-level advisory for implementation guidance, operating system refinement, decision review, and structured follow-through. You get a systems partner who knows your operation and shows up every week.",
    deliverables: [
      "Recurring advisory sessions",
      "Systems and workflow review",
      "Implementation support and decision guidance",
      "Automation and tooling recommendations",
      "Priority alignment and operating rhythm support",
    ],
    cta: "Work with Invariant",
  },
];

function OfferingCard({ offering }: { offering: (typeof OFFERINGS)[number] }) {
  return (
    <div
      className="flex flex-col rounded-[var(--mk-radius-lg)] border p-6 sm:p-8"
      style={{
        borderColor: "var(--mk-color-border)",
        background: "var(--mk-color-surface-1)",
        boxShadow: "0 1px 0 rgba(0,0,0,0.25)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h2
            className="font-semibold leading-[1.2]"
            style={{ fontSize: "20px", color: "var(--mk-color-text)" }}
          >
            {offering.name}
          </h2>
          <p
            className="mt-1 text-xs"
            style={{
              color: "var(--mk-color-text-muted)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            {offering.cadence}
          </p>
        </div>
        <div
          className="shrink-0 text-xl font-semibold"
          style={{ color: "var(--mk-color-cta)" }}
        >
          {offering.price}
        </div>
      </div>

      {/* For who */}
      <div
        className="mb-4 text-sm rounded-[var(--mk-radius-sm)] px-3 py-2 border-l-2"
        style={{
          borderColor: "var(--mk-color-cta)",
          background: "rgba(45,255,183,0.05)",
          color: "var(--mk-color-text-muted)",
        }}
      >
        <span
          className="font-semibold text-[11px] uppercase tracking-widest mr-2"
          style={{ color: "var(--mk-color-cta)" }}
        >
          For
        </span>
        {offering.forWho}
      </div>

      {/* Description */}
      <p
        className="leading-[1.6] mb-5 text-sm"
        style={{ color: "var(--mk-color-text)", opacity: 0.9 }}
      >
        {offering.description}
      </p>

      {/* Deliverables */}
      <div className="mb-6">
        <h3
          className="text-[11px] font-semibold uppercase tracking-widest mb-3"
          style={{
            color: "var(--mk-color-text-muted)",
            fontFamily: "var(--mk-type-font-mono)",
          }}
        >
          What you get
        </h3>
        <ul className="flex flex-col gap-2">
          {offering.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-2 text-sm">
              <span
                className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--mk-color-cta)" }}
              />
              <span style={{ color: "var(--mk-color-text-muted)" }}>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center min-h-[44px] w-full sm:w-auto rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{
            background: "var(--mk-color-cta)",
            color: "var(--mk-color-bg)",
          }}
        >
          {offering.cta}
        </Link>
      </div>
    </div>
  );
}

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
            Invariant — Scoped Work Only
          </span>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Engagements designed around how operators actually work.
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Every engagement is scoped before work begins. No open-ended
            retainers. No guaranteed outcomes. Just structured work with clear
            deliverables and operator-led execution.
          </p>
        </div>
      </MkSection>

      {/* ── OFFERINGS ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-6">
          <div>
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Available engagements
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Three engagement types. All scoped. All operator-led.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {OFFERINGS.map((o) => (
              <OfferingCard key={o.id} offering={o} />
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── HOW IT WORKS ── */}
      <MkSection>
        <div className="flex flex-col gap-8 max-w-[720px]">
          <div>
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              How work starts
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Discovery before commitment. Scope before contract.
            </p>
          </div>

          <ol className="flex flex-col gap-4">
            {[
              {
                n: "01",
                title: "Start a conversation",
                body: "Tell us what you’re trying to solve. No pitch deck required.",
              },
              {
                n: "02",
                title: "Discovery and fit review",
                body: "We confirm scope, constraints, and whether there’s a clear path to a useful outcome.",
              },
              {
                n: "03",
                title: "Proposal with scope",
                body: "Final engagement shape, deliverables, and pricing confirmed before any work begins.",
              },
              {
                n: "04",
                title: "Scoped delivery",
                body: "Work is milestoned, decisions are documented, and change requests are logged explicitly.",
              },
            ].map((step) => (
              <li
                key={step.n}
                className="flex items-start gap-4 p-5 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <span
                  className="shrink-0 text-sm font-semibold"
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

      {/* ── NOT FOR ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-6 max-w-[640px]">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            What we don&apos;t do
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "Open-ended retainers without a defined scope",
              "Staff augmentation or body-shop placement",
              "Marketing, brand, or creative agency services",
              "Guaranteed business outcomes",
              "AI integrations that operate without explicit human review checkpoints",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span
                  className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--mk-color-text-muted)" }}
                />
                <span style={{ color: "var(--mk-color-text-muted)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </MkSection>

      {/* ── FINAL CTA ── */}
      <MkSection>
        <div className="flex flex-col gap-5 items-start max-w-[560px]">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Not sure which engagement fits?
          </h2>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-small)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            Start a conversation. We&apos;ll help you figure out the right shape
            for your situation before any scope is confirmed.
          </p>
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
        </div>
      </MkSection>
    </article>
  );
}
