import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "./config";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (typeof window === "undefined") {
    // Return null or create dummy on server if called incorrectly
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
    return createBrowserClient(url, anonKey);
  }

  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-anon-key";

  if (!isSupabaseConfigured()) {
    // When Supabase is not configured, still initialize safe client without breaking
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      anonKey
    );
  }

  if (!browserClient) {
    browserClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      anonKey
    );
  }

  return browserClient;
}
