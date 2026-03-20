import { NextResponse } from "next/server";
import { deliverContactIntake } from "@/lib/contact-intake";
import {
  CONTACT_SUBMISSION_GLOBAL_ERROR,
  validateContactSubmission,
} from "@/lib/contact-submission";

const METHOD_NOT_ALLOWED_ERROR = "Method not allowed.";
const DELIVERY_ERROR = "Something failed on our side. Try again in a moment.";

function methodNotAllowed() {
  return NextResponse.json(
    {
      data: null,
      error: METHOD_NOT_ALLOWED_ERROR,
      meta: {},
    },
    { status: 405 },
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateContactSubmission(body);

    if (!result.ok) {
      return NextResponse.json(
        {
          data: null,
          error: result.error,
          meta: { fieldErrors: result.fieldErrors },
        },
        { status: 400 },
      );
    }

    await deliverContactIntake(result.data);

    return NextResponse.json({
      data: { accepted: true },
      error: null,
      meta: { deliveryTarget: "founder-inbox" },
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          data: null,
          error: CONTACT_SUBMISSION_GLOBAL_ERROR,
          meta: {},
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        data: null,
        error: DELIVERY_ERROR,
        meta: {},
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return methodNotAllowed();
}
