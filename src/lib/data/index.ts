// ==============================================================================
// AcademIQ — Repository Factory & Data Mode Resolution
// ==============================================================================

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { IContentRepository } from "./content-repository";
import { SupabaseContentRepository } from "./supabase-content-repository";
import { DemoContentRepository } from "./demo-content-repository";

let repositoryInstance: IContentRepository | null = null;

export function getContentRepository(): IContentRepository {
  if (!repositoryInstance) {
    if (isSupabaseConfigured()) {
      repositoryInstance = new SupabaseContentRepository();
    } else {
      repositoryInstance = new DemoContentRepository();
    }
  }
  return repositoryInstance;
}

export function getDataMode(): "CONNECTED" | "DEMO" {
  return isSupabaseConfigured() ? "CONNECTED" : "DEMO";
}

export * from "./content-repository";
