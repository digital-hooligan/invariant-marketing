import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";
import { MkPrimaryCta } from "@/components/mk/MkButton";

const PRIMARY_CTA_LABEL = "Start a Conversation";

export default function HomePage() {
  return (
    <div>
      {/* 1) Hero */}
      <MkSection>
        <div className="max-w-3xl">
          <h1
            className="font-semibold"
            style={{
              fontSize: "var(--mk-type-size-h1)",
              lineHeight: "var(--mk-type-lh-tight)",
              color: "var(--mk-color-text)",
            }}
          >
            Structure for decisions that actually move the work forward.
          </h1>

          <p className="mt-6" style={{ color: "var(--mk-color-text-muted)" }}>
            Operator-led engagements for teams that need clarity, scope
            discipline, and shipped increments—without automation claims or
            platform promises.
          </p>

          <div className="mt-8">
            <MkPrimaryCta href="/contact">{PRIMARY_CTA_LABEL}</MkPrimaryCta>
          </div>

          <div
            className="mt-8 space-y-2 text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            <div>
              Human-led engagements. No automation. No predictive systems.
            </div>
            <div>
              Invariant is a consulting studio. We do not provide software
              platforms or automated decision systems.
            </div>
          </div>
        </div>
      </MkSection>

      {/* 2) Trust Frame */}
      <MkSection>
        <div className="grid gap-6 md:grid-cols-3">
          <MkCard>
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--mk-type-size-h3)",
                lineHeight: "var(--mk-type-lh-base)",
                color: "var(--mk-color-text)",
              }}
            >
              Structured Thinking
            </h2>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Clear framing for messy inputs. Constraints made explicit before
              execution begins.
            </p>
          </MkCard>

          <MkCard>
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--mk-type-size-h3)",
                lineHeight: "var(--mk-type-lh-base)",
                color: "var(--mk-color-text)",
              }}
            >
              Human-Led Execution
            </h2>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Operator-led delivery. We structure work and accountability—no
              automation posture.
            </p>
          </MkCard>

          <MkCard>
            <h2
              className="font-semibold"
              style={{
                fontSize: "var(--mk-type-size-h3)",
                lineHeight: "var(--mk-type-lh-base)",
                color: "var(--mk-color-text)",
              }}
            >
              Documented Process
            </h2>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Engagements follow defined scopes and written agreements. Outcomes
              depend on client participation and constraints.
            </p>
          </MkCard>
        </div>
      </MkSection>

      {/* 3) Problem Framing */}
      <MkSection>
        <div className="max-w-3xl">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              lineHeight: "var(--mk-type-lh-base)",
              color: "var(--mk-color-text)",
            }}
          >
            When execution loses structure, decisions decay.
          </h2>

          <p className="mt-4" style={{ color: "var(--mk-color-text-muted)" }}>
            Teams accumulate tools, meetings, and half-finished initiatives when
            constraints and review cadence aren’t explicit. We help reduce drift
            by structuring the decision surface and aligning execution to what
            actually matters.
          </p>

          <ul
            className="mt-6 list-disc pl-6"
            style={{ color: "var(--mk-color-text)" }}
          >
            <li>Meetings replace movement</li>
            <li>Tools multiply without clarity</li>
            <li>Decisions decay without review</li>
          </ul>

          <div
            className="mt-6 text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            We do not replace executive judgment. We structure it.
          </div>
        </div>
      </MkSection>

      {/* 4) Approach Overview */}
      <MkSection>
        <div className="grid gap-6 md:grid-cols-3">
          <MkCard>
            <h3
              className="font-semibold"
              style={{ color: "var(--mk-color-text)" }}
            >
              Define the decision surface
            </h3>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Identify what needs a decision, who owns it, and what evidence is
              relevant.
            </p>
          </MkCard>

          <MkCard>
            <h3
              className="font-semibold"
              style={{ color: "var(--mk-color-text)" }}
            >
              Clarify constraints
            </h3>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Make scope, risk, timelines, and non-goals explicit so execution
              can stay aligned.
            </p>
          </MkCard>

          <MkCard>
            <h3
              className="font-semibold"
              style={{ color: "var(--mk-color-text)" }}
            >
              Align execution
            </h3>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Translate decisions into a scoped plan and shipped increments.
            </p>
          </MkCard>
        </div>

        <div
          className="mt-6 text-sm"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          Delivered through defined consulting engagements, not software
          deployment.
        </div>
      </MkSection>

      {/* 5) Engagement Flow (3-step) */}
      <MkSection>
        <div className="max-w-3xl">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--mk-type-size-h2)",
              lineHeight: "var(--mk-type-lh-base)",
              color: "var(--mk-color-text)",
            }}
          >
            Engagement flow
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <MkCard>
              <div
                className="text-sm"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                Step 1
              </div>
              <h3
                className="mt-2 font-semibold"
                style={{ color: "var(--mk-color-text)" }}
              >
                Evaluation Session
              </h3>
              <p
                className="mt-3"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                Exploratory. Not legal/financial/compliance advice.
              </p>
            </MkCard>

            <MkCard>
              <div
                className="text-sm"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                Step 2
              </div>
              <h3
                className="mt-2 font-semibold"
                style={{ color: "var(--mk-color-text)" }}
              >
                Scoped Plan
              </h3>
              <p
                className="mt-3"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                Define scope, milestones, and decision points before build
                execution.
              </p>
            </MkCard>

            <MkCard>
              <div
                className="text-sm"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                Step 3
              </div>
              <h3
                className="mt-2 font-semibold"
                style={{ color: "var(--mk-color-text)" }}
              >
                Structured Execution
              </h3>
              <p
                className="mt-3"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                Ship increments against constraints with documented decisions.
              </p>
            </MkCard>
          </div>
        </div>
      </MkSection>

      {/* 6) Boundary Statement (high whitespace) */}
      <MkSection>
        <div className="max-w-3xl space-y-3">
          <div style={{ color: "var(--mk-color-text)" }}>
            We don’t sell tools.
          </div>
          <div style={{ color: "var(--mk-color-text)" }}>
            We don’t sell predictions.
          </div>
          <div style={{ color: "var(--mk-color-text)" }}>
            We don’t automate judgment.
          </div>
          <div style={{ color: "var(--mk-color-text)" }}>
            We do not provide certification, compliance guarantees, or
            regulatory determinations.
          </div>
          <div style={{ color: "var(--mk-color-text)" }}>
            We help you structure it.
          </div>
        </div>
      </MkSection>

      {/* 7) Final CTA */}
      <MkSection>
        <div className="max-w-3xl">
          <h2
            className="font-semibold"
            style={{ color: "var(--mk-color-text)" }}
          >
            Clarity compounds.
          </h2>
          <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
            Start with a structured evaluation.
          </p>

          <div className="mt-8">
            <MkPrimaryCta href="/contact">{PRIMARY_CTA_LABEL}</MkPrimaryCta>
          </div>

          <div
            className="mt-4 text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            Subject to scope review and mutual fit.
          </div>
        </div>
      </MkSection>
    </div>
  );
}
