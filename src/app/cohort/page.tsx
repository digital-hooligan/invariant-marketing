import type { Metadata } from "next";
import { CohortApplicationForm } from "@/components/cohort/CohortApplicationForm";
import { MkCard } from "@/components/mk/MkCard";
import { MkSection } from "@/components/mk/MkSection";

const COHORT_CONTEXT = [
  {
    title: "What this is",
    body: "A limited, working cohort for founders and operators who want clearer visibility into the work that drives their decisions. This is not a public release or open sign-up.",
  },
  {
    title: "Who it is for",
    body: "People actively running teams, reviewing priorities, and carrying real decision weight. It is a fit for builders who want signal, context, and honest feedback, not passive browsing.",
  },
  {
    title: "Why now",
    body: "Most teams are not short on effort. They are short on clarity. This cohort exists to work on that problem directly with a small group in real working conditions.",
  },
] as const;

const SHIFT_POINTS = [
  "See what actually matters and what can wait.",
  "Move with clearer context instead of reacting late.",
  "Review work in a way that is easier to explain and trust.",
] as const;

const PARTICIPATION_GROUPS = [
  {
    title: "What you get",
    items: [
      "A structured way to view your work and decisions.",
      "Clearer context around what is changing and why.",
      "A working environment built to help you notice signals instead of chase them.",
    ],
  },
  {
    title: "What is expected",
    items: [
      "Active participation, not passive access.",
      "Comfort working inside something early and evolving.",
      "Direct feedback on what is useful and what is not.",
    ],
  },
  {
    title: "Access model",
    items: [
      "Limited seats for the current cohort.",
      "Applications are reviewed as capacity allows.",
      "Cohort size and timing are constrained, and placement is not immediate.",
    ],
  },
] as const;

const TRUST_BLOCKS = [
  {
    title: "Early by design",
    body: "This is an early-stage cohort experience, not a polished product launch. Expect something evolving, shaped through real use with a small group.",
  },
  {
    title: "Selective on purpose",
    body: "Not everyone should join. We are looking for founders, operators, and small teams who are actively doing the work and can benefit from clear visibility now.",
  },
  {
    title: "What happens next",
    body: "We review submissions on a rolling basis. Where there is a fit, we follow up with timing and next steps. This does not provide general access to a standalone product or platform.",
  },
] as const;

const TRUST_STRIP = [
  "Small, focused cohort",
  "No hype or overpromises",
  "Built for real operators",
  "Clear visibility into next steps",
] as const;

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Scientia.io public site",
} as const;

export const metadata: Metadata = {
  title: "Early Cohort",
  description:
    "A launch-ready public conversion surface for the current Scientia early cohort.",
  alternates: { canonical: "/cohort" },
  openGraph: {
    type: "website",
    title: "Early Cohort",
    description:
      "A launch-ready public conversion surface for the current Scientia early cohort.",
    url: "/cohort",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Early Cohort",
    description:
      "A launch-ready public conversion surface for the current Scientia early cohort.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
      {children}
    </p>
  );
}

