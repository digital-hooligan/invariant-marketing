import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";

const PRIMARY_CTA_LABEL = "Start a Conversation";

export default function ContactPage() {
  return (
    <div>
      <MkSection>
        <div className="max-w-3xl">
          <h1
            className="font-semibold"
            style={{
              fontSize: "var(--mk-type-size-h1)",
              lineHeight: "var(--mk-type-lh-tight)",
            }}
          >
            Contact
          </h1>
          <p className="mt-6" style={{ color: "var(--mk-color-text-muted)" }}>
            This is the first step in determining fit.
          </p>
        </div>
      </MkSection>

      <MkSection>
        <div className="max-w-3xl">
          <MkCard>
            <form className="space-y-5" method="post" action="#">
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
                  className="inline-flex items-center justify-center rounded-[var(--mk-radius-md)] px-6 py-4 text-sm font-semibold min-h-[44px]"
                  style={{
                    background: "var(--mk-color-cta)",
                    color: "var(--mk-color-bg)",
                    transition: `background var(--mk-motion-duration-fast) var(--mk-motion-ease)`,
                  }}
                >
                  {PRIMARY_CTA_LABEL}
                </button>
              </div>

              <div
                className="text-sm"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                We review inquiries for fit. A conversation may be offered if
                aligned, or we may decline if misaligned.
              </div>
            </form>
          </MkCard>
        </div>
      </MkSection>
    </div>
  );
}
