"use client";

import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { trackPublicEvent } from "@/components/analytics/PublicAnalytics";
import {
  CONTACT_SUBMISSION_GLOBAL_ERROR,
  type ContactSubmissionFieldErrors,
  type ContactSubmissionFieldName,
  validateContactSubmission,
} from "@/lib/contact-submission";

const CTA_LABEL = "Send message";

type SubmitState = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  companyOrRole: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  companyOrRole: "",
  message: "",
};

type ContactApiErrorResponse = {
  data: null;
  error: string;
  meta?: {
    fieldErrors?: ContactSubmissionFieldErrors;
  };
};

export function ContactIntakeForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<ContactSubmissionFieldErrors>(
    {},
  );
  const [formError, setFormError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function validateField(field: ContactSubmissionFieldName, value: string) {
    const payload = {
      ...form,
      [field]: value,
    };
    const result = validateContactSubmission(payload);

    return result.ok ? "" : result.fieldErrors[field] || "";
  }

  function handleChange(
    field: keyof FormState,
  ): (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
    return (event) => {
      const { value } = event.target;

      setForm((current) => ({ ...current, [field]: value }));
      setFieldErrors((current) => ({ ...current, [field]: "" }));
      setFormError("");
      if (submitState === "error") {
        setSubmitState("idle");
      }
    };
  }

  function handleBlur(field: ContactSubmissionFieldName) {
    return (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const error = validateField(field, event.target.value);
      setFieldErrors((current) => ({ ...current, [field]: error }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateContactSubmission(form);

    if (!result.ok) {
      setFieldErrors(result.fieldErrors);
      setFormError(result.error);
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");
    setFieldErrors({});
    setFormError("");
    trackPublicEvent("public_cta_click", {
      label: CTA_LABEL,
      location: "contact_form",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const payload = (await response.json()) as ContactApiErrorResponse;
        setFieldErrors(payload.meta?.fieldErrors || {});
        setFormError(payload.error || CONTACT_SUBMISSION_GLOBAL_ERROR);
        setSubmitState("error");
        return;
      }

      setForm(INITIAL_STATE);
      setSubmitState("success");
    } catch {
      setFormError("Didn't go through. Try again.");
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
          Received
        </h2>
        <p className="text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
          Your message is in. We&apos;ll review and respond manually.
        </p>
        <p className="text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
          If it&apos;s a fit, you&apos;ll hear from us at the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {formError ? (
        <div
          className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3 text-sm"
          style={{ color: "var(--mk-color-text)" }}
        >
          {formError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span
            className="text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            Full name
          </span>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="Jane Doe"
            className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
          />
          <span
            className="text-xs"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            Who should we reply to?
          </span>
          {fieldErrors.name ? (
            <span className="text-sm text-[var(--mk-color-link)]">
              {fieldErrors.name}
            </span>
          ) : null}
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
            value={form.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            placeholder="you@company.com"
            className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
          />
          <span
            className="text-xs"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            We&apos;ll respond here. No spam.
          </span>
          {fieldErrors.email ? (
            <span className="text-sm text-[var(--mk-color-link)]">
              {fieldErrors.email}
            </span>
          ) : null}
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span
          className="text-sm"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          Company or role (optional)
        </span>
        <input
          name="companyOrRole"
          value={form.companyOrRole}
          onChange={handleChange("companyOrRole")}
          onBlur={handleBlur("companyOrRole")}
          placeholder="Founder, Ops Lead, etc."
          className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
        />
        <span
          className="text-xs"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          Helpful, not required.
        </span>
        {fieldErrors.companyOrRole ? (
          <span className="text-sm text-[var(--mk-color-link)]">
            {fieldErrors.companyOrRole}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2">
        <span
          className="text-sm"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          What are you working on?
        </span>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          onBlur={handleBlur("message")}
          placeholder="Brief context, goal, or problem"
          className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
        />
        <span
          className="text-xs"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          A few lines is enough. Include constraints if they matter.
        </span>
        {fieldErrors.message ? (
          <span className="text-sm text-[var(--mk-color-link)]">
            {fieldErrors.message}
          </span>
        ) : null}
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
