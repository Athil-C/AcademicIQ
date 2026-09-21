import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { getContentRepository } from "@/lib/data";
import { MediaItem } from "@/types";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOC_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 1. Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file format. Executable and unverified file types are prohibited." },
        { status: 400 }
      );
    }

    // 2. Validate Size Limit
    const isImage = file.type.startsWith("image/");
    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_DOC_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File exceeds maximum allowed size (${isImage ? "5MB for images" : "15MB for documents"})` },
        { status: 400 }
      );
    }

    // 3. Determine bucket & sanitized path
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const sanitizedBase = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    const uniquePath = `${Date.now()}-${sanitizedBase}`;

    let bucket = "academiq-media";
    if (isImage) bucket = "academiq-images";
    else if (file.type === "application/pdf") bucket = "academiq-pdfs";
    else bucket = "academiq-documents";

    const repository = getContentRepository();

    // 4. Handle Supabase Upload if connected
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(uniquePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(uploadData.path);

      // Save record in media table
      const { data: mediaRow, error: mediaError } = await supabase
        .from("media")
        .insert({
          file_name: file.name,
          storage_path: uploadData.path,
          bucket,
          mime_type: file.type,
          file_size: file.size,
          alt_text: file.name.replace(/\.[^/.]+$/, ""),
        })
        .select()
        .single();

      if (mediaError) {
        return NextResponse.json({ error: mediaError.message }, { status: 500 });
      }

      await repository.addAuditLog("MEDIA_UPLOAD", "MEDIA", mediaRow.id, {
        fileName: file.name,
        bucket,
      });

      return NextResponse.json({
        media: {
          ...mediaRow,
          public_url: publicUrlData.publicUrl,
        },
      });
    }

    // 5. Fallback Demo Mode Upload
    const demoMediaItem: MediaItem = {
      id: `media-${Date.now()}`,
      file_name: file.name,
      storage_path: `${bucket}/${uniquePath}`,
      bucket,
      mime_type: file.type,
      file_size: file.size,
      alt_text: file.name.replace(/\.[^/.]+$/, ""),
      public_url: isImage
        ? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop"
        : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await repository.addAuditLog("MEDIA_UPLOAD", "MEDIA", demoMediaItem.id, {
      fileName: file.name,
      mode: "DEMO",
    });

    return NextResponse.json({ media: demoMediaItem });
  } catch {
    return NextResponse.json({ error: "Internal server error during upload" }, { status: 500 });
  }
}
