import Link from "next/link";
import type { Metadata } from "next";
import { ContactIntakeForm } from "@/components/contact/ContactIntakeForm";
import { MkCard } from "@/components/mk/MkCard";
import { MkSection } from "@/components/mk/MkSection";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant marketing site",
} as const;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation about discovery, implementation, or ongoing systems work with Invariant.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact",
    description:
      "Start a conversation about discovery, implementation, or ongoing systems work with Invariant.",
    url: "/contact",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description:
      "Start a conversation about discovery, implementation, or ongoing systems work with Invariant.",
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
            Start a conversation
          </h1>
          <p className="mt-6" style={{ color: "var(--mk-color-text-muted)" }}>
            Tell us what you are trying to build or fix. We&apos;ll review and
            respond with next steps if there&apos;s a fit.
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
                <li>Use this form for studio and engagement inquiries.</li>
                <li>Share enough context for scope, timing, and fit review.</li>
                <li>Replies are routed through a founder-managed inbox.</li>
                <li>
                  Information submitted here is used only to respond to your
                  inquiry.
                </li>
              </ul>
              <p className="mt-4 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                See the{" "}
                <Link href="/privacy" className="font-medium">
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
            </MkCard>

            <MkCard>
              <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
                ScientiaOS public entry
              </h2>
              <p className="mt-4 text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
                If you are looking for platform explanation, security posture,
                governance, or admissions for Scientia, start at{" "}
                <a href="https://scientiaos.io/admissions/apply">
                  scientiaos.io/admissions/apply
                </a>
                . The Invariant contact form stays focused on studio and
                engagement inquiries.
              </p>
            </MkCard>
          </div>
        </div>
      </MkSection>
    </div>
  );
}
