import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import {
  DIRECT_CONTACT_EMAIL,
  PROJECT_INTAKE_HREF,
  TEAMING_INTAKE_HREF,
  type InquiryType,
} from "@/content/intake";
import { ContactForm } from "./ContactForm";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant marketing site",
} as const;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss a federal work package or a commercial project with Invariant. We review every inquiry and respond within 2–3 business days.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact",
    description:
      "Discuss a federal work package or a commercial project with Invariant. We review every inquiry and respond within 2–3 business days.",
    url: "/contact",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description:
      "Discuss a federal work package or a commercial project with Invariant. We review every inquiry and respond within 2–3 business days.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

const COPY: Record<
  InquiryType,
  { heading: string; body: string; tab: string; href: string }
> = {
  teaming: {
    tab: "Federal teaming",
    href: TEAMING_INTAKE_HREF,
    heading: "Discuss a work package.",
    body: "Tell us about the program or opportunity, the scope of work, and the timeline. If those details are still being defined, share what you know — early conversations are welcome.",
  },
  project: {
    tab: "Commercial project",
    href: PROJECT_INTAKE_HREF,
    heading: "Discuss a project.",
    body: "Tell us what you're trying to build and what's in your way. We review every inquiry for fit — no automated responses.",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const { type } = await searchParams;
  const inquiryType: InquiryType = type === "project" ? "project" : "teaming";
  const copy = COPY[inquiryType];

  return (
    <article className="w-full">
      <MkSection>
        <div className="flex flex-col gap-3 max-w-[56ch]">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-link)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Invariant
          </span>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--mk-color-text)",
            }}
          >
            {copy.heading}
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            {copy.body}
          </p>
        </div>
      </MkSection>

      <MkSection tone="surface-1">
        <div className="max-w-2xl flex flex-col gap-6">
          <nav aria-label="Inquiry type" className="flex flex-wrap gap-2">
            {(Object.keys(COPY) as InquiryType[]).map((key) => {
              const active = key === inquiryType;
              return (
                <Link
                  key={key}
                  href={COPY[key].href}
                  scroll={false}
                  aria-current={active ? "page" : undefined}
                  className="inline-flex items-center justify-center min-h-[40px] rounded-[var(--mk-radius-md)] border px-4 py-2 text-sm font-semibold no-underline transition-colors duration-[120ms]"
                  style={{
                    borderColor: active
                      ? "var(--mk-color-link)"
                      : "var(--mk-color-border)",
                    color: active
                      ? "var(--mk-color-text)"
                      : "var(--mk-color-text-muted)",
                    background: active ? "var(--mk-color-bg)" : "transparent",
                  }}
                >
                  {COPY[key].tab}
                </Link>
              );
            })}
          </nav>
          <ContactForm key={inquiryType} inquiryType={inquiryType} />
        </div>
      </MkSection>

      <MkSection>
        <div className="flex flex-col gap-6 max-w-[56ch]">
          <div
            className="flex flex-col gap-2 text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            <p>
              <strong style={{ color: "var(--mk-color-text)" }}>
                What happens next:
              </strong>{" "}
              We read every submission. If there&apos;s a fit, we&apos;ll reach
              out within 2–3 business days to schedule a conversation. If
              we&apos;re not the right team for your project, we&apos;ll tell
              you that directly.
            </p>
            <p>
              Every engagement runs on agreed deliverables — including ongoing
              Fractional Systems Partner support.
            </p>
            <p>
              Prefer email? Write to{" "}
              <a
                href={`mailto:${DIRECT_CONTACT_EMAIL}`}
                style={{ color: "var(--mk-color-link)" }}
              >
                {DIRECT_CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "var(--mk-color-text-muted)",
                fontFamily: "var(--mk-type-font-mono)",
              }}
            >
              Follow Digital Hooligan
            </p>
            <div className="flex gap-5">
              <a
                href="https://www.linkedin.com/company/digital-hooligan-llc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Digital Hooligan on LinkedIn"
                className="text-sm hover:underline no-underline"
                style={{ color: "var(--mk-color-link)" }}
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/DHooliganIO"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Digital Hooligan on X"
                className="text-sm hover:underline no-underline"
                style={{ color: "var(--mk-color-link)" }}
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
