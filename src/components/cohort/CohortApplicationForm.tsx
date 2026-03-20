"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { trackPublicEvent } from "@/components/analytics/PublicAnalytics";
import { MkCard } from "@/components/mk/MkCard";

const CTA_LABEL = "Apply for the Cohort";

type FormState = {
  name: string;
  email: string;
  role: string;
  team: string;
  challenge: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  role: "",
  team: "",
  challenge: "",
};

function buildMailtoBody({
  name,
  email,
  role,
  team,
  challenge,
}: FormState) {
  return [
    "Scientia Cohort Application",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Role: ${role}`,
    `Team: ${team || "Not provided"}`,
    "",
    "What clarity are you looking for right now?",
    challenge,
  ].join("\n");
}

export function CohortApplicationForm() {
  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { value } = event.target;
      setForm((current) => ({ ...current, [field]: value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    trackPublicEvent("public_cta_click", {
      label: CTA_LABEL,
      location: "cohort_form",
    });

    const subject = encodeURIComponent("Scientia Cohort Application");
    const body = encodeURIComponent(buildMailtoBody(form));
    window.location.href = `mailto:cohort@scientiaos.io?subject=${subject}&body=${body}`;
  };

  return (
    <MkCard>
      <div className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mk-color-link)]">
            Apply now
          </p>
          <h2 className="text-[28px] font-semibold leading-[1.08] text-[var(--mk-color-text)]">
            {CTA_LABEL}
          </h2>
          <p className="text-sm leading-[1.75] text-[var(--mk-color-text-muted)]">
            Takes about 2 minutes. Applications are reviewed on a rolling basis.
            Where appropriate, we follow up with next steps and cohort timing.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-[var(--mk-color-text-muted)]">
              Name
            </span>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange("name")}
              className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3 text-[var(--mk-color-text)]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-[var(--mk-color-text-muted)]">
              Work email
            </span>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange("email")}
              className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3 text-[var(--mk-color-text)]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-[var(--mk-color-text-muted)]">
              Role
            </span>
            <input
              name="role"
              required
              value={form.role}
              onChange={handleChange("role")}
              className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3 text-[var(--mk-color-text)]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-[var(--mk-color-text-muted)]">
              Team or company
            </span>
            <input
              name="team"
              value={form.team}
              onChange={handleChange("team")}
              className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3 text-[var(--mk-color-text)]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-[var(--mk-color-text-muted)]">
              What clarity are you looking for right now?
            </span>
            <textarea
              name="challenge"
              required
              rows={5}
              value={form.challenge}
              onChange={handleChange("challenge")}
              className="rounded-[var(--mk-radius-md)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-2)] px-4 py-3 text-[var(--mk-color-text)]"
            />
          </label>

          <button
            type="submit"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[var(--mk-radius-md)] bg-[var(--mk-color-cta)] px-6 py-4 text-sm font-semibold text-[#081018] no-underline transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[var(--mk-color-cta-hover)]"
          >
            {CTA_LABEL}
          </button>
        </form>

        <p className="text-xs leading-[1.8] text-[var(--mk-color-text-muted)]">
          Submitting opens an email draft to <strong>cohort@scientiaos.io</strong>{" "}
          with your application details. This is a cohort application, not
          instant access.
        </p>
      </div>
    </MkCard>
  );
}
