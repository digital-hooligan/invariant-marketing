"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "./actions";

const INITIAL: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold transition-colors duration-[120ms]"
      style={{
        background: pending ? "var(--mk-color-border)" : "var(--mk-color-cta)",
        color: pending ? "var(--mk-color-text-muted)" : "var(--mk-color-bg)",
        cursor: pending ? "not-allowed" : "pointer",
      }}
    >
      {pending ? "Sending…" : "Send Inquiry"}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  error,
  hint,
  as: Tag = "input",
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  as?: "input" | "textarea";
  rows?: number;
}) {
  const id = `contact-${name}`;
  const inputStyle = {
    background: "var(--mk-color-surface-2)",
    borderColor: error ? "var(--mk-color-danger)" : "var(--mk-color-border)",
    color: "var(--mk-color-text)",
  } as React.CSSProperties;

  return (
    <label className="flex flex-col gap-1.5" htmlFor={id}>
      <span className="text-sm font-medium" style={{ color: "var(--mk-color-text)" }}>
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--mk-color-danger)" }} aria-hidden>
            *
          </span>
        )}
      </span>

      {hint && (
        <span className="text-xs" style={{ color: "var(--mk-color-text-muted)" }}>
          {hint}
        </span>
      )}

      {Tag === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows ?? 5}
          className="rounded-[var(--mk-radius-md)] border px-4 py-3 text-sm resize-y"
          style={inputStyle}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          className="rounded-[var(--mk-radius-md)] border px-4 py-3 text-sm"
          style={inputStyle}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      )}

      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          className="text-xs"
          style={{ color: "var(--mk-color-danger)" }}
        >
          {error}
        </span>
      )}
    </label>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(submitContact, INITIAL);

  if (state.status === "success") {
    return (
      <div
        className="rounded-[var(--mk-radius-lg)] border p-8 flex flex-col gap-3"
        style={{
          borderColor: "var(--mk-color-cta)",
          background: "var(--mk-color-surface-1)",
        }}
        role="status"
      >
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--mk-color-cta)", fontFamily: "var(--mk-type-font-mono)" }}
        >
          Received
        </span>
        <p
          className="font-semibold"
          style={{ fontSize: "18px", color: "var(--mk-color-text)" }}
        >
          Your inquiry is in.
        </p>
        <p
          className="leading-[1.6]"
          style={{ fontSize: "var(--mk-type-size-small)", color: "var(--mk-color-text-muted)" }}
        >
          We review every inquiry and respond within 2–3 business days if
          there&apos;s a fit. If we&apos;re not the right team for your project, we&apos;ll
          tell you that too.
        </p>
      </div>
    );
  }

  const e = state.fieldErrors ?? {};

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — hidden from real users, bots fill it */}
      <input
        type="text"
        name="_hp"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="sr-only"
        style={{ position: "absolute", left: "-9999px" }}
      />

      {state.status === "error" && state.message && (
        <div
          className="rounded-[var(--mk-radius-md)] border px-4 py-3 text-sm"
          style={{
            borderColor: "var(--mk-color-danger)",
            color: "var(--mk-color-danger)",
            background: "var(--mk-color-surface-1)",
          }}
          role="alert"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" required error={e.name} />
        <Field label="Email" name="email" type="email" required error={e.email} />
      </div>

      <Field
        label="Organization"
        name="org"
        error={e.org}
        hint="Optional"
      />

      <Field
        label="What are you trying to solve?"
        name="problem"
        as="textarea"
        required
        error={e.problem}
        hint="Describe the problem, not the solution. More context = faster alignment."
      />

      <Field
        label="Timeline"
        name="timeline"
        required
        error={e.timeline}
        hint="e.g. ASAP, 4–6 weeks, Q3 launch, flexible"
      />

      <div className="flex items-center gap-4 pt-2 flex-wrap">
        <SubmitButton />
        <p
          className="text-xs"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          We review for fit and respond within 2–3 business days.
        </p>
      </div>
    </form>
  );
}
