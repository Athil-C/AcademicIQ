import { NextResponse } from "next/server";
import { getContentRepository } from "@/lib/data";

export async function GET() {
  try {
    const repository = getContentRepository();
    const categories = await repository.getCategories();
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ categories: [] });
  }
}
