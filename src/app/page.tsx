import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/PublicAnalytics";
import { MkCard } from "@/components/mk/MkCard";
import { MkSection } from "@/components/mk/MkSection";
import { PUBLIC_ENTRY_POINTS } from "@/content/publicEntries";
import { getHomePage } from "@/content/pages";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Scientia.io public site",
} as const;

const PRIMARY_CTA_LABEL = "Schedule a Strategy Call";
const PRIMARY_CTA_HREF = "/contact";
const SECONDARY_CTA_LABEL = "Read Security Posture";
const SECONDARY_CTA_HREF = "/security";

const AUDIENCE_GROUPS = [
  {
    title: "Operators and program leads",
    body: "Teams that need decisions to remain legible across handoffs, reviews, and execution follow-through.",
  },
  {
    title: "Executives and governance owners",
    body: "Leaders who need a durable record of what was decided, why it was decided, and what evidence supported it.",
  },
  {
    title: "Security, compliance, and trust evaluators",
    body: "Reviewers who need clear public boundaries, auditability language, and a trustworthy entry path before private access is granted.",
  },
] as const;

const SYSTEM_MODULES = [
  {
    title: "Signals",
    body: "Incoming information is collected as evidence instead of disappearing into isolated tools and threads.",
  },
  {
    title: "Context",
    body: "The surrounding history, constraints, and prior decisions remain connected to what teams are evaluating now.",
  },
  {
    title: "Decisions",
    body: "Important choices are treated as first-class objects with rationale, evidence, and accountable ownership.",
  },
  {
    title: "Execution",
    body: "Follow-through stays visible so the path from decision to action can be reviewed later.",
  },
] as const;

