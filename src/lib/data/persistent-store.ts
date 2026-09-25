// ==============================================================================
// AcademIQ — Persistent Content Store
// Ensures all content added/edited/deleted via Admin CMS is immediately and
// permanently available across all Next.js Server Components & Route Handlers.
// ==============================================================================

import { FullContentItem } from "@/types";

declare global {
  // eslint-disable-next-line no-var
  var __academiq_content_store__: FullContentItem[] | undefined;
}

function getFsModules() {
  if (typeof window !== "undefined") return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    const dataDir = path.join(process.cwd(), "data");
    const storeFile = path.join(dataDir, "content-store.json");
    return { fs, path, dataDir, storeFile };
  } catch {
    return null;
  }
}

function ensureDirectory() {
  const mods = getFsModules();
  if (!mods) return;
  try {
    if (mods.fs.existsSync(/*turbopackIgnore: true*/ mods.dataDir)) {
      mods.fs.mkdirSync(mods.dataDir, { recursive: true });
    }
  } catch {
    // Ignore in read-only environments
  }
}

export function loadPersistentContent(defaultInitialItems: FullContentItem[]): FullContentItem[] {
  // 1. Check in-memory globalThis cache first
  if (globalThis.__academiq_content_store__ && globalThis.__academiq_content_store__.length > 0) {
    return globalThis.__academiq_content_store__;
  }

  // 2. Try loading from file
  ensureDirectory();
  const mods = getFsModules();
  if (mods) {
    try {
      if (mods.fs.existsSync(/*turbopackIgnore: true*/ mods.storeFile)) {
        const raw = mods.fs.readFileSync(/*turbopackIgnore: true*/ mods.storeFile, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          globalThis.__academiq_content_store__ = parsed;
          return parsed;
        }
      }
    } catch (err) {
      console.error("Failed to read content-store.json:", err);
    }
  }

  // 3. Initialize with default initial demo items and persist to file
  const initial = [...defaultInitialItems];
  globalThis.__academiq_content_store__ = initial;
  savePersistentContent(initial);
  return initial;
}

export function savePersistentContent(items: FullContentItem[]) {
  globalThis.__academiq_content_store__ = items;
  ensureDirectory();
  const mods = getFsModules();
  if (mods) {
    try {
      mods.fs.writeFileSync(mods.storeFile, JSON.stringify(items, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to write content-store.json:", err);
    }
  }
}
