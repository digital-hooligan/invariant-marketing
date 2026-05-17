import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Pricing",
} as const;

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Founder-led systems engagements for businesses that need better decisions, cleaner operations, and stronger execution. Decision sprints, operating system design, fractional partnership.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    title: "Pricing — Invariant",
    description:
      "Founder-led systems engagements for clearer operations and stronger execution.",
    url: "/pricing",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Invariant",
    description:
      "Founder-led systems engagements for clearer operations and stronger execution.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

const PLANS = [
  {
    id: "decision-architecture-sprint",
    name: "Decision Architecture Sprint",
    price: "$2,500",
    cadence: "One-time",
    bestFor: "Teams drowning in ambiguity and context loss",
    description:
      "A focused founder-led sprint to diagnose operating friction, clarify priorities, and produce a practical decision roadmap your team can execute against.",
    disclosure: null,
  },
  {
    id: "operating-system-design-sprint",
    name: "Operating System Design Sprint",
    price: "Starting at $7,500",
    cadence: "Scoped sprint",
    bestFor: "Founders who need a clearer operating model",
    description:
      "A deeper engagement to redesign workflows, decision structure, tooling alignment, and execution logic around how the business actually runs.",
    disclosure:
      "Final scope and pricing are confirmed in proposal after discovery and fit review.",
  },
  {
    id: "fractional-systems-partner",
    name: "Fractional Systems Partner",
    price: "Starting at $3,000/mo",
    cadence: "Ongoing monthly",
    bestFor: "Teams that need continuous systems thinking",
    description:
      "Ongoing founder-level support for implementation guidance, decision review, operating refinement, and structured follow-through.",
    disclosure:
      "Final scope and pricing are confirmed in proposal after discovery and fit review.",
  },
] as const;

export default function PricingPage() {
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
            Pricing
          </span>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Founder services for clearer operations.
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Clarity first. Then structure. Then guided implementation.
            Founder-led systems engagements for businesses that need better
            decisions, cleaner operations, and stronger execution.
          </p>
        </div>
      </MkSection>

      {/* ── PRICING CARDS ── */}
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
              Founder Services
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Three engagement types. All scoped before work begins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col rounded-[var(--mk-radius-lg)] border p-6 sm:p-7 h-full"
                style={{
                  borderColor: "var(--mk-color-border)",
                  background: "var(--mk-color-bg)",
                  boxShadow: "0 1px 0 rgba(0,0,0,0.35)",
                }}
              >
                {/* Name + price */}
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3
                    className="font-semibold leading-snug"
                    style={{
                      fontSize: "17px",
                      color: "var(--mk-color-text)",
                    }}
                  >
                    {plan.name}
                  </h3>
                </div>

                <div
                  className="text-2xl font-semibold mb-1"
                  style={{ color: "var(--mk-color-cta)" }}
                >
                  {plan.price}
                </div>
                <div
                  className="text-xs mb-4"
                  style={{
                    color: "var(--mk-color-text-muted)",
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  {plan.cadence}
                </div>

                {/* Best for */}
                <div
                  className="text-xs rounded-[var(--mk-radius-sm)] px-3 py-2 mb-5 border-l-2"
                  style={{
                    borderColor: "var(--mk-color-cta)",
                    background: "rgba(45,255,183,0.06)",
                    color: "var(--mk-color-text-muted)",
                  }}
                >
                  <span
                    className="font-semibold uppercase tracking-widest mr-1.5"
                    style={{
                      color: "var(--mk-color-cta)",
                      fontSize: "10px",
                    }}
                  >
                    Best for
                  </span>
                  {plan.bestFor}
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-[1.65] flex-1 mb-5"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {plan.description}
                </p>

                {/* Disclosure */}
                {plan.disclosure && (
                  <p
                    className="text-xs leading-[1.6] mb-5 italic"
                    style={{
                      color: "var(--mk-color-text-muted)",
                      opacity: 0.7,
                    }}
                  >
                    {plan.disclosure}
                  </p>
                )}

                {/* CTA */}
                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center justify-center min-h-[44px] w-full rounded-[var(--mk-radius-md)] px-4 py-2.5 text-sm font-semibold no-underline transition-colors duration-[120ms]"
                  style={{
                    background: "var(--mk-color-cta)",
                    color: "var(--mk-color-bg)",
                  }}
                >
                  Start a Conversation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── NOTES ── */}
      <MkSection compact>
        <div className="max-w-[680px] flex flex-col gap-5">
          <h2
            className="font-semibold"
            style={{
              fontSize: "18px",
              color: "var(--mk-color-text)",
            }}
          >
            Scope expectations
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "Discovery is used to confirm fit and scope before deeper implementation work begins.",
              "Final scope and pricing are confirmed in proposal after discovery and fit review.",
              "Product admissions for ScientiaOS are handled separately on the ScientiaOS public entry surface.",
            ].map((note) => (
              <li key={note} className="flex items-start gap-3">
                <span
                  className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--mk-color-cta)" }}
                />
                <span
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </MkSection>

      {/* ── CTA ── */}
      <MkSection tone="surface-1" compact>
        <div className="flex flex-col gap-5 max-w-[600px]">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Not sure where to start?
          </h2>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-small)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            Start with a conversation. We&apos;ll identify whether you need a
            sprint, a system design pass, or ongoing support — before any scope
            is confirmed.
          </p>
          <div>
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
        </div>
      </MkSection>
    </article>
  );
}