export default function CohortPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header,
            footer {
              display: none;
            }

            main > div {
              max-width: none;
              padding: 0;
            }
          `,
        }}
      />

      <article className="w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.14),transparent_28%),linear-gradient(180deg,#0b0f14_0%,#0e1420_100%)]">
        <MkSection>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <SectionEyebrow>Current early cohort</SectionEyebrow>
                <h1 className="max-w-[12ch] text-[40px] font-semibold leading-[0.98] text-[var(--mk-color-text)] md:text-[72px]">
                  Clarity, not more tools.
                </h1>
                <p className="max-w-[62ch] text-[18px] leading-[1.6] text-[var(--mk-color-text)] opacity-90 md:text-[20px]">
                  A small, early cohort for founders and operators who want to
                  see what actually matters in their work without adding more
                  noise.
                </p>
                <p className="max-w-[64ch] text-sm leading-[1.8] text-[var(--mk-color-text-muted)]">
                  Scientia is being introduced through a small cohort inside the
                  broader RadixOS work. This page is the temporary public
                  invitation for that cohort and nothing more.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[rgba(18,24,36,0.82)] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--mk-color-text-muted)]">
                    Cohort shape
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--mk-color-text)]">
                    Small, reviewed, and intentionally selective
                  </p>
                </div>
                <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[rgba(18,24,36,0.82)] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--mk-color-text-muted)]">
                    Best fit
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--mk-color-text)]">
                    Founders, operators, and small teams carrying live decisions
                  </p>
                </div>
                <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[rgba(18,24,36,0.82)] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--mk-color-text-muted)]">
                    Working promise
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--mk-color-text)]">
                    Clearer visibility, grounded decisions, and honest next
                    steps
                  </p>
                </div>
              </div>
            </div>

            <div id="apply">
              <CohortApplicationForm />
            </div>
          </div>
        </MkSection>

        <MkSection>
          <div className="space-y-6">
            <div className="max-w-[70ch] space-y-3">
              <SectionEyebrow>Cohort context</SectionEyebrow>
              <h2 className="text-[28px] font-semibold leading-[1.08] text-[var(--mk-color-text)] md:text-[42px]">
                A focused invitation for people who feel the cost of unclear
                visibility.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {COHORT_CONTEXT.map((item) => (
                <MkCard key={item.title}>
                  <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.75] text-[var(--mk-color-text-muted)]">
                    {item.body}
                  </p>
                </MkCard>
              ))}
            </div>
          </div>
        </MkSection>

        <MkSection tone="surface-1">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <MkCard>
              <SectionEyebrow>Problem</SectionEyebrow>
              <h2 className="mt-3 text-[28px] font-semibold leading-[1.12] text-[var(--mk-color-text)] md:text-[40px]">
                You are not missing effort. You are missing clarity.
              </h2>
              <p className="mt-4 text-sm leading-[1.8] text-[var(--mk-color-text-muted)]">
                You are juggling tools, dashboards, and updates, but still
                reacting instead of seeing ahead. Important signals get buried.
                Priorities blur. Decisions feel heavier than they should.
              </p>
              <div className="mt-6 rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mk-color-text-muted)]">
                  Noise to clarity
                </p>
                <div className="mt-4 flex flex-col gap-4 text-sm md:flex-row md:items-center">
                  <div className="flex-1 rounded-[var(--mk-radius-sm)] border border-[var(--mk-color-border)] px-4 py-4 text-[var(--mk-color-text-muted)]">
                    Scattered updates, buried signals, reactive reviews
                  </div>
                  <div className="text-center text-[var(--mk-color-link)] md:text-left">
                    to
                  </div>
                  <div className="flex-1 rounded-[var(--mk-radius-sm)] border border-[rgba(45,255,183,0.28)] bg-[rgba(45,255,183,0.08)] px-4 py-4 text-[var(--mk-color-text)]">
                    Clear context, grounded decisions, and work you can explain
                  </div>
                </div>
              </div>
            </MkCard>

            <MkCard>
              <SectionEyebrow>What changes</SectionEyebrow>
              <h2 className="mt-3 text-[28px] font-semibold leading-[1.12] text-[var(--mk-color-text)] md:text-[40px]">
                Not more inputs. Clearer context.
              </h2>
              <ul className="mt-6 space-y-4 text-sm leading-[1.8] text-[var(--mk-color-text-muted)]">
                {SHIFT_POINTS.map((point) => (
                  <li
                    key={point}
                    className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-4"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </MkCard>
          </div>
        </MkSection>

        <MkSection>
          <div className="space-y-6">
            <div className="max-w-[70ch] space-y-3">
              <SectionEyebrow>Participation details</SectionEyebrow>
              <h2 className="text-[28px] font-semibold leading-[1.08] text-[var(--mk-color-text)] md:text-[42px]">
                This is active participation, not passive access.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {PARTICIPATION_GROUPS.map((group) => (
                <MkCard key={group.title}>
                  <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-[1.8] text-[var(--mk-color-text-muted)]">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[var(--mk-color-link)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </MkCard>
              ))}
            </div>
          </div>
        </MkSection>

        <MkSection tone="surface-1">
          <div className="space-y-6">
            <div className="max-w-[70ch] space-y-3">
              <SectionEyebrow>Trust and reassurance</SectionEyebrow>
              <h2 className="text-[28px] font-semibold leading-[1.08] text-[var(--mk-color-text)] md:text-[42px]">
                Honest constraints are part of the offer.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {TRUST_BLOCKS.map((block) => (
                <MkCard key={block.title}>
                  <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.75] text-[var(--mk-color-text-muted)]">
                    {block.body}
                  </p>
                </MkCard>
              ))}
            </div>

            <div className="rounded-[var(--mk-radius-lg)] border border-[var(--mk-color-border)] bg-[rgba(18,24,36,0.9)] px-6 py-5">
              <div className="grid gap-3 md:grid-cols-4">
                {TRUST_STRIP.map((item) => (
                  <p
                    key={item}
                    className="text-sm font-medium leading-[1.6] text-[var(--mk-color-text)]"
                  >
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-xs leading-[1.8] text-[var(--mk-color-text-muted)]">
                This is an early-stage cohort experience. Participation does
                not guarantee product access, feature availability, or specific
                outcomes. Access, timing, and inclusion are determined at our
                discretion based on cohort fit and capacity.
              </p>
            </div>
          </div>
        </MkSection>
      </article>
    </>
  );
}
