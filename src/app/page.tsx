import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";
import {
  CAPABILITY_TIER_LABEL,
  EXAMPLE_LABEL,
  FEDERAL_CAPABILITIES,
  FEDERAL_HANDOFF,
  FEDERAL_WORK_PACKAGE_EXAMPLES,
  SDVOSB_SHORT,
} from "@/content/federal";
import { PROJECT_INTAKE_HREF, TEAMING_INTAKE_HREF } from "@/content/intake";

const TITLE =
  "Invariant — Software integration and modernization for federal prime contractors";
const DESCRIPTION =
  "Invariant is an SBA-certified SDVOSB that helps federal primes connect applications and data, integrate identity and access, and automate workflows with human review.";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — software integration and modernization for federal prime contractors",
} as const;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

function CtaLink({
  href,
  variant = "primary",
  children,
  fullWidth = false,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  const base = [
    "inline-flex items-center justify-center",
    "min-h-[44px]",
    "rounded-[var(--mk-radius-md)]",
    "px-6 py-3",
    "text-sm font-semibold",
    "no-underline",
    "transition-colors",
    "duration-[120ms]",
    "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
  ].join(" ");

  const primary = [
    "bg-[var(--mk-color-cta)]",
    "text-[var(--mk-color-bg)]",
    "hover:bg-[var(--mk-color-cta-hover)]",
  ].join(" ");

  const secondary = [
    "border border-[var(--mk-color-border)]",
    "text-[var(--mk-color-text)]",
    "hover:border-[var(--mk-color-cta)]",
    "hover:text-[var(--mk-color-cta)]",
  ].join(" ");

  return (
    <Link
      href={href}
      className={[
        base,
        variant === "primary" ? primary : secondary,
        fullWidth ? "w-full md:w-auto" : "",
      ]
        .join(" ")
        .trim()}
    >
      {children}
    </Link>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs font-semibold uppercase tracking-widest"
      style={{
        color: "var(--mk-color-link)",
        fontFamily: "var(--mk-type-font-mono)",
      }}
    >
      {children}
    </span>
  );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm font-semibold no-underline hover:underline"
      style={{ color: "var(--mk-color-link)" }}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

const PRIMARY_CAPABILITIES = FEDERAL_CAPABILITIES.filter(
  (c) => c.tier !== "additional",
);

export default function HomePage() {
  return (
    <article className="w-full">
      {/* ── HERO ── */}
      <MkSection>
        <div className="flex flex-col gap-6 max-w-[780px]">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-cta)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Digital Hooligan LLC dba Invariant
          </span>

          <h1
            className="font-semibold leading-[1.05]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Software integration and modernization for federal prime
            contractors.
          </h1>

          <p
            className="leading-[1.6] max-w-[68ch]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.9,
            }}
          >
            Invariant is an SBA-certified SDVOSB that helps federal primes
            connect applications and data, integrate identity and access, and
            automate workflows with human review.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <CtaLink href={TEAMING_INTAKE_HREF} variant="primary" fullWidth>
              Discuss a work package
            </CtaLink>
            <CtaLink
              href="/federal/capability-statement"
              variant="secondary"
              fullWidth
            >
              View capability statement
            </CtaLink>
          </div>

          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            <span>{SDVOSB_SHORT} · SAM.gov registered</span>
            <TextLink href="/federal">Procurement details</TextLink>
          </div>

          <p className="text-sm" style={{ color: "var(--mk-color-text-muted)" }}>
            Commercial team?{" "}
            <Link href="/services" style={{ color: "var(--mk-color-link)" }}>
              See Services
            </Link>
          </p>
        </div>
      </MkSection>

      {/* ── WORK A PRIME CAN PUT IN A STATEMENT OF WORK ── */}
      <MkSection tone="surface-1" id="work-packages">
        <div className="flex flex-col gap-10">
          <div>
            <Eyebrow>Work packages</Eyebrow>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              Work you can put in a statement of work
            </h2>
            <p
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Defined scope that Invariant can own end to end within your
              program — scoped, tested, documented, and handed off to your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRIMARY_CAPABILITIES.map((cap) => (
              <MkCard key={cap.title}>
                <span
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "var(--mk-color-link)",
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  {CAPABILITY_TIER_LABEL[cap.tier]}
                </span>
                <h3
                  className="mt-2 font-semibold"
                  style={{ fontSize: "17px", color: "var(--mk-color-text)" }}
                >
                  {cap.title}
                </h3>
                <p
                  className="mt-2 leading-[1.6]"
                  style={{
                    fontSize: "var(--mk-type-size-small)",
                    color: "var(--mk-color-text-muted)",
                  }}
                >
                  {cap.body}
                </p>
              </MkCard>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEDERAL_WORK_PACKAGE_EXAMPLES.map((ex) => (
              <div
                key={ex.title}
                className="flex flex-col gap-3 p-6 rounded-[var(--mk-radius-md)] border"
                style={{
                  borderColor: "var(--mk-color-border)",
                  background: "var(--mk-color-bg)",
                }}
              >
                <span
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "var(--mk-color-text-muted)",
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  {EXAMPLE_LABEL}
                </span>
                <h3
                  className="font-semibold"
                  style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
                >
                  {ex.title}
                </h3>
                <ol className="flex flex-col gap-2">
                  {ex.steps.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm leading-[1.55]"
                      style={{ color: "var(--mk-color-text-muted)" }}
                    >
                      <span
                        className="font-semibold shrink-0"
                        style={{
                          color: "var(--mk-color-link)",
                          fontFamily: "var(--mk-type-font-mono)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3
              className="font-semibold"
              style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
            >
              What you receive at handoff
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {FEDERAL_HANDOFF.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-[1.55]"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  <span
                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--mk-color-cta)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <CtaLink href={TEAMING_INTAKE_HREF} variant="primary" fullWidth>
              Discuss a work package
            </CtaLink>
            <span className="text-sm" style={{ color: "var(--mk-color-text-muted)" }}>
              {SDVOSB_SHORT} ·{" "}
              <Link href="/federal" style={{ color: "var(--mk-color-link)" }}>
                UEI, CAGE, and NAICS on Federal
              </Link>
            </span>
          </div>
        </div>
      </MkSection>

      {/* ── WHAT WE'VE SHIPPED ── */}
      <MkSection id="shipped">
        <div className="flex flex-col gap-8">
          <div>
            <Eyebrow>Evidence of delivery</Eyebrow>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{
                fontSize: "var(--mk-type-size-h2)",
                color: "var(--mk-color-text)",
              }}
            >
              What we&apos;ve shipped
            </h2>
            <p
              className="mt-2 max-w-[64ch]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Products built by Invariant and running today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 items-start">
            {/* Scientia for Slack */}
            <MkCard>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_minmax(0,240px)] gap-6 items-start">
                <div className="flex flex-col gap-3">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-widest"
                    style={{
                      color: "var(--mk-color-link)",
                      fontFamily: "var(--mk-type-font-mono)",
                    }}
                  >
                    Decision capture · Built by Invariant
                  </span>
                  <h3
                    className="font-semibold"
                    style={{ fontSize: "18px", color: "var(--mk-color-text)" }}
                  >
                    Scientia for Slack
                  </h3>
                  <p
                    className="leading-[1.6]"
                    style={{
                      fontSize: "var(--mk-type-size-small)",
                      color: "var(--mk-color-text-muted)",
                    }}
                  >
                    Native decision capture inside Slack. Turns important threads
                    into structured Decision Cards that a person reviews,
                    approves, and can revisit later.
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--mk-color-text)" }}
                  >
                    Available to approved pilot workspaces.
                  </p>
                  <a
                    href="https://scientiaos.io/slack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold no-underline hover:underline"
                    style={{ color: "var(--mk-color-link)" }}
                  >
                    scientiaos.io/slack <span aria-hidden>↗</span>
                  </a>
                </div>
                <Image
                  src="/products/scientia-decision-card.png"
                  alt="Scientia Decision Card in Slack showing a draft awaiting human review, with options to approve, request changes, or open it in Scientia."
                  width={577}
                  height={694}
                  sizes="(min-width: 640px) 240px, 100vw"
                  className="w-full h-auto rounded-[var(--mk-radius-md)] border"
                  style={{ borderColor: "var(--mk-color-border)" }}
                />
              </div>
            </MkCard>

            {/* Syntaxed */}
            <MkCard>
              <div className="flex flex-col gap-3">
                <span
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "var(--mk-color-link)",
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  Release confidence · Built by Invariant
                </span>
                <h3
                  className="font-semibold"
                  style={{ fontSize: "18px", color: "var(--mk-color-text)" }}
                >
                  Syntaxed
                </h3>
                <p
                  className="leading-[1.6]"
                  style={{
                    fontSize: "var(--mk-type-size-small)",
                    color: "var(--mk-color-text-muted)",
                  }}
                >
                  Post-deploy sanity checks and release confidence tooling.
                  Catch regressions before your users do.
                </p>
                <a
                  href="https://syntaxed.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold no-underline hover:underline"
                  style={{ color: "var(--mk-color-link)" }}
                >
                  syntaxed.io <span aria-hidden>↗</span>
                </a>
              </div>
            </MkCard>
          </div>

          <p
            id="labs"
            className="text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            Earlier-stage products and experiments live in{" "}
            <Link href="/labs" style={{ color: "var(--mk-color-link)" }}>
              Hooligan Labs →
            </Link>
          </p>
        </div>
      </MkSection>

      {/* ── COMMERCIAL (SECONDARY) ── */}
      <MkSection tone="surface-1" compact>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-[60ch]">
            <Eyebrow>Commercial</Eyebrow>
            <h2
              className="mt-3 font-semibold leading-[1.2]"
              style={{ fontSize: "20px", color: "var(--mk-color-text)" }}
            >
              Building for a commercial team?
            </h2>
            <p
              className="mt-2 leading-[1.6]"
              style={{
                fontSize: "var(--mk-type-size-small)",
                color: "var(--mk-color-text-muted)",
              }}
            >
              Scoped software builds, decision and workflow design, and ongoing
              systems support — with published starting prices.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <CtaLink href={PROJECT_INTAKE_HREF} variant="secondary">
              Discuss a project
            </CtaLink>
            <TextLink href="/services">Services</TextLink>
            <TextLink href="/pricing">Pricing</TextLink>
          </div>
        </div>
      </MkSection>

      {/* ── FINAL CTA ── */}
      <MkSection>
        <div className="flex flex-col gap-5 items-start max-w-[640px]">
          <h2
            className="font-semibold leading-[1.2]"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              color: "var(--mk-color-text)",
            }}
          >
            Have a work package taking shape?
          </h2>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-small)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            Share the program or opportunity, the scope, and the timeline —
            or whatever is defined so far. Early conversations are welcome.
          </p>
          <div className="flex flex-wrap gap-3 w-full">
            <CtaLink href={TEAMING_INTAKE_HREF} variant="primary" fullWidth>
              Discuss a work package
            </CtaLink>
            <CtaLink
              href="/federal/capability-statement"
              variant="secondary"
              fullWidth
            >
              View capability statement
            </CtaLink>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
