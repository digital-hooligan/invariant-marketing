import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/PublicAnalytics";
import { MkCard } from "@/components/mk/MkCard";
import { MkSection } from "@/components/mk/MkSection";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant marketing site",
} as const;

export const metadata: Metadata = {
  title: "Digital Hooligan LLC",
  description:
    "Applied systems work for organizations that need clearer decisions, tighter workflows, and structured execution.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Digital Hooligan LLC",
    description:
      "Applied systems work for organizations that need clearer decisions, tighter workflows, and structured execution.",
    url: "/",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Hooligan LLC",
    description:
      "Applied systems work for organizations that need clearer decisions, tighter workflows, and structured execution.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SERVICES = [
  {
    title: "Decision architecture",
    body: "Clarify how important choices are framed, reviewed, and carried into execution.",
  },
  {
    title: "Workflow design",
    body: "Reshape how work moves across people, tools, and responsibilities so operations stay legible.",
  },
  {
    title: "Applied implementation",
    body: "Build the systems, tooling, and automation required to make the operating model usable in practice.",
  },
] as const;

const ENGAGEMENTS = [
  {
    title: "Offering",
    href: "/offering",
    body: "Start with how Invariant structures scoped engagements and delivery increments.",
  },
  {
    title: "Solutions",
    href: "/solutions",
    body: "See the categories of systems work Invariant handles for founder-led and operationally complex teams.",
  },
  {
    title: "Pricing",
    href: "/pricing",
    body: "Review the current pricing structure for discovery, sprint, and retained work.",
  },
] as const;

export default function HomePage() {
  return (
    <div>
      <MkSection>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
              Invariant
            </p>
            <h1 className="text-[48px] font-semibold leading-[1.02] text-[var(--mk-color-text)] md:text-[64px]">
              Applied systems work for organizations that need clearer
              decisions and stronger execution.
            </h1>
            <p className="max-w-[64ch] text-[18px] leading-[1.7] text-[var(--mk-color-text)] opacity-90">
              Invariant is the studio and marketing surface for Digital
              Hooligan LLC. We work with founder-led and operationally complex
              teams on decision architecture, workflow design, and
              implementation.
            </p>
            <div className="flex flex-wrap gap-4">
              <TrackedLink
                href="/contact"
                event="public_cta_click"
                label="Start a Conversation"
                location="home_primary"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--mk-radius-md)] bg-[var(--mk-color-cta)] px-6 py-4 text-sm font-semibold text-[#081018] no-underline transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[var(--mk-color-cta-hover)]"
              >
                Start a Conversation
              </TrackedLink>
              <TrackedLink
                href="/offering"
                event="public_cta_click"
                label="View Offering"
                location="home_secondary"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] px-6 py-4 text-sm font-semibold no-underline"
              >
                View Offering
              </TrackedLink>
            </div>
          </div>

          <MkCard>
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
                  Best fit
                </h2>
                <p className="mt-2 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                  Invariant is a strong fit when a team needs clearer operating
                  structure, stronger decision hygiene, and implementation that
                  can survive real constraints.
                </p>
              </div>

              <div className="space-y-3 text-sm text-[var(--mk-color-text)]">
                <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3">
                  Founder-led teams untangling complexity.
                </div>
                <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3">
                  Operators who need more legible workflows.
                </div>
                <div className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3">
                  Teams implementing internal systems, tooling, or applied AI.
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
              What we do
            </p>
            <h2 className="text-[28px] font-semibold leading-[1.15] text-[var(--mk-color-text)] md:text-[40px]">
              Invariant works where operating complexity starts to outrun the
              team&apos;s current systems.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <MkCard key={service.title}>
                <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.75] text-[var(--mk-color-text-muted)]">
                  {service.body}
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
              Explore the studio
            </p>
            <h2 className="text-[28px] font-semibold leading-[1.15] text-[var(--mk-color-text)] md:text-[40px]">
              Start with the route that matches the decision you are making now.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {ENGAGEMENTS.map((item) => (
              <MkCard key={item.title}>
                <TrackedLink
                  href={item.href}
                  event="public_nav_click"
                  label={item.title}
                  location="home_engagements"
                  className="no-underline"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.75] text-[var(--mk-color-text-muted)]">
                      {item.body}
                    </p>
                  </div>
                </TrackedLink>
              </MkCard>
            ))}
          </div>
        </div>
      </MkSection>
    </div>
  );
}
