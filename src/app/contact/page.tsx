import type { Metadata } from "next";
import { TrackedButton, TrackedLink } from "@/components/analytics/PublicAnalytics";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";
import { PUBLIC_ENTRY_POINTS } from "@/content/publicEntries";

const PRIMARY_CTA_LABEL = "Schedule a Strategy Call";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Use the approved public intake path to schedule a strategy call, request access, or begin login onboarding.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <MkSection>
        <div className="max-w-3xl">
          <h1
            className="font-semibold"
            style={{
              fontSize: "var(--mk-type-size-h1)",
              lineHeight: "var(--mk-type-lh-tight)",
            }}
          >
            Contact
          </h1>
          <p className="mt-6" style={{ color: "var(--mk-color-text-muted)" }}>
            Use the approved public intake path to schedule a strategy call,
            request access, or begin login onboarding for Scientia.io.
          </p>
        </div>
      </MkSection>

      <MkSection>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <MkCard>
            <form className="space-y-5" method="post" action="#">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span
                    className="text-sm"
                    style={{ color: "var(--mk-color-text-muted)" }}
                  >
                    Name
                  </span>
                  <input
                    name="name"
                    required
                    className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span
                    className="text-sm"
                    style={{ color: "var(--mk-color-text-muted)" }}
                  >
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span
                  className="text-sm"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  Organization (optional)
                </span>
                <input
                  name="org"
                  className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span
                  className="text-sm"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  What are you trying to solve?
                </span>
                <textarea
                  name="problem"
                  required
                  rows={5}
                  className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span
                  className="text-sm"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  Timeline
                </span>
                <input
                  name="timeline"
                  required
                  className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
                />
              </label>

              <div className="pt-2">
                <TrackedButton
                  type="submit"
                  event="public_cta_click"
                  label={PRIMARY_CTA_LABEL}
                  location="contact_form"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--mk-radius-md)] bg-[var(--mk-color-cta)] px-6 py-4 text-sm font-semibold text-[var(--mk-color-bg)] transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[var(--mk-color-cta-hover)]"
                >
                  {PRIMARY_CTA_LABEL}
                </TrackedButton>
              </div>

              <div
                className="text-sm"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                We review inquiries for fit. Public docs and learning materials
                stay on this site; private login access is provisioned only for
                approved workspace members.
              </div>
            </form>
          </MkCard>

          <div className="space-y-6">
            <MkCard>
              <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
                Before you submit
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                <li>Review the public security posture and governance framing.</li>
                <li>Use this form for strategy-call and request-access routing.</li>
                <li>Login access is approved and provisioned privately.</li>
              </ul>
            </MkCard>

            <MkCard>
              <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
                Public entry links
              </h2>
              <div className="mt-4 space-y-3">
                {PUBLIC_ENTRY_POINTS.map((entry) => (
                  <TrackedLink
                    key={entry.title}
                    href={entry.href}
                    event="public_entry_click"
                    label={entry.label}
                    location="contact_sidebar"
                    className="block text-sm font-semibold text-[var(--mk-color-link)]"
                  >
                    {entry.title}: {entry.label}
                  </TrackedLink>
                ))}
              </div>
            </MkCard>
          </div>
        </div>
      </MkSection>
    </div>
  );
}
