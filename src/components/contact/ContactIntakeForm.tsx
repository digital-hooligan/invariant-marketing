"use client";

import { useState, type FormEvent } from "react";
import { trackPublicEvent } from "@/components/analytics/PublicAnalytics";

const CTA_LABEL = "Send Inquiry";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactIntakeForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState("submitting");
    trackPublicEvent("public_cta_click", {
      label: CTA_LABEL,
      location: "contact_form",
    });

    try {
      const response = await fetch("/api/contact-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          name: formData.get("name"),
          email: formData.get("email"),
          organization: formData.get("org"),
          timeline: formData.get("timeline"),
          message: formData.get("problem"),
        }),
      });

      if (!response.ok) {
        setSubmitState("error");
        return;
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
          Request received
        </h2>
        <p className="text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
          Your submission was sent to the founder-managed inbox. We will review
          it and follow up directly.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--mk-radius-md)] bg-[var(--mk-color-cta)] px-6 py-4 text-sm font-semibold text-[var(--mk-color-bg)] transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[var(--mk-color-cta-hover)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitState === "submitting" ? "Sending..." : CTA_LABEL}
        </button>
      </div>

      {submitState === "error" ? (
        <div
          className="text-sm"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          We could not send your request right now. Please try again.
        </div>
      ) : null}

      <div
        className="text-sm"
        style={{ color: "var(--mk-color-text-muted)" }}
      >
        We review inquiries for fit. Public docs and learning materials stay on
        this site; private access is provisioned only after review.
      </div>
    </form>
  );
}
