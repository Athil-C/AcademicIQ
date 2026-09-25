// ==============================================================================
// AcademIQ — Repository Factory & Data Mode Resolution
// ==============================================================================

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { IContentRepository } from "./content-repository";
import { SupabaseContentRepository } from "./supabase-content-repository";
import { DemoContentRepository } from "./demo-content-repository";

declare global {
  // eslint-disable-next-line no-var
  var __academiq_repo_instance__: IContentRepository | undefined;
}

export function getContentRepository(): IContentRepository {
  if (!globalThis.__academiq_repo_instance__) {
    if (isSupabaseConfigured()) {
      globalThis.__academiq_repo_instance__ = new SupabaseContentRepository();
    } else {
      globalThis.__academiq_repo_instance__ = new DemoContentRepository();
    }
  }
  return globalThis.__academiq_repo_instance__;
}

export function getDataMode(): "CONNECTED" | "DEMO" {
  return isSupabaseConfigured() ? "CONNECTED" : "DEMO";
}

export * from "./content-repository";
