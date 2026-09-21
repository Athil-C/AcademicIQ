import { NextResponse } from "next/server";
import { getContentRepository } from "@/lib/data";

export async function GET() {
  try {
    const repository = getContentRepository();
    const media = await repository.getMediaList();
    return NextResponse.json({ media });
  } catch {
    return NextResponse.json({ media: [] });
  }
}
