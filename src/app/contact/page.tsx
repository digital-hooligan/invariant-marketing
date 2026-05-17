import type { Metadata } from "next";
import { MkSection } from "@/components/mk/MkSection";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Invariant. We review every inquiry and respond within 2–3 business days.",
};

export default function ContactPage() {
  return (
    <article className="w-full">
      <MkSection>
        <div className="flex flex-col gap-3 max-w-[56ch]">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--mk-color-cta)",
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
            Start a project.
          </h1>
          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text)",
              opacity: 0.85,
            }}
          >
            Tell us what you're trying to build and what's in your way. We
            review every inquiry for fit — no automated responses.
          </p>
        </div>
      </MkSection>

      <MkSection tone="surface-1">
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </MkSection>

      <MkSection>
        <div
          className="flex flex-col gap-2 max-w-[56ch] text-sm"
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
          <p>Scoped work only — we don&apos;t take open-ended retainers.</p>
        </div>
      </MkSection>
    </article>
  );
}
