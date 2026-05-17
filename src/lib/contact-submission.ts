export const CONTACT_SUBMISSION_FIELD_NAMES = [
  "name",
  "email",
  "companyOrRole",
  "message",
] as const;

export const CONTACT_SUBMISSION_ALLOWED_KEYS = [
  "name",
  "email",
  "companyOrRole",
  "message",
  "honeypot",
] as const;

export type ContactSubmissionFieldName =
  (typeof CONTACT_SUBMISSION_FIELD_NAMES)[number];

type ContactSubmissionAllowedKey =
  (typeof CONTACT_SUBMISSION_ALLOWED_KEYS)[number];

export type ContactSubmissionPayload = {
  name: string;
  email: string;
  companyOrRole?: string;
  message: string;
};

type ContactSubmissionRequestShape = ContactSubmissionPayload & {
  honeypot?: string;
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
  "Check the highlighted fields and try again.";

export const CONTACT_SUBMISSION_REQUEST_ERROR = "Unable to process request.";

export const CONTACT_SUBMISSION_MAX_BODY_BYTES = 8 * 1024;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARACTERS_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const LINE_ENDINGS_PATTERN = /\r\n?/g;
const COLLAPSIBLE_WHITESPACE_PATTERN = /\s+/g;

const FIELD_LIMITS = {
  name: 100,
  email: 320,
  companyOrRole: 120,
  message: 5000,
} as const;

export type ContactSubmissionRequestValidationResult =
  | {
      ok: true;
      data: ContactSubmissionPayload;
    }
  | {
      ok: false;
      status: 400 | 413;
    };

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeBaseText(value: string) {
  return value
    .replace(LINE_ENDINGS_PATTERN, "\n")
    .replace(CONTROL_CHARACTERS_PATTERN, "");
}

function sanitizeCompactText(value: string) {
  return sanitizeBaseText(value).trim().replace(COLLAPSIBLE_WHITESPACE_PATTERN, " ");
}

function sanitizeMessageText(value: string) {
  return sanitizeBaseText(value).trim();
}

function sanitizeEmailText(value: string) {
  return sanitizeBaseText(value).trim();
}

function buildContactPayload(
  record: Partial<Record<ContactSubmissionAllowedKey, string>>,
): ContactSubmissionRequestShape {
  return {
    name: sanitizeCompactText(record.name || ""),
    email: sanitizeEmailText(record.email || ""),
    companyOrRole: sanitizeCompactText(record.companyOrRole || "") || undefined,
    message: sanitizeMessageText(record.message || ""),
    honeypot: sanitizeCompactText(record.honeypot || "") || undefined,
  };
}

function hasUnknownKeys(record: Record<string, unknown>) {
  return Object.keys(record).some(
    (key) =>
      !(CONTACT_SUBMISSION_ALLOWED_KEYS as readonly string[]).includes(key),
  );
}

function isFlatRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(
    (entry) =>
      entry === undefined ||
      typeof entry === "string" ||
      entry === null ||
      typeof entry === "number" ||
      typeof entry === "boolean" ||
      Array.isArray(entry) ||
      typeof entry === "object",
  );
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
        message: "Add a message.",
      },
    };
  }

  const record = body as Record<string, unknown>;
  const data = buildContactPayload({
    name: normalizeString(record.name),
    email: normalizeString(record.email),
    companyOrRole: normalizeString(record.companyOrRole),
    message: normalizeString(record.message),
  });

  const fieldErrors: ContactSubmissionFieldErrors = {};

  if (!data.name) {
    fieldErrors.name = "Enter your name.";
  } else if (data.name.length < 2) {
    fieldErrors.name = "Name looks too short.";
  } else if (data.name.length > FIELD_LIMITS.name) {
    fieldErrors.name = "Name is too long. Shorten and try again.";
  }

  if (!data.email) {
    fieldErrors.email = "Enter your email.";
  } else if (data.email.length > FIELD_LIMITS.email) {
    fieldErrors.email = "Email is too long. Check formatting.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (data.companyOrRole && data.companyOrRole.length > FIELD_LIMITS.companyOrRole) {
    fieldErrors.companyOrRole = "Keep this shorter.";
  }

  if (!data.message) {
    fieldErrors.message = "Add a message.";
  } else if (data.message.length < 10) {
    fieldErrors.message = "Add a few more details so we can understand.";
  } else if (data.message.length > FIELD_LIMITS.message) {
    fieldErrors.message = "Too long. Focus on the key points.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: CONTACT_SUBMISSION_GLOBAL_ERROR,
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      name: data.name,
      email: data.email,
      companyOrRole: data.companyOrRole,
      message: data.message,
    },
  };
}

function exceedsFieldLimits(payload: ContactSubmissionRequestShape) {
  return (
    payload.name.length > FIELD_LIMITS.name ||
    payload.email.length > FIELD_LIMITS.email ||
    (payload.companyOrRole || "").length > FIELD_LIMITS.companyOrRole ||
    payload.message.length > FIELD_LIMITS.message
  );
}

export function validateContactSubmissionRequest(
  body: unknown,
): ContactSubmissionRequestValidationResult {
  if (!isFlatRecord(body)) {
    return { ok: false, status: 400 };
  }

  const record = body as Record<string, unknown>;

  if (hasUnknownKeys(record)) {
    return { ok: false, status: 400 };
  }

  for (const [key, value] of Object.entries(record)) {
    if (typeof value !== "string") {
      return { ok: false, status: 400 };
    }

    if (key === "honeypot" && value.length > 0) {
      return { ok: false, status: 400 };
    }
  }

  const payload = buildContactPayload(record as Partial<Record<ContactSubmissionAllowedKey, string>>);

  if (payload.honeypot) {
    return { ok: false, status: 400 };
  }

  if (!payload.name || !payload.email || !payload.message) {
    return { ok: false, status: 400 };
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return { ok: false, status: 400 };
  }

  if (exceedsFieldLimits(payload)) {
    return { ok: false, status: 413 };
  }

  return {
    ok: true,
    data: {
      name: payload.name,
      email: payload.email,
      companyOrRole: payload.companyOrRole,
      message: payload.message,
    },
  };
}
