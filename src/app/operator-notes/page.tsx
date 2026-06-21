import Link from "next/link";
import type { Metadata } from "next";
import { MkSection } from "@/components/mk/MkSection";
import {
  getPublishedOperatorNotes,
  formatNoteDate,
} from "@/content/operatorNotes";

const TITLE = "Operator Notes";
const SUBTITLE =
  "Field notes on building systems, preserving judgment, and operating through complexity.";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Operator Notes",
} as const;

export const metadata: Metadata = {
  title: TITLE,
  description: SUBTITLE,
  alternates: { canonical: "/operator-notes" },
  openGraph: {
    type: "website",
    title: `${TITLE} — Invariant`,
    description: SUBTITLE,
    url: "/operator-notes",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Invariant`,
    description: SUBTITLE,
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export default function OperatorNotesIndexPage() {
  const notes = getPublishedOperatorNotes();

  return (
    <article className="w-full">
      {/* ── HERO ── */}
      <MkSection>
        <div className="flex flex-col gap-4 max-w-[720px]">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-link)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            {TITLE}
          </span>
          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            {SUBTITLE}
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Operator Notes are working notes from building Invariant — direct,
            evidence-first, and written operator-to-operator. Not a blog, not
            thought-leadership filler. This is the doctrine behind how we build
            execution-grade systems for messy operations, and why we think
            preserving judgment is the operating problem worth solving.
          </p>
        </div>
      </MkSection>

      {/* ── NOTES LIST ── */}
      <MkSection tone="surface-1">
        {notes.length === 0 ? (
          <p style={{ color: "var(--mk-color-text-muted)" }}>
            No notes published yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link
                  href={`/operator-notes/${note.slug}`}
                  className="group block rounded-[var(--mk-radius-lg)] border border-[var(--mk-color-border)] bg-[var(--mk-color-bg)] p-6 no-underline transition-colors duration-[120ms] hover:border-[var(--mk-color-link)]"
                  style={{ boxShadow: "var(--mk-shadow-1)" }}
                >
                  {/* meta row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <span
                      className="text-[11px] font-semibold uppercase tracking-widest"
                      style={{
                        color: "var(--mk-color-link)",
                        fontFamily: "var(--mk-type-font-mono)",
                      }}
                    >
                      {note.category}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--mk-color-text-muted)" }}
                    >
                      {formatNoteDate(note.date)}
                    </span>
                    {note.featured && (
                      <span
                        className="text-[10px] font-semibold uppercase tracking-widest rounded-full border px-2 py-0.5"
                        style={{
                          color: "var(--mk-color-link)",
                          borderColor: "var(--mk-color-link)",
                          fontFamily: "var(--mk-type-font-mono)",
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  <h2
                    className="font-semibold leading-[1.25]"
                    style={{ fontSize: "20px", color: "var(--mk-color-text)" }}
                  >
                    {note.title}
                  </h2>

                  <p
                    className="mt-2 leading-[1.6] max-w-[68ch]"
                    style={{
                      fontSize: "var(--mk-type-size-small)",
                      color: "var(--mk-color-text-muted)",
                    }}
                  >
                    {note.summary}
                  </p>

                  {/* tags */}
                  {note.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full border"
                          style={{
                            color: "var(--mk-color-text-muted)",
                            borderColor: "var(--mk-color-border)",
                            fontFamily: "var(--mk-type-font-mono)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* action affordance (Rebel Red) */}
                  <span
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: "var(--mk-color-cta)" }}
                  >
                    Read note{" "}
                    <span className="transition-transform duration-[120ms] group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </MkSection>
    </article>
  );
}
