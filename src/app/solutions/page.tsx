import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Solutions",
} as const;

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Invariant helps teams clarify decisions, redesign workflows, and implement practical software systems. Decision architecture, applied AI, internal tooling, API work, and operating system design.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    type: "website",
    title: "Solutions — Invariant",
    description:
      "Invariant helps teams clarify decisions, redesign workflows, and implement practical software systems.",
    url: "/solutions",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions — Invariant",
    description:
      "Invariant helps teams clarify decisions, redesign workflows, and implement practical software systems.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

const SOLUTIONS = [
  {
    title: "Decision Architecture",
    body: "Structure the decisions that drive your business — who owns them, what context they need, and how accountability is enforced.",
    href: "#decision-architecture",
  },
  {
    title: "Workflow and Execution Design",
    body: "Redesign how work moves through the organization. Cleaner handoffs, tighter execution loops, better visibility.",
    href: "#workflow-execution",
  },
  {
    title: "Applied AI and Automation",
    body: "Practical AI and automation where it fits. Explicit scope, human review retained, no autonomy overclaims.",
    href: "#applied-ai",
  },
  {
    title: "Internal Tools and Dashboards",
    body: "Operator visibility tooling — control panels, monitoring surfaces, decision dashboards built to your operating rhythm.",
    href: null,
  },
  {
    title: "API and Integration Work",
    body: "Backend integrations, API design, and data pipeline work. Wire together what needs to communicate, remove what creates coupling.",
    href: null,
  },
  {
    title: "Operating System Design",
    body: "Full operating model redesign — decisions, workflows, tooling alignment, execution logic — for founders entering a new phase of growth.",
    href: null,
  },
];

export default function SolutionsPage() {
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
            Solutions
          </span>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Systems for teams operating through complexity.
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Invariant helps teams clarify decisions, redesign workflows, and
            implement practical software systems that respect operational
            reality — without adding unnecessary bloat.
          </p>
        </div>
      </MkSection>

      {/* ── SOLUTION CARDS ── */}
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
              What we work on
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Applied systems work across decision architecture, workflow design,
              and practical implementation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOLUTIONS.map((s) => (
              <MkCard key={s.title}>
                <h3
                  className="font-semibold mb-3"
                  style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {s.body}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── DECISION ARCHITECTURE ── */}
      <MkSection id="decision-architecture">
        <div className="flex flex-col gap-8">
          <div className="max-w-[680px]">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "var(--mk-color-cta)",
                fontFamily: "var(--mk-type-font-mono)",
              }}
            >
              Deep Dive
            </span>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Decision Architecture
            </h2>
            <p
              className="mt-3 leading-[1.6]"
              style={{
                fontSize: "var(--mk-type-size-body)",
                color: "var(--mk-color-text)",
                opacity: 0.85,
              }}
            >
              For teams where important choices dissolve into meetings, chat
              threads, and spreadsheets — we help build structure around the
              decisions that actually drive the business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Signals worth preserving",
                body: "Identify which inputs actually change decisions and which ones create noise. Preserve the signal, filter the rest.",
              },
              {
                label: "Context that travels with decisions",
                body: "Decisions lose value when context is lost. We structure what information needs to accompany each decision through its lifecycle.",
              },
              {
                label: "Accountability boundaries",
                body: "Who owns what. Who reviews what. Who can override. Clear ownership stops decisions from dying in committee.",
              },
              {
                label: "Review loops and follow-through",
                body: "Decisions need feedback loops. We build the structure for decision review, outcome tracking, and course correction.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  {item.label}
                </h3>
                <p
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── WORKFLOW & EXECUTION ── */}
      <MkSection tone="surface-1" id="workflow-execution">
        <div className="flex flex-col gap-8">
          <div className="max-w-[680px]">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "var(--mk-color-cta)",
                fontFamily: "var(--mk-type-font-mono)",
              }}
            >
              Deep Dive
            </span>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Workflow and Execution Design
            </h2>
            <p
              className="mt-3 leading-[1.6]"
              style={{
                fontSize: "var(--mk-type-size-body)",
                color: "var(--mk-color-text)",
                opacity: 0.85,
              }}
            >
              When coordination is the bottleneck, the answer isn&apos;t more
              tools — it&apos;s a cleaner model of how work moves. We redesign
              operating workflows around how the team actually executes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Operating workflow mapping",
                body: "Document how work actually moves through the organization — not the org chart version, the real version.",
              },
              {
                label: "Execution instrumentation",
                body: "Add visibility at the right points. Status, blockers, and handoff state should be observable without a meeting.",
              },
              {
                label: "Handoff cleanup",
                body: "Most coordination failures are handoff failures. We redesign the transitions between teams, roles, and tools.",
              },
              {
                label: "Internal tooling alignment",
                body: "Tools should match the workflow, not force the workflow to match the tool. We identify where tooling is creating friction.",
              },
            ].map((item) => (
              <div
                key={item.label}
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
                  {item.label}
                </h3>
                <p
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── APPLIED AI ── */}
      <MkSection id="applied-ai">
        <div className="flex flex-col gap-8">
          <div className="max-w-[680px]">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "var(--mk-color-cta)",
                fontFamily: "var(--mk-type-font-mono)",
              }}
            >
              Deep Dive
            </span>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Applied AI and Automation
            </h2>
            <p
              className="mt-3 leading-[1.6]"
              style={{
                fontSize: "var(--mk-type-size-body)",
                color: "var(--mk-color-text)",
                opacity: 0.85,
              }}
            >
              Where it fits the work, we implement practical AI and automation
              support. The goal is not novelty — it&apos;s clearer operations
              and better decision follow-through.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Practical AI support",
                body: "AI integrations tied to specific, bounded operational problems. Not a platform play — a workflow improvement.",
              },
              {
                label: "Bounded automation",
                body: "Automation with defined inputs, outputs, and failure modes. Scope is explicit before any implementation begins.",
              },
              {
                label: "Human judgment retained",
                body: "Review checkpoints are built into every AI-assisted workflow. Operator judgment stays in the loop at the right moments.",
              },
              {
                label: "No autonomy overclaims",
                body: "We do not build systems that claim to replace human decision-making. AI surfaces signals and structures context — humans decide.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  {item.label}
                </h3>
                <p
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── ENGAGEMENT SHAPE ── */}
      <MkSection tone="surface-1" compact>
        <div className="flex flex-col gap-6 max-w-[680px]">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Engagement shape
          </h2>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Most work starts with scoped discovery or a focused sprint. Work
            expands only when there is a clear implementation path and a shared
            understanding of fit. We do not take on open-ended engagements.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Discovery", "Build Sprint", "Incremental Delivery", "Fractional Systems Partner"].map(
              (t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: "var(--mk-color-border)",
                    color: "var(--mk-color-text-muted)",
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  {t}
                </span>
              )
            )}
          </div>
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
            Start a conversation.
          </h2>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-small)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            Tell us what you&apos;re trying to solve. We review every inquiry
            and respond within 2–3 business days if there&apos;s a fit.
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
              href="/offering"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] border px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:border-[var(--mk-color-cta)] hover:text-[var(--mk-color-cta)]"
              style={{
                borderColor: "var(--mk-color-border)",
                color: "var(--mk-color-text)",
              }}
            >
              How We Work
            </Link>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
