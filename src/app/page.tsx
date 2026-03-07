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

  return (
    <article className="w-full">
      {/* SECTION 1 — HERO */}
      <Section>
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-[32px] md:text-[48px] leading-[1.1] font-semibold text-[var(--mk-color-text)]">
                Decisions deserve better systems.
              </h1>

              <p className="text-[18px] leading-[1.5] text-[var(--mk-color-text)] opacity-90 max-w-[72ch]">
                Organizations collect signals everywhere: documents, dashboards,
                meetings, and chat threads. The decisions those signals should
                inform often remain scattered and unclear.
              </p>

              <div className="text-[14px] leading-[1.5] text-[var(--mk-color-text-muted)] max-w-[80ch] flex flex-col gap-2">
                <p>
                  Scientia introduces a decision-centric operating model.
                </p>
                <p>
                  Scientia.io provides the platform that runs that model.
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
              Why This Matters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Clarity
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Decisions are visible and understandable.
                </p>
              </div>

              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Traceability
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Evidence and reasoning remain attached to outcomes.
                </p>
              </div>

              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Accountability
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Teams know how and why choices were made.
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
              The Problem
            </h2>

            <p className="text-[18px] leading-[1.5] text-[var(--mk-color-text)] opacity-90 max-w-[72ch]">
              Modern work generates signals, but decisions still disappear.
              Teams gather information constantly, yet the surrounding context
              is often lost when decisions happen.
            </p>

            <ul className="list-disc pl-6 text-[16px] leading-[1.6] text-[var(--mk-color-text)] opacity-90">
              <li>Decisions without clear evidence</li>
              <li>Repeated mistakes because context disappears</li>
              <li>Teams debating the same issues again</li>
              <li>No traceable reasoning behind important choices</li>
            </ul>

            <p className="text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
              Organizations accumulate data, but not decision clarity.
            </p>
          </div>
        </Container>
      </Section>

      {/* SECTION 4 — APPROACH OVERVIEW */}
      <Section dense>
        <Container>
          <div className="flex flex-col gap-8">
            <h2 className="text-[24px] md:text-[32px] leading-[1.2] font-semibold text-[var(--mk-color-text)]">
              A Decision-Centric Operating Model
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Signals
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Incoming information and evidence are structured instead of
                  remaining scattered across tools.
                </p>
              </div>

              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Context
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Decisions stay connected to historical and situational
                  understanding.
                </p>
              </div>

              <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <h3 className="text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Decisions
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Choices become first-class objects linked to evidence,
                  context, and execution.
                </p>
              </div>
            </div>

            <p className="text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
              This creates a continuous chain from signal to context to
              decision to execution.
            </p>
          </div>
        </Container>
      </Section>

      {/* SECTION 5 — ENGAGEMENT FLOW (3-Step) */}
      <Section>
        <Container>
          <div className="flex flex-col gap-8">
            <h2 className="text-[24px] md:text-[32px] leading-[1.2] font-semibold text-[var(--mk-color-text)]">
              The Platform That Implements the Model
            </h2>

            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-decimal pl-6 md:pl-0">
              <li className="md:list-none rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <div className="text-[14px] text-[var(--mk-color-text-muted)]">
                  Element 1
                </div>
                <div className="mt-1 text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Signals
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Structure incoming signals and preserve evidence.
                </p>
              </li>

              <li className="md:list-none rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <div className="text-[14px] text-[var(--mk-color-text-muted)]">
                  Element 2
                </div>
                <div className="mt-1 text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Context
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Maintain continuity around events and discussions.
                </p>
              </li>

              <li className="md:list-none rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6">
                <div className="text-[14px] text-[var(--mk-color-text-muted)]">
                  Element 3
                </div>
                <div className="mt-1 text-[18px] font-semibold text-[var(--mk-color-text)]">
                  Decisions
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
                  Record and govern decisions with evidence and reasoning.
                </p>
              </li>
            </ol>
            <p className="text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
              Execution is instrumented so actions connected to decisions remain
              visible over time.
            </p>
          </div>
        </Container>
      </Section>

      {/* SECTION 6 — CTA BLOCK */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 items-start">
            <h2 className="text-[24px] md:text-[32px] leading-[1.2] font-semibold text-[var(--mk-color-text)]">
              Move from scattered signals to structured decisions
            </h2>

            <p className="text-[18px] leading-[1.5] text-[var(--mk-color-text)] opacity-90 max-w-[72ch]">
              Scientia defines the model. Scientia.io is the platform that
              implements it. Explore how the system works in practice.
            </p>

            <PrimaryCta fullWidthOnMobile />

            <p className="text-[14px] leading-[1.6] text-[var(--mk-color-text-muted)]">
              Digital Hooligan LLC created the Scientia system and the
              Scientia.io platform.
            </p>
          </div>
        </Container>
      </Section>
    </article>
  );
}
