import { NextRequest, NextResponse } from "next/server";
import { getContentRepository } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "A valid institutional email is required." },
        { status: 400 }
      );
    }

    const repository = getContentRepository();
    const result = await repository.subscribeNewsletter(email);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, message: "Subscription service unavailable. Please try again shortly." },
      { status: 500 }
    );
  }
}
