import { MkSection } from "@/components/mk/MkSection";
import { MkCard } from "@/components/mk/MkCard";

export default function PrivacyPage() {
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
            Privacy
          </h1>
          <div
            className="mt-3 text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            Last updated: 2026-02-18
          </div>
        </div>
      </MkSection>

      <MkSection>
        <div className="max-w-3xl">
          <MkCard>
            <div className="space-y-6">
              <div>
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--mk-type-size-h3)" }}
                >
                  Legal entity
                </h2>
                <p
                  className="mt-2"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  Digital Hooligan LLC
                </p>
              </div>

              <div>
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--mk-type-size-h3)" }}
                >
                  Data collected
                </h2>
                <p
                  className="mt-2"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  Information you submit through contact forms (such as name,
                  email, organization, and the content of your inquiry).
                </p>
              </div>

              <div>
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--mk-type-size-h3)" }}
                >
                  Purpose of collection
                </h2>
                <p
                  className="mt-2"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  To review inquiries, determine fit, and respond to requests
                  for contact.
                </p>
              </div>

              <div>
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--mk-type-size-h3)" }}
                >
                  Data retention
                </h2>
                <p
                  className="mt-2"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  We retain inquiry records for up to 24 months unless a longer
                  period is required for legitimate business purposes or
                  deletion is requested and feasible.
                </p>
              </div>

              <div>
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--mk-type-size-h3)" }}
                >
                  Contact for requests
                </h2>
                <p
                  className="mt-2"
                  style={{ color: "var(--mk-color-text-muted)" }}
                >
                  For privacy-related requests, contact us using the site
                  contact page.
                </p>
              </div>

              <div
                className="text-xs"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                Digital Hooligan LLC
              </div>
            </div>
          </MkCard>
        </div>
      </MkSection>
    </div>
  );
}
