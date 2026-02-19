import Link from "next/link";
import type { Metadata } from "next";
import { getHomePage } from "@/content/pages";

const PRIMARY_CTA_LABEL = "Start a Conversation";
const PRIMARY_CTA_HREF = "/contact";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getHomePage();
  return {
    title: frontmatter.seo.title,
    description: frontmatter.seo.description,
    alternates: { canonical: frontmatter.seo.canonical },
    openGraph: {
      title: frontmatter.seo.title,
      description: frontmatter.seo.description,
      url: frontmatter.seo.canonical,
    },
  };
}

function PrimaryCta({
  fullWidthOnMobile = false,
}: {
  fullWidthOnMobile?: boolean;
}) {
  return (
    <Link
      href={PRIMARY_CTA_HREF}
      className={[
        "inline-flex items-center justify-center",
        "min-h-[44px]",
        "rounded-[var(--mk-radius-md)]",
        "px-6 py-4",
        "text-sm font-semibold",
        "no-underline",
        "bg-[var(--mk-color-cta)]",
        "text-[var(--mk-color-bg)]",
        "hover:bg-[var(--mk-color-cta-hover)]",
        "transition-colors",
        "duration-[120ms]",
        "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        fullWidthOnMobile ? "w-full md:w-auto" : "",
      ].join(" ")}
    >
      {PRIMARY_CTA_LABEL}
    </Link>
  );
}

function Section({
  children,
  dense = false,
}: {
  children: React.ReactNode;
  dense?: boolean;
}) {
  return (
    <section
      className={["w-full", dense ? "py-12 md:py-16" : "py-14 md:py-24"].join(
        " ",
      )}
    >
      {children}
    </section>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto w-full px-6"
      style={{ maxWidth: "var(--mk-layout-content-max)" }}
    >
      {children}
    </div>
  );
}

export default async function HomePage() {
  // Preserve content source-of-truth loading (keeps content pipeline warm),
  // but render the canon wireframe structure directly for "/" route.
  void (await getHomePage());

export default function HomePage() {
  return (
    <article className="w-full">
      {/* SECTION 1 — HERO */}
      <Section>
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-[32px] md:text-[48px] leading-[1.1] font-semibold text-[var(--mk-color-text)]">
                Structure for decisions that actually move the work forward.
              </h1>

              <p className="text-[18px] leading-[1.5] text-[var(--mk-color-text)] opacity-90 max-w-[72ch]">
                Invariant helps teams reduce execution drift by clarifying what
                matters, defining scope, and shipping in controlled increments.
              </p>

              <div className="text-[14px] leading-[1.5] text-[var(--mk-color-text-muted)] max-w-[80ch] flex flex-col gap-2">
                <p>
                  Human-led engagements. No automation. No predictive systems.
                </p>
                <p>
                  Invariant is a consulting studio. We do not provide software
                  platforms or automated decision systems.
                </p>
              </div>
            </div>

            <div className="flex">
              <PrimaryCta fullWidthOnMobile />
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 2 — TRUST FRAME (3 Pillars) */}
      <Section dense>
        <Container>
          <div className="flex flex-col gap-8">
            <h2 className="text-[24px] md:text-[32px] leading-[1.2] font-semibold text-[var(--mk-color-text)]">
              How the work stays grounded
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Structured Thinking
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Decisions are framed with explicit constraints, assumptions,
                  and review points.
                </p>
              </div>

              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Operator-Led Delivery
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Work is led by humans with accountable execution—no delegated
                  “autonomy” claims.
                </p>
              </div>

              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Defined Scope Discipline
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Engagements follow defined scopes and written agreements.
                  Outcomes depend on client participation and constraints.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 3 — PROBLEM FRAMING */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6">
            <h2 className="text-[24px] md:text-[32px] leading-[1.2] font-semibold text-[var(--mk-color-text)]">
              When work loses structure, decisions decay
            </h2>

            <p className="text-[18px] leading-[1.5] text-[var(--mk-color-text)] opacity-90 max-w-[72ch]">
              Most teams don’t lack tools. They lack a stable decision surface:
              clear constraints, review cadence, and ownership. Without that,
              execution drifts and priorities reshuffle faster than the work can
              ship.
            </p>

            <ul className="list-disc pl-6 text-[16px] leading-[1.6] text-[var(--mk-color-text)] opacity-90">
              <li>Meetings replace movement</li>
              <li>Tools multiply without clarity</li>
              <li>Decisions decay without review</li>
            </ul>

            <p className="text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
              We do not replace executive judgment. We structure it.
            </p>
          </div>
        </Container>
      </Section>

      {/* SECTION 4 — APPROACH OVERVIEW */}
      <Section dense>
        <Container>
          <div className="flex flex-col gap-8">
            <h2 className="text-[24px] md:text-[32px] leading-[1.2] font-semibold text-[var(--mk-color-text)]">
              A simple operating pattern
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Define the decision surface
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Clarify what must be decided, by whom, and under what
                  constraints.
                </p>
              </div>

              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Clarify constraints
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Make tradeoffs explicit early so execution doesn’t collapse
                  later.
                </p>
              </div>

              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Align execution
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Convert decisions into scoped increments that can ship and be
                  reviewed.
                </p>
              </div>
            </div>

            <p className="text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
              Delivered through defined consulting engagements, not software
              deployment.
            </p>
          </div>
        </Container>
      </Section>

      {/* SECTION 5 — ENGAGEMENT FLOW (3-Step) */}
      <Section>
        <Container>
          <div className="flex flex-col gap-8">
            <h2 className="text-[24px] md:text-[32px] leading-[1.2] font-semibold text-[var(--mk-color-text)]">
              Engagement flow
            </h2>

            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-decimal pl-6 md:pl-0">
              <li className="md:list-none rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <div className="text-[14px] text-[var(--mk-color-text-muted)]">
                  Step 1
                </div>
                <div className="mt-1 text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Conversation
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Exploratory. Not legal/financial/compliance advice.
                </p>
              </li>

              <li className="md:list-none rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <div className="text-[14px] text-[var(--mk-color-text-muted)]">
                  Step 2
                </div>
                <div className="mt-1 text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Scope &amp; Proposal
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Define constraints, deliverables, and review cadence before
                  work begins.
                </p>
              </li>

              <li className="md:list-none rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <div className="text-[14px] text-[var(--mk-color-text-muted)]">
                  Step 3
                </div>
                <div className="mt-1 text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Build &amp; Ship
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Structured execution with scoped increments and documented
                  decisions.
                </p>
              </li>
            </ol>
          </div>
        </Container>
      </Section>

      {/* SECTION 6 — CTA BLOCK */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 items-start">
            <h2 className="text-[24px] md:text-[32px] leading-[1.2] font-semibold text-[var(--mk-color-text)]">
              Start a Conversation
            </h2>

            <p className="text-[18px] leading-[1.5] text-[var(--mk-color-text)] opacity-90 max-w-[72ch]">
              We’ll review your inquiry and respond within X business days.
            </p>

            <PrimaryCta fullWidthOnMobile />

            <p className="text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
              Subject to scope review and mutual fit.
            </p>
          </div>
        </Container>
      </Section>
    </article>
  );
}
