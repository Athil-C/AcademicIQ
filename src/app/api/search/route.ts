import { NextRequest, NextResponse } from "next/server";
import { getContentRepository } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const type = searchParams.get("type");
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const repository = getContentRepository();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { items, total } = await repository.getContentList({
    query: q,
    type: type ? (type as any) : undefined,
    limit,
    status: "PUBLISHED",
  });

  return NextResponse.json({ items, total });
}
