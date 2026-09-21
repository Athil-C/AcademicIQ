import { NextResponse } from "next/server";
import { getContentRepository } from "@/lib/data";

export async function GET() {
  try {
    const repository = getContentRepository();
    const organizations = await repository.getOrganizations();
    return NextResponse.json({ organizations });
  } catch {
    return NextResponse.json({ organizations: [] });
  }
}