const TRUST_PILLARS = [
  {
    title: "Evidence attached to outcomes",
    body: "Scientia frames decisions around explicit evidence and reasoning rather than implied context or oral history.",
  },
  {
    title: "Auditability without surface creep",
    body: "The public site explains trust posture and qualified entry points without exposing app, admin, founder, or operator workflows.",
  },
  {
    title: "Boundary-safe public entry",
    body: "Docs, learning materials, and request-access paths live on the public surface while protected access remains provisioned privately.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getHomePage();

  return {
    title: frontmatter.seo.title,
    description: frontmatter.seo.description,
    alternates: { canonical: frontmatter.seo.canonical },
    openGraph: {
      type: "website",
      title: frontmatter.seo.title,
      description: frontmatter.seo.description,
      url: frontmatter.seo.canonical,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.seo.title,
      description: frontmatter.seo.description,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function PrimaryCta({ location }: { location: string }) {
  return (
    <TrackedLink
      href={PRIMARY_CTA_HREF}
      event="public_cta_click"
      label={PRIMARY_CTA_LABEL}
      location={location}
      className={[
        "inline-flex min-h-[44px] items-center justify-center",
        "rounded-[var(--mk-radius-md)]",
        "bg-[var(--mk-color-cta)]",
        "px-6 py-4",
        "text-sm font-semibold",
        "text-[var(--mk-color-bg)] no-underline",
        "transition-colors duration-[120ms]",
        "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        "hover:bg-[var(--mk-color-cta-hover)]",
      ].join(" ")}
    >
      {PRIMARY_CTA_LABEL}
    </TrackedLink>
  );
}

function SecondaryCta({ location }: { location: string }) {
  return (
    <TrackedLink
      href={SECONDARY_CTA_HREF}
      event="public_cta_click"
      label={SECONDARY_CTA_LABEL}
      location={location}
      className={[
        "inline-flex min-h-[44px] items-center justify-center",
        "rounded-[var(--mk-radius-md)] border",
        "border-[var(--mk-color-border)]",
        "px-6 py-4",
        "text-sm font-semibold text-[var(--mk-color-text)] no-underline",
        "transition-colors duration-[120ms]",
        "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        "hover:bg-[var(--mk-color-surface-1)]",
      ].join(" ")}
    >
      {SECONDARY_CTA_LABEL}
    </TrackedLink>
  );
}

export default async function HomePage() {
  void (await getHomePage());

  return (
    <article className="w-full">
      <MkSection>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)] lg:items-end">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
                Public Scientia platform site v0.1
              </p>
              <h1 className="text-[34px] font-semibold leading-[1.05] text-[var(--mk-color-text)] md:text-[56px]">
                Decisions deserve a public surface that is clear, bounded, and
                defensible.
              </h1>
              <p className="max-w-[70ch] text-[18px] leading-[1.6] text-[var(--mk-color-text)] opacity-90">
                Scientia is the system. Scientia.io is the platform entry
                surface. This site explains what the platform is, who it is
                for, and how to reach documentation, learning material, login
                onboarding, and request-access paths without exposing protected
                workflows.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryCta location="home_hero_primary" />
              <SecondaryCta location="home_hero_secondary" />
            </div>

            <p className="max-w-[72ch] text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
              The public site does not expose app, admin, founder, or operator
              workflow functionality. It is the durable public entry layer for
              trust, documentation, and qualified access.
            </p>
          </div>

          <MkCard>
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
                  What this public surface covers
                </h2>
                <p className="mt-2 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                  Trust framing, system orientation, approved CTA paths, and
                  public docs/learn/login entry points.
                </p>
              </div>

              <div className="space-y-3 text-sm text-[var(--mk-color-text)]">
                <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3">
                  Scientia defines the decision-centric system.
                </div>
                <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3">
                  Scientia.io provides the platform entry surface.
                </div>
                <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3">
                  Protected access is provisioned privately after qualification.
                </div>
              </div>
            </div>
          </MkCard>
        </div>
      </MkSection>

      <MkSection tone="surface-1">
        <div className="space-y-6">
          <div className="max-w-[72ch] space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
              What Scientia is
            </p>
            <h2 className="text-[28px] font-semibold leading-[1.15] text-[var(--mk-color-text)] md:text-[40px]">
              A decision-centric system with a public platform entry layer.
            </h2>
            <p className="text-[18px] leading-[1.6] text-[var(--mk-color-text)] opacity-90">
              Organizations already collect signals from documents, dashboards,
              meetings, and chat threads. Scientia introduces the system for
              structuring that information around accountable decisions.
              Scientia.io is the platform surface where buyers, evaluators, and
              approved users begin.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <MkCard>
              <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                System
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                Scientia defines the operating model and the governance
                language.
              </p>
            </MkCard>
            <MkCard>
              <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                Platform
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                Scientia.io provides the approved public entry and orientation
                surface for that model.
              </p>
            </MkCard>
            <MkCard>
              <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                Boundary
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                Protected app and internal workflow functionality remain outside
                this public site.
              </p>
            </MkCard>
          </div>
        </div>
      </MkSection>

      <MkSection>
        <div className="space-y-6">
          <div className="max-w-[72ch] space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
              Who it is for
            </p>
            <h2 className="text-[28px] font-semibold leading-[1.15] text-[var(--mk-color-text)] md:text-[40px]">
              Teams that need trust before private access.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {AUDIENCE_GROUPS.map((group) => (
              <MkCard key={group.title}>
                <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                  {group.body}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      <MkSection tone="surface-1">
        <div className="space-y-6">
          <div className="max-w-[72ch] space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
              System overview
            </p>
            <h2 className="text-[28px] font-semibold leading-[1.15] text-[var(--mk-color-text)] md:text-[40px]">
              The public model is simple: signals, context, decisions, and
              execution stay connected.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {SYSTEM_MODULES.map((module) => (
              <MkCard key={module.title}>
                <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                  {module.body}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      <MkSection>
        <div className="space-y-6">
          <div className="max-w-[72ch] space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
              Trust, evidence, and auditability
            </p>
            <h2 className="text-[28px] font-semibold leading-[1.15] text-[var(--mk-color-text)] md:text-[40px]">
              Public trust comes from explicit boundaries and durable evidence
              language.
            </h2>
            <p className="text-[18px] leading-[1.6] text-[var(--mk-color-text)] opacity-90">
              The site frames Scientia around evidence, traceability, and
              accountability. It deliberately avoids exposing internal operator
              mechanics or implying that private administrative surfaces are
              public.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TRUST_PILLARS.map((pillar) => (
              <MkCard key={pillar.title}>
                <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                  {pillar.body}
                </p>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      <MkSection tone="surface-1">
        <div className="space-y-6">
          <div className="max-w-[72ch] space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
              Docs, learn, and login entry
            </p>
            <h2 className="text-[28px] font-semibold leading-[1.15] text-[var(--mk-color-text)] md:text-[40px]">
              Approved public entry points without workflow leakage.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {PUBLIC_ENTRY_POINTS.map((entry) => (
              <MkCard key={entry.title}>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                      {entry.description}
                    </p>
                  </div>
                  <TrackedLink
                    href={entry.href}
                    event="public_entry_click"
                    label={entry.label}
                    location="home_entry_grid"
                    className="inline-flex text-sm font-semibold text-[var(--mk-color-link)]"
                  >
                    {entry.label}
                  </TrackedLink>
                </div>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>

      <MkSection>
        <div className="rounded-[var(--mk-radius-lg)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-8 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[64ch] space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
                CTA paths
              </p>
              <h2 className="text-[28px] font-semibold leading-[1.15] text-[var(--mk-color-text)] md:text-[40px]">
                Start with public review, then move into qualified access.
              </h2>
              <p className="text-[18px] leading-[1.6] text-[var(--mk-color-text)] opacity-90">
                Use the public docs and learning pages to evaluate fit, then use
                the approved request-access path to schedule a strategy call or
                begin private onboarding.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryCta location="home_final_primary" />
              <SecondaryCta location="home_final_secondary" />
            </div>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
