"use server";

import { Resend } from "resend";
import { z } from "zod";
import { INQUIRY_TYPES, type InquiryType } from "@/content/intake";

const FIELD_NAMES = [
  "name",
  "email",
  "org",
  "program",
  "problem",
  "timeline",
] as const;
type FieldName = (typeof FIELD_NAMES)[number];

const ContactSchema = z
  .object({
    inquiryType: z.enum(INQUIRY_TYPES),
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string().trim().email("A valid email address is required"),
    org: z.string().trim().max(200).optional(),
    program: z.string().trim().max(200).optional(),
    problem: z
      .string()
      .trim()
      .min(10, "Please add a little more detail (10 characters min)")
      .max(3000),
    timeline: z.string().trim().max(200).optional(),
    _hp: z.string().max(0, "Invalid submission"), // honeypot — bots fill this
  })
  .superRefine((data, ctx) => {
    // Commercial projects need a timeline; teaming inquiries may still be
    // defining theirs.
    if (data.inquiryType === "project" && !data.timeline) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["timeline"],
        message: "Timeline is required",
      });
    }
  });

export type ContactState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<FieldName, string>>;
  message?: string;
  /** Delivery failed or is not configured: show the direct contact option. */
  deliveryFailed?: boolean;
  /** Submitted values, returned on error so the visitor doesn't lose them. */
  values?: Partial<Record<FieldName, string>>;
};

/** Founder inbox (unchanged default); override with CONTACT_INBOX_TO. */
const DEFAULT_INBOX = "tez@digitalhooligan.io";

type Outcome =
  | "delivered"
  | "delivery_error"
  | "not_configured"
  | "simulated_dev"
  | "invalid"
  | "honeypot";

/** Log only the inquiry type and outcome — never submitted content. */
function logOutcome(inquiryType: string, outcome: Outcome) {
  const line = JSON.stringify({ event: "contact_inquiry", inquiryType, outcome });
  if (outcome === "delivery_error" || outcome === "not_configured") {
    console.error(line);
  } else {
    console.info(line);
  }
}

function readInquiryType(value: FormDataEntryValue | null): InquiryType {
  return value === "teaming" ? "teaming" : "project";
}

function optional(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function buildInquiryEmail(input: {
  inquiryType: InquiryType;
  name: string;
  email: string;
  org?: string;
  program?: string;
  problem: string;
  timeline?: string;
}) {
  const isTeaming = input.inquiryType === "teaming";
  const label = isTeaming ? "Teaming inquiry" : "Project inquiry";
  const subject = `${label} — ${input.name}${input.org ? ` (${input.org})` : ""}`;

  const text = [
    `Inquiry type: ${isTeaming ? "Federal teaming / work package" : "Commercial project"}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.org ? `Organization: ${input.org}` : null,
    isTeaming && input.program ? `Program or opportunity: ${input.program}` : null,
    `Timeline: ${input.timeline ?? "Not yet defined"}`,
    "",
    isTeaming ? "--- Scope of work ---" : "--- Message ---",
    "",
    input.problem,
  ]
    .filter((v) => v !== null)
    .join("\n");

  return { subject, text };
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const inquiryType = readInquiryType(formData.get("inquiryType"));
  const raw = {
    inquiryType,
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    org: optional(formData.get("org")),
    program: inquiryType === "teaming" ? optional(formData.get("program")) : undefined,
    problem: formData.get("problem")?.toString() ?? "",
    timeline: optional(formData.get("timeline")),
    _hp: formData.get("_hp")?.toString() ?? "",
  };
  const values: ContactState["values"] = {
    name: raw.name,
    email: raw.email,
    org: raw.org ?? "",
    program: raw.program ?? "",
    problem: raw.problem,
    timeline: raw.timeline ?? "",
  };

  const result = ContactSchema.safeParse(raw);

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors;
    // Silently drop honeypot hits with a success-looking response.
    if (flat._hp?.length) {
      logOutcome(inquiryType, "honeypot");
      return { status: "success" };
    }
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const key of FIELD_NAMES) {
      if (flat[key]?.[0]) fieldErrors[key] = flat[key]![0];
    }
    logOutcome(inquiryType, "invalid");
    return { status: "error", fieldErrors, values };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_INBOX_TO?.trim() || DEFAULT_INBOX;
  const configured = Boolean(
    apiKey && apiKey !== "__SET_IN_SECRET_STORE__" && from,
  );

  if (!configured) {
    // Simulated success is for local development only. Deployed tiers must
    // never claim an inquiry was received when it was not sent.
    if (process.env.NODE_ENV === "development") {
      logOutcome(inquiryType, "simulated_dev");
      return { status: "success" };
    }
    logOutcome(inquiryType, "not_configured");
    return { status: "error", deliveryFailed: true, values };
  }

  const { subject, text } = buildInquiryEmail(result.data);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: from!,
      to,
      replyTo: result.data.email,
      subject,
      text,
    });

    if (error) {
      logOutcome(inquiryType, "delivery_error");
      return { status: "error", deliveryFailed: true, values };
    }

    logOutcome(inquiryType, "delivered");
    return { status: "success" };
  } catch {
    logOutcome(inquiryType, "delivery_error");
    return { status: "error", deliveryFailed: true, values };
  }
}
