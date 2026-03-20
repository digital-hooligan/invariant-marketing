export const CONTACT_SUBMISSION_FIELD_NAMES = [
  "name",
  "email",
  "companyOrRole",
  "message",
] as const;

export type ContactSubmissionFieldName =
  (typeof CONTACT_SUBMISSION_FIELD_NAMES)[number];

export type ContactSubmissionPayload = {
  name: string;
  email: string;
  companyOrRole?: string;
  message: string;
};

export type ContactSubmissionFieldErrors = Partial<
  Record<ContactSubmissionFieldName, string>
>;

export type ContactSubmissionValidationResult =
  | {
      ok: true;
      data: ContactSubmissionPayload;
    }
  | {
      ok: false;
      error: string;
      fieldErrors: ContactSubmissionFieldErrors;
    };

export const CONTACT_SUBMISSION_GLOBAL_ERROR =
  "Something's off. Check the fields below and try again.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactSubmission(
  body: unknown,
): ContactSubmissionValidationResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      error: CONTACT_SUBMISSION_GLOBAL_ERROR,
      fieldErrors: {
        name: "Enter your name.",
        email: "Enter your email.",
        message: "Add a bit of context.",
      },
    };
  }

  const record = body as Record<string, unknown>;
  const data: ContactSubmissionPayload = {
    name: normalizeString(record.name),
    email: normalizeString(record.email),
    companyOrRole: normalizeString(record.companyOrRole) || undefined,
    message: normalizeString(record.message),
  };

  const fieldErrors: ContactSubmissionFieldErrors = {};

  if (!data.name) {
    fieldErrors.name = "Enter your name.";
  } else if (data.name.length < 2) {
    fieldErrors.name = "Name looks too short.";
  } else if (data.name.length > 120) {
    fieldErrors.name = "Name is too long. Shorten and try again.";
  }

  if (!data.email) {
    fieldErrors.email = "Enter your email.";
  } else if (data.email.length > 254) {
    fieldErrors.email = "Email is too long. Check formatting.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (data.companyOrRole && data.companyOrRole.length > 120) {
    fieldErrors.companyOrRole = "Keep this shorter.";
  }

  if (!data.message) {
    fieldErrors.message = "Add a bit of context.";
  } else if (data.message.length < 10) {
    fieldErrors.message = "Add a few more details so we can understand.";
  } else if (data.message.length > 5000) {
    fieldErrors.message = "Too long. Focus on the key points.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: CONTACT_SUBMISSION_GLOBAL_ERROR,
      fieldErrors,
    };
  }

  return { ok: true, data };
}
