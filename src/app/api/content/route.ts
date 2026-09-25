import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContentRepository } from "@/lib/data";
import { ContentFilterParams } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const query = searchParams.get("query") || searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const filter: ContentFilterParams = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: type ? (type as any) : undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      status: status ? (status as any) : undefined,
      category: category || undefined,
      query: query || undefined,
      page,
      limit,
    };

    const repository = getContentRepository();
    const result = await repository.getContentList(filter);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ items: [], total: 0 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.content_type) {
      return NextResponse.json(
        { error: "Title and Content Type are required" },
        { status: 400 }
      );
    }

    const repository = getContentRepository();
    const created = await repository.createContent(body, body);
    try {
      revalidatePath("/", "layout");
    } catch {
      // ignore
    }
    return NextResponse.json({ success: true, item: created });
  } catch {
    return NextResponse.json(
      { error: "Failed to create academic content item." },
      { status: 500 }
    );
  }
}
