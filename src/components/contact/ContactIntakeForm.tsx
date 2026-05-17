"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { trackPublicEvent } from "@/components/analytics/PublicAnalytics";
import {
  CONTACT_SUBMISSION_FIELD_NAMES,
  CONTACT_SUBMISSION_GLOBAL_ERROR,
  type ContactSubmissionFieldErrors,
  type ContactSubmissionFieldName,
  validateContactSubmission,
} from "@/lib/contact-submission";

const CTA_LABEL = "Send message";
const CONTACT_SUBMIT_SUCCESS_EVENT = "contact_submit_success";
const CONTACT_SUBMIT_ERROR_EVENT = "contact_submit_error";

type SubmitState = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  companyOrRole: string;
  message: string;
  honeypot: string;
};

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  companyOrRole: "",
  message: "",
  honeypot: "",
};

type ContactApiErrorResponse = {
  data: null;
  error: string;
};

export function ContactIntakeForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<ContactSubmissionFieldErrors>(
    {},
  );
  const [formError, setFormError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const fieldRefs = useRef<Record<ContactSubmissionFieldName, FieldElement | null>>({
    name: null,
    email: null,
    companyOrRole: null,
    message: null,
  });
  const successMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (submitState === "success") {
      successMessageRef.current?.focus();
    }
  }, [submitState]);

  function trimFormState(value: FormState): FormState {
    return {
      name: value.name.trim(),
      email: value.email.trim(),
      companyOrRole: value.companyOrRole.trim(),
      message: value.message.trim(),
      honeypot: value.honeypot,
    };
  }

  function focusFirstInvalidField(errors: ContactSubmissionFieldErrors) {
    const firstInvalidField = CONTACT_SUBMISSION_FIELD_NAMES.find(
      (fieldName) => errors[fieldName],
    );

    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
    }
  }

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
      const trimmedValue = event.target.value.trim();
      setForm((current) => ({ ...current, [field]: trimmedValue }));
      const error = validateField(field, trimmedValue);
      setFieldErrors((current) => ({ ...current, [field]: error }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitState === "submitting") {
      return;
    }

    const trimmedForm = trimFormState(form);
    setForm(trimmedForm);

    const result = validateContactSubmission(trimmedForm);

    if (!result.ok) {
      setFieldErrors(result.fieldErrors);
      setFormError(result.error);
      setSubmitState("error");
      focusFirstInvalidField(result.fieldErrors);
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
        body: JSON.stringify({
          ...result.data,
          honeypot: trimmedForm.honeypot,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as ContactApiErrorResponse;
        setFormError(
          payload.error
            ? "Something didn't go through. Check your connection and try again. If the issue persists, email hello@digitalhooligan.io."
            : CONTACT_SUBMISSION_GLOBAL_ERROR,
        );
        setSubmitState("error");
        trackPublicEvent(CONTACT_SUBMIT_ERROR_EVENT, {
          label: CTA_LABEL,
          location: "contact_form",
        });
        return;
      }

      setForm(INITIAL_STATE);
      setFormError("");
      setSubmitState("success");
      trackPublicEvent(CONTACT_SUBMIT_SUCCESS_EVENT, {
        label: CTA_LABEL,
        location: "contact_form",
      });
    } catch {
      setFormError(
        "Something didn't go through. Check your connection and try again. If the issue persists, email hello@digitalhooligan.io.",
      );
      setSubmitState("error");
      trackPublicEvent(CONTACT_SUBMIT_ERROR_EVENT, {
        label: CTA_LABEL,
        location: "contact_form",
      });
    }
  }

  if (submitState === "success") {
    return (
      <div
        ref={successMessageRef}
        tabIndex={-1}
        aria-live="polite"
        className="space-y-3 rounded-[var(--mk-radius-md)] border border-[var(--mk-color-success)] bg-[var(--mk-color-surface-2)] px-4 py-4"
      >
        <h2 className="text-lg font-semibold text-[var(--mk-color-text)]">
          Message received
        </h2>
        <p className="text-sm leading-[1.7] text-[var(--mk-color-text-muted)]">
          We&apos;ll review and respond with next steps if there&apos;s a fit.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] px-4 py-2 text-sm font-semibold no-underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitState === "submitting"}
    >
      {formError ? (
        <div
          aria-live="polite"
          className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-danger)] bg-[var(--mk-color-surface-2)] px-4 py-3 text-sm"
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
            ref={(element) => {
              fieldRefs.current.name = element;
            }}
            name="name"
            required
            value={form.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={fieldErrors.name ? "true" : "false"}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
            style={
              fieldErrors.name
                ? { borderColor: "var(--mk-color-danger)" }
                : undefined
            }
          />
          <span
            className="text-xs"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            Who should we reply to?
          </span>
          {fieldErrors.name ? (
            <span
              id="contact-name-error"
              className="text-sm text-[var(--mk-color-danger)]"
            >
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
            ref={(element) => {
              fieldRefs.current.email = element;
            }}
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={fieldErrors.email ? "true" : "false"}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
            style={
              fieldErrors.email
                ? { borderColor: "var(--mk-color-danger)" }
                : undefined
            }
          />
          <span
            className="text-xs"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            We&apos;ll respond here. No spam.
          </span>
          {fieldErrors.email ? (
            <span
              id="contact-email-error"
              className="text-sm text-[var(--mk-color-danger)]"
            >
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
          ref={(element) => {
            fieldRefs.current.companyOrRole = element;
          }}
          name="companyOrRole"
          value={form.companyOrRole}
          onChange={handleChange("companyOrRole")}
          onBlur={handleBlur("companyOrRole")}
          autoComplete="organization"
          placeholder="Founder, Ops Lead, etc."
          aria-invalid={fieldErrors.companyOrRole ? "true" : "false"}
          aria-describedby={
            fieldErrors.companyOrRole ? "contact-company-or-role-error" : undefined
          }
          className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
          style={
            fieldErrors.companyOrRole
              ? { borderColor: "var(--mk-color-danger)" }
              : undefined
          }
        />
        <span
          className="text-xs"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          Helpful, not required.
        </span>
        {fieldErrors.companyOrRole ? (
          <span
            id="contact-company-or-role-error"
            className="text-sm text-[var(--mk-color-danger)]"
          >
            {fieldErrors.companyOrRole}
          </span>
        ) : null}
      </label>

      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={handleChange("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex flex-col gap-2">
        <span
          className="text-sm"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          What are you working on?
        </span>
        <textarea
          ref={(element) => {
            fieldRefs.current.message = element;
          }}
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          onBlur={handleBlur("message")}
          placeholder="Brief context, goal, or problem"
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3"
          style={
            fieldErrors.message
              ? { borderColor: "var(--mk-color-danger)" }
              : undefined
          }
        />
        <span
          className="text-xs"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          A few lines is enough. Include constraints if they matter.
        </span>
        {fieldErrors.message ? (
          <span
            id="contact-message-error"
            className="text-sm text-[var(--mk-color-danger)]"
          >
            {fieldErrors.message}
          </span>
        ) : null}
      </label>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          aria-busy={submitState === "submitting"}
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
