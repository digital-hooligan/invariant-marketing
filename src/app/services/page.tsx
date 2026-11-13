import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";
import { PROJECT_INTAKE_HREF } from "@/content/intake";

const DESCRIPTION =
  "Commercial services from Invariant: scoped software builds, decision architecture, workflow and execution design, applied AI and automation with human review, and ongoing systems support.";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Services",
} as const;

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: "Services — Invariant",
    description: DESCRIPTION,
    url: "/services",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Invariant",
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

const SERVICE_AREAS = [
  {
    title: "Scoped Software Builds",
    body: "Fixed-scope builds — integrations, internal tools, and product increments — quoted after scoping and delivered with tests and handoff documentation.",
    href: "/pricing#scoped-software-build",
  },
  {
    title: "API and Integration Work",
    body: "Backend integrations, API design, and data pipeline work. Wire together what needs to communicate, remove what creates coupling.",
    href: null,
  },
  {
    title: "Internal Tools and Dashboards",
    body: "Operator visibility tooling — control panels, monitoring surfaces, and decision dashboards built to your operating rhythm.",
    href: null,
  },
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
] as const;

/** Section ids preserve deep links from the former /solutions page. */
const DEEP_DIVES = [
  {
    id: "decision-architecture",
    title: "Decision Architecture",
    intro:
      "Every tool captures activity. Few preserve judgment. For teams where important choices dissolve into meetings, chat threads, and spreadsheets — we help build structure around the decisions that actually drive the business.",
    items: [
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
    ],
  },
  {
    id: "workflow-execution",
    title: "Workflow and Execution Design",
    intro:
      "When coordination is the bottleneck, the answer isn't more tools — it's a cleaner model of how work moves. We redesign operating workflows around how the team actually executes.",
    items: [
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
    ],
  },
  {
    id: "applied-ai",
    title: "Applied AI and Automation",
    intro:
      "Where it fits the work, we implement practical AI and automation support. The goal is not novelty — it's clearer operations and better decision follow-through.",
    items: [
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
    ],
  },
] as const;

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

const ENGAGEMENT_TYPES = [
  {
    title: "Discovery",
    body: "A structured scope and fit review to clarify the problem, define the system, and confirm whether there is a clear implementation path.",
  },
  {
    title: "Scoped Software Build",
    body: "A fixed-scope build with written acceptance criteria, milestone reviews, and a handoff of source, tests, and documentation. Quoted after scoping.",
  },
  {
    title: "Incremental Delivery",
    body: "Sequential delivery across multiple increments. Each increment is reviewed before the next is scoped.",
  },
  {
    title: "Fractional Systems Partner",
    body: "Ongoing support with agreed deliverables — implementation guidance, decision review, and structured follow-through each month.",
  },
];

