import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";
import { MkPrimaryCta } from "@/components/mk/MkButton";

const PRIMARY_CTA_LABEL = "Start a Conversation";

export default function OfferingPage() {
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
            Offering
          </h1>
          <p className="mt-6" style={{ color: "var(--mk-color-text-muted)" }}>
            Invariant is an applied systems studio for structured execution.
          </p>
        </div>
      </MkSection>

      <MkSection>
        <div className="max-w-3xl">
          <h2
            className="font-semibold"
            style={{ fontSize: "var(--mk-type-size-h2)" }}
          >
            Who it’s for
          </h2>
          <ul className="mt-6 list-disc pl-6">
            <li>Founder-led teams</li>
            <li>Regulated or operationally complex organizations</li>
            <li>Teams shipping internal tools or applied AI</li>
          </ul>
        </div>
      </MkSection>

      <MkSection>
        <div className="max-w-3xl">
          <h2
            className="font-semibold"
            style={{ fontSize: "var(--mk-type-size-h2)" }}
          >
            What we do
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <MkCard>
            <h3 className="font-semibold">Discovery & signal clarification</h3>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Define the problem surface, inputs, constraints, and what “fit”
              looks like.
            </p>
          </MkCard>

          <MkCard>
            <h3 className="font-semibold">Prototype & build increments</h3>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Scoped delivery with documented decisions and review points.
            </p>
          </MkCard>

          <MkCard>
            <h3 className="font-semibold">Workflow automation</h3>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Reduce manual overhead with clearly bounded workflows. No autonomy
              claims.
            </p>
          </MkCard>

          <MkCard>
            <h3 className="font-semibold">Applied AI integrations</h3>
            <p className="mt-3" style={{ color: "var(--mk-color-text-muted)" }}>
              Operator-led integrations with explicit limits and human judgment
              retained.
            </p>
          </MkCard>
        </div>
      </MkSection>

      <MkSection>
        <div className="max-w-3xl">
          <h2
            className="font-semibold"
            style={{ fontSize: "var(--mk-type-size-h2)" }}
          >
            What we don’t do
          </h2>
          <ul className="mt-6 list-disc pl-6">
            <li>Open-ended R&amp;D</li>
            <li>Staff augmentation</li>
            <li>Marketing agency services</li>
            <li>Guaranteed outcomes</li>
          </ul>
        </div>
      </MkSection>

      <MkSection>
        <div className="max-w-3xl">
          <h2
            className="font-semibold"
            style={{ fontSize: "var(--mk-type-size-h2)" }}
          >
            Engagement types
          </h2>
          <ul className="mt-6 list-disc pl-6">
            <li>Discovery</li>
            <li>Build sprint</li>
            <li>Incremental delivery</li>
            <li>Retainer</li>
          </ul>
        </div>
      </MkSection>

      <MkSection>
        <div className="max-w-3xl">
          <h2
            className="font-semibold"
            style={{ fontSize: "var(--mk-type-size-h2)" }}
          >
            Process overview
          </h2>
          <ul className="mt-6 list-disc pl-6">
            <li>Scope defined before work begins</li>
            <li>Milestones tracked</li>
            <li>Change requests logged</li>
          </ul>

          <div className="mt-10">
            <MkPrimaryCta href="/contact">{PRIMARY_CTA_LABEL}</MkPrimaryCta>
          </div>
        </div>
      </MkSection>
    </div>
  );
}
