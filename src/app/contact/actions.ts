"use server";

import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("A valid email address is required"),
  org: z.string().max(200).optional(),
  problem: z
    .string()
    .min(10, "Please describe what you're trying to solve (10 characters min)")
    .max(3000),
  timeline: z.string().min(1, "Timeline is required").max(200),
  _hp: z.string().max(0, "Invalid submission"), // honeypot — bots fill this
});

export type ContactState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<"name" | "email" | "org" | "problem" | "timeline", string>>;
  message?: string;
};

const DESTINATION = "tez@digitalhooligan.io";

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    org: formData.get("org") || undefined,
    problem: formData.get("problem") ?? "",
    timeline: formData.get("timeline") ?? "",
    _hp: formData.get("_hp") ?? "",
  };

  const result = ContactSchema.safeParse(raw);

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors;
    // Silently reject honeypot hits — return a success-looking response
    if (flat._hp?.length) return { status: "success" };
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const key of ["name", "email", "org", "problem", "timeline"] as const) {
      if (flat[key]?.[0]) fieldErrors[key] = flat[key]![0];
    }
    return { status: "error", fieldErrors };
  }

  const { name, email, org, problem, timeline } = result.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "__SET_IN_SECRET_STORE__") {
    // Dev fallback: log submission without failing — form still shows success
    console.info("[contact:dev] RESEND_API_KEY not configured. Submission:", {
      name,
      email,
      org,
      timeline,
    });
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      // SETUP: The `from` domain must be verified in your Resend dashboard.
      // Use your verified sending domain, e.g. no-reply@digitalhooligan.io
      // Until verified, use the Resend test address: onboarding@resend.dev
      from: "Invariant Contact <onboarding@resend.dev>",
      to: DESTINATION,
      replyTo: email,
      subject: `Project inquiry — ${name}${org ? ` (${org})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        org ? `Organization: ${org}` : null,
        `Timeline: ${timeline}`,
        "",
        "--- Message ---",
        "",
        problem,
      ]
        .filter((v) => v !== null)
        .join("\n"),
    });

    return { status: "success" };
  } catch (err) {
    console.error("[contact] Email delivery failed:", err);
    return {
      status: "error",
      message:
        "Submission failed. Please try again or reach out directly at contact@digitalhooligan.io.",
    };
  }
}
