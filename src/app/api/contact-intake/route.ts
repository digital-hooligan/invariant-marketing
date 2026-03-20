import { NextResponse } from "next/server";
import {
  deliverContactIntake,
  type ContactIntakePayload,
} from "@/lib/contact-intake";

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePayload(body: unknown): ContactIntakePayload | null {
  if (!body || typeof body !== "object") return null;

  const source = normalizeString((body as Record<string, unknown>).source);
  const name = normalizeString((body as Record<string, unknown>).name);
  const email = normalizeString((body as Record<string, unknown>).email);
  const organization = normalizeString(
    (body as Record<string, unknown>).organization,
  );
  const role = normalizeString((body as Record<string, unknown>).role);
  const timeline = normalizeString((body as Record<string, unknown>).timeline);
  const message = normalizeString((body as Record<string, unknown>).message);

  if (!["contact", "cohort"].includes(source)) return null;
  if (!name || !email || !message) return null;

  return {
    source: source as ContactIntakePayload["source"],
    name,
    email,
    organization: organization || undefined,
    role: role || undefined,
    timeline: timeline || undefined,
    message,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parsePayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid contact intake payload." },
        { status: 400 },
      );
    }

    await deliverContactIntake(payload);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit your request right now." },
      { status: 500 },
    );
  }
}
