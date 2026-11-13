import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { PROJECT_INTAKE_HREF } from "@/content/intake";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Pricing",
} as const;

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Commercial pricing from Invariant: scoped software builds quoted after scoping, decision and operating-model sprints, and ongoing Fractional Systems Partner support with agreed deliverables.",
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

type Plan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  bestFor: string;
  description: string;
  delivers: string;
  example?: string;
  steps?: ReadonlyArray<{ label: string; body: string }>;
  disclosure: string | null;
};

const PLANS: ReadonlyArray<Plan> = [
  {
    id: "scoped-software-build",
    name: "Scoped Software Build",
    price: "Quoted after scoping",
    cadence: "Fixed-scope build",
    bestFor: "Teams that need a defined piece of software built and handed off",
    description:
      "A defined build — an integration, internal tool, or product increment — delivered against written acceptance criteria.",
    delivers:
      "Working software in your repository, automated tests, documentation, and a handoff walkthrough.",
    example:
      "Connect your CRM to your billing system so closed deals create invoices automatically — with field mapping, data validation, tests, and a runbook your team can maintain.",
    steps: [
      {
        label: "Scoping",
        body: "Written scope, acceptance criteria, and a fixed quote before work begins.",
      },
      {
        label: "Delivery",
        body: "Milestones with review points; any scope change is logged and agreed.",
      },
      {
        label: "Handoff",
        body: "Source, tests, docs, and a walkthrough so your team owns it.",
      },
    ],
    disclosure: "Builds are quoted after scoping. No build starts without an agreed scope.",
  },
  {
    id: "decision-architecture-sprint",
    name: "Decision Architecture Sprint",
    price: "$2,500",
    cadence: "One-time",
    bestFor: "Teams drowning in ambiguity and context loss",
    description:
      "A focused founder-led sprint to diagnose operating friction, clarify priorities, and produce a practical decision roadmap your team can execute against.",
    delivers:
      "A written decision roadmap: key decisions, owners, the context each needs, and prioritized next steps.",
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
    delivers:
      "An operating-model blueprint — workflows, decision structure, and tooling alignment — plus a prioritized implementation plan.",
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
      "Ongoing support with agreed deliverables: implementation guidance, decision review, operating refinement, and structured follow-through.",
    delivers:
      "A monthly set of agreed deliverables and scheduled decision reviews, revisited each month.",
    disclosure:
      "Final scope and pricing are confirmed in proposal after discovery and fit review.",
  },
];

export default function PricingPage() {
  return (
    <article className="w-full">
      {/* ── HERO ── */}
      <MkSection>
        <div className="flex flex-col gap-4 max-w-[680px]">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-link)",
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
            Commercial pricing.
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Scoped software builds, founder-led systems sprints, and ongoing
            support — each with clear deliverables. See{" "}
            <Link href="/services" style={{ color: "var(--mk-color-link)" }}>
              Services
            </Link>{" "}
            for what each engagement covers.
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
              Engagements
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Four engagement types. All scoped before work begins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                id={plan.id}
                className="scroll-mt-24 flex flex-col rounded-[var(--mk-radius-lg)] border p-6 sm:p-7 h-full"
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
                  style={{ color: "var(--mk-color-link)" }}
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
                    borderColor: "var(--mk-color-link)",
                    background: "rgba(0,229,255,0.06)",
                    color: "var(--mk-color-text-muted)",
                  }}
                >
                  <span
                    className="font-semibold uppercase tracking-widest mr-1.5"
                    style={{
                      color: "var(--mk-color-link)",
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

                {/* What it delivers */}
                <p
                  className="text-sm leading-[1.6] mb-5"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  <span className="font-semibold">Delivers: </span>
                  <span style={{ color: "var(--mk-color-text-muted)" }}>
                    {plan.delivers}
                  </span>
                </p>

                {plan.example && (
                  <div
                    className="text-sm leading-[1.6] mb-5 rounded-[var(--mk-radius-md)] border px-4 py-3"
                    style={{
                      borderColor: "var(--mk-color-border)",
                      color: "var(--mk-color-text-muted)",
                    }}
                  >
                    <span
                      className="block text-[10px] font-semibold uppercase tracking-widest mb-1"
                      style={{
                        color: "var(--mk-color-link)",
                        fontFamily: "var(--mk-type-font-mono)",
                      }}
                    >
                      Example
                    </span>
                    {plan.example}
                  </div>
                )}

                {plan.steps && (
                  <ol className="flex flex-col gap-2 mb-5">
                    {plan.steps.map((step, i) => (
                      <li
                        key={step.label}
                        className="flex gap-3 text-sm leading-[1.55]"
                        style={{ color: "var(--mk-color-text-muted)" }}
                      >
                        <span
                          className="font-semibold shrink-0"
                          style={{
                            color: "var(--mk-color-link)",
                            fontFamily: "var(--mk-type-font-mono)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span
                            className="font-semibold"
                            style={{ color: "var(--mk-color-text)" }}
                          >
                            {step.label}.
                          </span>{" "}
                          {step.body}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}

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
                  href={PROJECT_INTAKE_HREF}
                  className="mt-auto inline-flex items-center justify-center min-h-[44px] w-full rounded-[var(--mk-radius-md)] px-4 py-2.5 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:bg-[var(--mk-color-cta-hover)]"
                  style={{
                    background: "var(--mk-color-cta)",
                    color: "var(--mk-color-bg)",
                  }}
                >
                  Discuss a project
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
              "Scoped Software Builds are quoted after scoping, against written acceptance criteria.",
              "Every engagement — including ongoing Fractional Systems Partner support — runs on agreed deliverables.",
              "Final scope and pricing are confirmed in proposal after discovery and fit review.",
              "Federal subcontract work is scoped per opportunity with the prime; see Federal & Defense.",
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
            build, a sprint, a system design pass, or ongoing support — before
            any scope is confirmed.
          </p>
          <div>
            <Link
              href={PROJECT_INTAKE_HREF}
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:bg-[var(--mk-color-cta-hover)]"
              style={{
                background: "var(--mk-color-cta)",
                color: "var(--mk-color-bg)",
              }}
            >
              Discuss a project
            </Link>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
