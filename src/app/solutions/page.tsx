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
    body: "Structure the decisions that drive your business. We map what decisions exist, who owns them, what context travels with them, and where accountability lives — so decisions stop dissolving into meetings and chat threads.",
    signal: "Useful when: teams operate on tribal knowledge and important choices are made inconsistently or invisibly.",
  },
  {
    title: "Workflow and Execution Design",
    body: "When coordination is the bottleneck, the answer isn't more tools — it's a cleaner model of how work moves. We redesign operating workflows, execution instrumentation, handoff structures, and internal tooling alignment.",
    signal: "Useful when: work stalls at handoffs, accountability is unclear, or the same problems keep recurring.",
  },
  {
    title: "Applied AI and Automation",
    body: "Practical AI and automation implementation where it actually fits the work. Not novelty — leverage. We design systems with explicit scope, documented assumptions, and human review checkpoints at the right places.",
    signal: "Useful when: manual overhead is slowing execution and automation is clearly bounded.",
  },
  {
    title: "Internal Tools and Dashboards",
    body: "Operator visibility tooling: control panels, monitoring surfaces, decision dashboards, and status boards. Built to fit the operating rhythm, not a generic SaaS template.",
    signal: "Useful when: teams are managing operations through spreadsheets, Slack threads, or disconnected tools.",
  },
  {
    title: "API and Integration Work",
    body: "Backend integrations, API design, and data pipeline work for existing products and systems. We wire together what needs to talk, remove what creates coupling, and build what's missing.",
    signal: "Useful when: data doesn't flow between systems that should be connected, or a key integration is brittle.",
  },
  {
    title: "Operating System Design",
    body: "A full operating model redesign — how the business runs, how decisions move, how tools align, how the team executes. For founders and operators who need structural clarity before the next phase of growth.",
    signal: "Useful when: the business works but doesn't scale cleanly, and adding people or tools makes things worse.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Clarify the problem",
    body: "We start with what's actually breaking, not a features list. Constraints, operating reality, and what 'solved' looks like.",
  },
  {
    n: "02",
    title: "Map the operating reality",
    body: "How work moves today. Where decisions stall. What the team is actually doing versus what the process says.",
  },
  {
    n: "03",
    title: "Define the system",
    body: "Scope, architecture, and engagement shape — confirmed before implementation work begins.",
  },
  {
    n: "04",
    title: "Prototype or implement",
    body: "Scoped delivery with milestones, documented decisions, and change requests tracked explicitly.",
  },
  {
    n: "05",
    title: "Review and iterate",
    body: "Built-in review points. Work expands only when there's a clear path and shared understanding of fit.",
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
            Invariant — Applied Systems Work
          </span>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Solutions for teams operating through complexity.
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
            implement practical software systems — without adding unnecessary
            bloat or abstraction.
          </p>
        </div>
      </MkSection>

      {/* ── SOLUTION AREAS ── */}
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
              className="mt-2 max-w-[60ch]"
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
                  className="leading-[1.6] text-sm mb-4"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {s.body}
                </p>
                <p
                  className="text-xs leading-[1.5] italic"
                  style={{ color: "var(--mk-color-text-muted)", opacity: 0.7 }}
                >
                  {s.signal}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── WHO WE WORK WITH ── */}
      <MkSection>
        <div className="flex flex-col gap-6 max-w-[720px]">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Who we work with
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Founder-led teams",
                body: "Moving from chaos to a working operating model, or from prototype to production-grade system.",
              },
              {
                label: "Operationally complex orgs",
                body: "Businesses with meaningful operating constraints — regulatory, mission-adjacent, or coordination-heavy.",
              },
              {
                label: "Teams building internal systems",
                body: "Organizations that need better structure before they need more software.",
              },
            ].map((w) => (
              <div
                key={w.label}
                className="p-5 rounded-[var(--mk-radius-md)] border flex flex-col gap-2"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <h3
                  className="font-semibold text-sm"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  {w.label}
                </h3>
                <p
                  className="text-sm leading-[1.6]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── PROCESS ── */}
      <MkSection tone="surface-1">
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
              Most work starts with a focused sprint or scoped discovery — then
              expands only when there is a clear path and shared fit.
            </p>
          </div>

          <ol className="flex flex-col gap-3">
            {PROCESS_STEPS.map((step) => (
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
      <MkSection>
        <div className="flex flex-col gap-5 items-start max-w-[560px]">
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
              See Offerings
            </Link>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