const PROCESS = [
  {
    title: "Scope defined before work begins",
    body: "Every engagement starts with a clear definition of what will be delivered, what constraints apply, and what done looks like.",
  },
  {
    title: "Milestones tracked",
    body: "Work is broken into review points with documented progress and explicit decision logs.",
  },
  {
    title: "Changes logged",
    body: "Scope changes are made explicit and agreed upon — not absorbed silently into the work.",
  },
  {
    title: "Handoff built in",
    body: "Source, tests, and documentation are delivered so your team can own and sustain the work.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs font-semibold uppercase tracking-widest"
      style={{
        color: "var(--mk-color-link)",
        fontFamily: "var(--mk-type-font-mono)",
      }}
    >
      {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-3 font-semibold leading-[1.2]"
      style={{
        fontSize: "var(--mk-type-size-h2)",
        color: "var(--mk-color-text)",
      }}
    >
      {children}
    </h2>
  );
}

const PRIMARY_BTN =
  "inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:bg-[var(--mk-color-cta-hover)]";
const SECONDARY_BTN =
  "inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] border px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms] hover:border-[var(--mk-color-cta)] hover:text-[var(--mk-color-cta)]";

export default function ServicesPage() {
  return (
    <article className="w-full">
      {/* ── HERO ── */}
      <MkSection>
        <div className="flex flex-col gap-4 max-w-[700px]">
          <Eyebrow>Services</Eyebrow>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Software and systems work for commercial teams.
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Invariant helps teams clarify the work, design the system, and
            build practical software or automation — scoped before work begins
            and handed off so you can own it.
          </p>
          <p className="text-sm" style={{ color: "var(--mk-color-text-muted)" }}>
            Supporting a federal program?{" "}
            <Link href="/federal" style={{ color: "var(--mk-color-link)" }}>
              See Federal &amp; Defense
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={PROJECT_INTAKE_HREF}
              className={PRIMARY_BTN}
              style={{ background: "var(--mk-color-cta)", color: "var(--mk-color-bg)" }}
            >
              Discuss a project
            </Link>
            <Link
              href="/pricing"
              className={SECONDARY_BTN}
              style={{ borderColor: "var(--mk-color-border)", color: "var(--mk-color-text)" }}
            >
              See Pricing
            </Link>
          </div>
        </div>
      </MkSection>

      {/* ── SERVICE AREAS ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <div>
            <Eyebrow>What we work on</Eyebrow>
            <H2>Service areas</H2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_AREAS.map((s) => (
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
                {s.href && (
                  <Link
                    href={s.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold no-underline hover:underline"
                    style={{ color: "var(--mk-color-link)" }}
                  >
                    More <span aria-hidden>→</span>
                  </Link>
                )}
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── DEEP DIVES (ids preserved from /solutions) ── */}
      {DEEP_DIVES.map((dive, i) => (
        <MkSection key={dive.id} id={dive.id} tone={i % 2 === 1 ? "surface-1" : "default"}>
          <div className="flex flex-col gap-8">
            <div className="max-w-[680px]">
              <Eyebrow>Deep dive</Eyebrow>
              <H2>{dive.title}</H2>
              <p
                className="mt-3 leading-[1.6]"
                style={{
                  fontSize: "var(--mk-type-size-body)",
                  color: "var(--mk-color-text)",
                  opacity: 0.85,
                }}
              >
                {dive.intro}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dive.items.map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-[var(--mk-radius-md)] border"
                  style={{
                    borderColor: "var(--mk-color-border)",
                    background:
                      i % 2 === 1 ? "var(--mk-color-bg)" : "transparent",
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
      ))}

      {/* ── WHO IT IS FOR ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <div>
            <Eyebrow>Who it is for</Eyebrow>
            <H2>Teams that need software that actually ships</H2>
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

      {/* ── ENGAGEMENT TYPES ── */}
      <MkSection id="engagements">
        <div className="flex flex-col gap-8">
          <div>
            <Eyebrow>Engagements</Eyebrow>
            <H2>How we engage</H2>
            <p
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Every engagement runs on agreed deliverables.{" "}
              <Link href="/pricing" style={{ color: "var(--mk-color-link)" }}>
                See commercial pricing
              </Link>
              .
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENGAGEMENT_TYPES.map((t) => (
              <div
                key={t.title}
                className="p-5 rounded-[var(--mk-radius-md)] border"
                style={{ borderColor: "var(--mk-color-border)" }}
              >
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ color: "var(--mk-color-text)" }}
                >
                  {t.title}
                </h3>
                <p
                  className="text-sm leading-[1.65]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MkSection>

      {/* ── PROCESS ── */}
      <MkSection tone="surface-1">
        <div className="flex flex-col gap-8">
          <div>
            <Eyebrow>Process</Eyebrow>
            <H2>How engagements run</H2>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROCESS.map((p, i) => (
              <li key={p.title} className="flex gap-4">
                <span
                  className="font-semibold shrink-0"
                  style={{
                    color: "var(--mk-color-link)",
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--mk-color-text)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.65]"
                    style={{ color: "var(--mk-color-text-muted)" }}
                  >
                    {p.body}
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
            Discuss a project.
          </h2>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-small)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            Tell us what you&apos;re trying to solve. We review every inquiry
            and respond within 2–3 business days.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={PROJECT_INTAKE_HREF}
              className={PRIMARY_BTN}
              style={{ background: "var(--mk-color-cta)", color: "var(--mk-color-bg)" }}
            >
              Discuss a project
            </Link>
            <Link
              href="/pricing"
              className={SECONDARY_BTN}
              style={{ borderColor: "var(--mk-color-border)", color: "var(--mk-color-text)" }}
            >
              See Pricing
            </Link>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
