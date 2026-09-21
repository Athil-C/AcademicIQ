import { NextRequest, NextResponse } from "next/server";
import { getContentRepository } from "@/lib/data";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    const repository = getContentRepository();
    const usage = await repository.getMediaUsage(id);

    if (usage.count > 0 && !force) {
      return NextResponse.json(
        {
          error: `This media is currently referenced by ${usage.count} content items. Deletion blocked to protect document integrity.`,
          usage,
        },
        { status: 409 }
      );
    }

    await repository.addAuditLog("MEDIA_DELETE", "MEDIA", id, { force });
    return NextResponse.json({ success: true, message: "Media removed successfully." });
  } catch {
    return NextResponse.json({ error: "Failed to process media deletion" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const repository = getContentRepository();
  const usage = await repository.getMediaUsage(id);
  return NextResponse.json({ usage });
}
