import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/PublicAnalytics";
import { ContactIntakeForm } from "@/components/contact/ContactIntakeForm";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";
import { PUBLIC_ENTRY_POINTS } from "@/content/publicEntries";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Scientia.io public site",
} as const;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Use the approved public intake path to request contact or early access for Scientia.io.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact",
    description:
      "Use the approved public intake path to request contact or early access for Scientia.io.",
    url: "/contact",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description:
      "Use the approved public intake path to request contact or early access for Scientia.io.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
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
            Use the approved public intake path to request contact or early
            access for Scientia.io.
          </p>
        </div>
      </MkSection>

      <MkSection>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <MkCard>
            <ContactIntakeForm />
          </MkCard>

          <div className="space-y-6">
            <MkCard>
              <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
                Before you submit
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                <li>Review the public security posture and governance framing.</li>
                <li>Use this form for founder-routed contact and cohort intake.</li>
                <li>Access decisions and follow-up happen privately after review.</li>
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
