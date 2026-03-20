import "server-only";

import nodemailer from "nodemailer";

export type ContactIntakeSource = "contact" | "cohort";

export type ContactIntakePayload = {
  source: ContactIntakeSource;
  name: string;
  email: string;
  organization?: string;
  role?: string;
  timeline?: string;
  message: string;
};

function requireContactIntakeEnv(key: string) {
  const value = process.env[key];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing contact intake configuration: ${key}`);
  }

  return value;
}

function createTransport() {
  const host = requireContactIntakeEnv("SMTP_HOST");
  const port = Number(requireContactIntakeEnv("SMTP_PORT"));
  const user = requireContactIntakeEnv("SMTP_USER");
  const pass = requireContactIntakeEnv("SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function buildSubject({ source, name }: ContactIntakePayload) {
  return source === "cohort"
    ? `New cohort intake from ${name}`
    : `New contact intake from ${name}`;
}

function buildTextBody(payload: ContactIntakePayload) {
  const fields = [
    `Source: ${payload.source}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Organization: ${payload.organization || "Not provided"}`,
    `Role: ${payload.role || "Not provided"}`,
    `Timeline: ${payload.timeline || "Not provided"}`,
    "",
    "Message",
    payload.message,
  ];

  return fields.join("\n");
}

export async function deliverContactIntake(payload: ContactIntakePayload) {
  const founderInbox = requireContactIntakeEnv("FOUNDER_INBOX_EMAIL");
  const fromEmail = requireContactIntakeEnv("CONTACT_INTAKE_FROM_EMAIL");
  const transport = createTransport();

  await transport.sendMail({
    to: founderInbox,
    from: fromEmail,
    replyTo: payload.email,
    subject: buildSubject(payload),
    text: buildTextBody(payload),
  });
}
