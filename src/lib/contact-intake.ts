import "server-only";

import nodemailer from "nodemailer";
import type { ContactSubmissionPayload } from "@/lib/contact-submission";

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

function getFounderInboxEmail() {
  return (
    process.env.CONTACT_INBOX_TO?.trim() ||
    process.env.FOUNDER_INBOX_EMAIL?.trim() ||
    requireContactIntakeEnv("CONTACT_INBOX_TO")
  );
}

function buildSubject({ name }: ContactSubmissionPayload) {
  return `New contact submission - ${name}`;
}

function buildTextBody(payload: ContactSubmissionPayload) {
  const fields = [
    "Contact submission received",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company or role: ${payload.companyOrRole || "Not provided"}`,
    "",
    "Context:",
    payload.message,
  ];

  return fields.join("\n");
}

export async function deliverContactIntake(payload: ContactSubmissionPayload) {
  const founderInbox = getFounderInboxEmail();
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
