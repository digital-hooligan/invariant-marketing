import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/PublicAnalytics";
import { MkCard } from "@/components/mk/MkCard";
import { MkSection } from "@/components/mk/MkSection";

const PRIMARY_CTA_LABEL = "Request Cohort Access";
const PRIMARY_CTA_HREF = "/contact";
const SECONDARY_CTA_LABEL = "See the Broader Public Site";
const SECONDARY_CTA_HREF = "/";

const IMPLEMENTATION_RULES = [
  {
    title: "Current role",
    body: "This route is the temporary campaign and conversion surface for the current early cohort.",
  },
  {
    title: "Route placement",
    body: "The cohort page lives at /cohort so the homepage can remain a separate long-term public site surface.",
  },
  {
    title: "Migration path",
    body: "As the broader public site expands, /cohort stays a focused conversion endpoint instead of becoming a homepage substitute.",
  },
] as const;

export const metadata: Metadata = {
  title: "Early Cohort",
  description:
    "Temporary campaign and conversion surface for the current early cohort.",
  alternates: { canonical: "/cohort" },
};

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

      <article className="w-full">
        <MkSection>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
                  Early cohort
                </p>
                <h1 className="text-[34px] font-semibold leading-[1.05] text-[var(--mk-color-text)] md:text-[56px]">
                  Request access to the current cohort.
                </h1>
                <p className="max-w-[68ch] text-[18px] leading-[1.6] text-[var(--mk-color-text)] opacity-90">
                  This page is the temporary campaign and conversion surface for
                  the current early cohort. It exists to route qualified
                  interest into a single request path without taking on homepage
                  or broader public-site responsibilities.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <TrackedLink
                  href={PRIMARY_CTA_HREF}
                  event="public_cta_click"
                  label={PRIMARY_CTA_LABEL}
                  location="cohort_hero_primary"
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

                <TrackedLink
                  href={SECONDARY_CTA_HREF}
                  event="public_cta_click"
                  label={SECONDARY_CTA_LABEL}
                  location="cohort_hero_secondary"
                  className="text-sm font-semibold text-[var(--mk-color-link)]"
                >
                  {SECONDARY_CTA_LABEL}
                </TrackedLink>
              </div>

              <p className="max-w-[68ch] text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                Majority inbound traffic can land here during early rollout
                without changing the ownership of the homepage. Route stability
                stays fixed at /cohort while lifecycle classification shifts
                later through explicit scope decisions.
              </p>
            </div>

            <MkCard>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
                  Conversion boundary
                </h2>
                <p className="text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                  One action lives here: request access to the current cohort.
                  This route does not branch into alternate funnels, simulate
                  site navigation, or stand in for the broader public surface.
                </p>
              </div>
            </MkCard>
          </div>
        </MkSection>

        <MkSection tone="surface-1">
          <div className="space-y-6">
            <div className="max-w-[72ch] space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
                Rollout guidance
              </p>
              <h2 className="text-[28px] font-semibold leading-[1.15] text-[var(--mk-color-text)] md:text-[40px]">
                Keep the campaign route stable while the broader site catches
                up.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {IMPLEMENTATION_RULES.map((rule) => (
                <MkCard key={rule.title}>
                  <h3 className="text-lg font-semibold text-[var(--mk-color-text)]">
                    {rule.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                    {rule.body}
                  </p>
                </MkCard>
              ))}
            </div>
          </div>
        </MkSection>
      </article>
    </>
  );
}
