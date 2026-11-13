import type { Metadata } from "next";
import Link from "next/link";
import { MkSection } from "@/components/mk/MkSection";
import { ProductCard, type Product } from "@/components/mk/ProductCard";

const DESCRIPTION =
  "Hooligan Labs is the product and R&D work of Digital Hooligan LLC: early-access and in-development tools including PennyWize, OpsToys, and HypeWatch.";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Hooligan Labs",
} as const;

export const metadata: Metadata = {
  title: "Hooligan Labs",
  description: DESCRIPTION,
  alternates: { canonical: "/labs" },
  openGraph: {
    type: "website",
    title: "Hooligan Labs — Invariant",
    description: DESCRIPTION,
    url: "/labs",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hooligan Labs — Invariant",
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

const EARLY_ACCESS: Product[] = [
  {
    name: "PennyWize",
    tag: "Financial signal",
    body: "Small-cap signal and research assist. Market research support without the noise.",
    href: "https://www.pennywize.ai/",
    note: "Early access.",
  },
];

const IN_DEVELOPMENT: Product[] = [
  {
    name: "OpsToys",
    tag: "Operator utilities",
    body: "Browser-based operator utilities and workflow tooling. Small tools with outsized leverage.",
    href: null,
    note: "In development — not publicly available.",
  },
  {
    name: "HypeWatch",
    tag: "Trend radar",
    body: "Hype intelligence and trend radar. Separate signal from noise before the cycle peaks.",
    href: null,
    note: "In development — not publicly available.",
  },
];

function GroupLabel({ children }: { children: string }) {
  return (
    <span
      className="text-xs font-semibold uppercase tracking-widest"
      style={{
        color: "var(--mk-color-text-muted)",
        fontFamily: "var(--mk-type-font-mono)",
      }}
    >
      {children}
    </span>
  );
}

export default function LabsPage() {
  return (
    <article className="w-full">
      <MkSection>
        <div className="flex flex-col gap-4 max-w-[700px]">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-link)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            Hooligan Labs
          </span>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            Products and experiments in progress.
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Hooligan Labs is where Digital Hooligan LLC builds and tests its own
            products. Availability is listed as it stands today.
          </p>
          <p className="text-sm" style={{ color: "var(--mk-color-text-muted)" }}>
            Shipped products — Scientia for Slack and Syntaxed — are on the{" "}
            <Link href="/#shipped" style={{ color: "var(--mk-color-link)" }}>
              homepage
            </Link>
            .
          </p>
        </div>
      </MkSection>

      <MkSection tone="surface-1">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <GroupLabel>Early access</GroupLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EARLY_ACCESS.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <GroupLabel>In development</GroupLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {IN_DEVELOPMENT.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          </div>
        </div>
      </MkSection>
    </article>
  );
}
