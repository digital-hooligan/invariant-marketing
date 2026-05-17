import { NextResponse } from "next/server";
import { deliverContactIntake } from "@/lib/contact-intake";
import {
  CONTACT_SUBMISSION_MAX_BODY_BYTES,
  CONTACT_SUBMISSION_REQUEST_ERROR,
  validateContactSubmissionRequest,
} from "@/lib/contact-submission";

const GENERIC_FAILURE_BODY = {
  data: null,
  error: CONTACT_SUBMISSION_REQUEST_ERROR,
  meta: {
    submitted: false,
  },
} as const;

function buildFailureResponse(status: 400 | 405 | 413 | 415 | 500) {
  return NextResponse.json(GENERIC_FAILURE_BODY, { status });
}

function isJsonContentType(request: Request) {
  const contentType = request.headers.get("content-type");

  if (!contentType) {
    return false;
  }

  const [mediaType] = contentType.split(";");
  return mediaType.trim().toLowerCase() === "application/json";
}

function getContentLength(request: Request) {
  const header = request.headers.get("content-length");

  if (!header) {
    return null;
  }

  const parsed = Number.parseInt(header, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function isBodyTooLarge(body: string) {
  return new TextEncoder().encode(body).length > CONTACT_SUBMISSION_MAX_BODY_BYTES;
}

function methodNotAllowed() {
  return buildFailureResponse(405);
}

export async function POST(request: Request) {
  if (!isJsonContentType(request)) {
    return buildFailureResponse(415);
  }

  const contentLength = getContentLength(request);

  if (contentLength !== null && contentLength > CONTACT_SUBMISSION_MAX_BODY_BYTES) {
    return buildFailureResponse(413);
  }

  try {
    const rawBody = await request.text();

    if (isBodyTooLarge(rawBody)) {
      return buildFailureResponse(413);
    }

    const body = JSON.parse(rawBody) as unknown;
    const result = validateContactSubmissionRequest(body);

    if (!result.ok) {
      return buildFailureResponse(result.status);
    }

    await deliverContactIntake(result.data);

    return NextResponse.json({
      data: { accepted: true },
      error: null,
      meta: { deliveryTarget: "founder-inbox" },
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return buildFailureResponse(400);
    }

    return buildFailureResponse(500);
  }
}

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function OPTIONS() {
  return methodNotAllowed();
}
