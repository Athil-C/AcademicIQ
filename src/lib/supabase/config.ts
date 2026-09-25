// ==============================================================================
// AcademIQ — Supabase Environment & Status Configuration
// ==============================================================================

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return false;
  if (url.includes("your-project-id") || key.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")) {
    return false;
  }
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function getSupabaseConfig() {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: key,
    isConfigured: isSupabaseConfigured(),
  };
}

export function getDataMode(): "CONNECTED" | "DEMO" {
  return isSupabaseConfigured() ? "CONNECTED" : "DEMO";
}
