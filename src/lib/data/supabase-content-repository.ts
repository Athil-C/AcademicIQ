// ==============================================================================
// AcademIQ — Supabase Content Repository
// Connects to Supabase PostgreSQL & Storage with polymorphic content queries
// ==============================================================================

import { createClient } from "@/lib/supabase/client";
import {
  Category,
  Tag,
  Organization,
  Author,
  MediaItem,
  FullContentItem,
  ContentFilterParams,
  ContentStatus,
  AuditLog,
} from "@/types";
import {
  IContentRepository,
  DashboardStats,
  MediaUsageResult,
} from "./content-repository";
import { DemoContentRepository } from "./demo-content-repository";

declare global {
  // eslint-disable-next-line no-var
  var __academiq_demo_fallback_repo__: DemoContentRepository | undefined;
}

export class SupabaseContentRepository implements IContentRepository {
  private get fallback(): DemoContentRepository {
    if (!globalThis.__academiq_demo_fallback_repo__) {
      globalThis.__academiq_demo_fallback_repo__ = new DemoContentRepository();
    }
    return globalThis.__academiq_demo_fallback_repo__;
  }

  private getClient() {
    return createClient();
  }

  async getContentList(params: ContentFilterParams = {}): Promise<{ items: FullContentItem[]; total: number }> {
    try {
      const supabase = this.getClient();
      let query = supabase
        .from("content")
        .select(`
          *,
          category:categories(*),
          organization:organizations(*),
          authors:content_authors(author:authors(*)),
          tags:content_tags(tag:tags(*)),
          research_paper:research_papers(*),
          cfp:cfps(*),
          conference:conferences(*),
          opportunity:opportunities(*),
          funding:funding(*),
          fellowship:fellowships(*),
          workshop:workshops(*),
          webinar:webinars(*),
          article:articles(*),
          resource:resources(*)
        `, { count: "exact" });

      if (params.status) {
        query = query.eq("status", params.status);
      } else {
        query = query.eq("status", "PUBLISHED");
      }

      if (params.type) {
        query = query.eq("content_type", params.type);
      }

      if (params.category) {
        query = query.eq("categories.slug", params.category);
      }

      if (params.featured !== undefined) {
        query = query.eq("featured", params.featured);
      }

      if (params.query && params.query.trim()) {
        query = query.ilike("title", `%${params.query.trim()}%`);
      }

      const page = params.page || 1;
      const limit = params.limit || 20;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to).order("published_at", { ascending: false, nullsFirst: false });

      const { data, count, error } = await query;
      if (error || !data || data.length === 0) {
        return this.fallback.getContentList(params);
      }

      const items = data.map(this.normalizeItem);
      return { items, total: count || items.length };
    } catch {
      return this.fallback.getContentList(params);
    }
  }

  async getContentBySlug(slug: string): Promise<FullContentItem | null> {
    try {
      const supabase = this.getClient();
      const { data, error } = await supabase
        .from("content")
        .select(`
          *,
          category:categories(*),
          organization:organizations(*),
          authors:content_authors(author:authors(*)),
          tags:content_tags(tag:tags(*)),
          research_paper:research_papers(*),
          cfp:cfps(*),
          conference:conferences(*),
          opportunity:opportunities(*),
          funding:funding(*),
          fellowship:fellowships(*),
          workshop:workshops(*),
          webinar:webinars(*),
          article:articles(*),
          resource:resources(*)
        `)
        .eq("slug", slug)
        .maybeSingle();

      if (error || !data) {
        return this.fallback.getContentBySlug(slug);
      }

      return this.normalizeItem(data);
    } catch {
      return this.fallback.getContentBySlug(slug);
    }
  }

  async getContentById(id: string): Promise<FullContentItem | null> {
    try {
      const supabase = this.getClient();
      const { data, error } = await supabase
        .from("content")
        .select(`
          *,
          category:categories(*),
          organization:organizations(*),
          authors:content_authors(author:authors(*)),
          tags:content_tags(tag:tags(*)),
          research_paper:research_papers(*),
          cfp:cfps(*),
          conference:conferences(*),
          opportunity:opportunities(*),
          funding:funding(*),
          fellowship:fellowships(*),
          workshop:workshops(*),
          webinar:webinars(*),
          article:articles(*),
          resource:resources(*)
        `)
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        return this.fallback.getContentById(id);
      }

      return this.normalizeItem(data);
    } catch {
      return this.fallback.getContentById(id);
    }
  }

  async getFeaturedContent(limit = 6): Promise<FullContentItem[]> {
    try {
      const supabase = this.getClient();
      const { data, error } = await supabase
        .from("content")
        .select(`
          *,
          category:categories(*),
          organization:organizations(*),
          research_paper:research_papers(*),
          cfp:cfps(*),
          conference:conferences(*),
          funding:funding(*)
        `)
        .eq("status", "PUBLISHED")
        .eq("featured", true)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error || !data || data.length === 0) {
        return this.fallback.getFeaturedContent(limit);
      }
      return data.map(this.normalizeItem);
    } catch {
      return this.fallback.getFeaturedContent(limit);
    }
  }

  async getUpcomingDeadlines(limit = 6): Promise<FullContentItem[]> {
    return this.fallback.getUpcomingDeadlines(limit);
  }

  async getRelatedContent(item: FullContentItem, limit = 3): Promise<FullContentItem[]> {
    return this.fallback.getRelatedContent(item, limit);
  }

  async getCategories(): Promise<Category[]> {
    try {
      const supabase = this.getClient();
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error || !data || data.length === 0) return this.fallback.getCategories();
      return data;
    } catch {
      return this.fallback.getCategories();
    }
  }

  async getTags(): Promise<Tag[]> {
    try {
      const supabase = this.getClient();
      const { data, error } = await supabase.from("tags").select("*").order("name");
      if (error || !data || data.length === 0) return this.fallback.getTags();
      return data;
    } catch {
      return this.fallback.getTags();
    }
  }

  async getOrganizations(): Promise<Organization[]> {
    try {
      const supabase = this.getClient();
      const { data, error } = await supabase.from("organizations").select("*").order("name");
      if (error || !data || data.length === 0) return this.fallback.getOrganizations();
      return data;
    } catch {
      return this.fallback.getOrganizations();
    }
  }

  async getAuthors(): Promise<Author[]> {
    try {
      const supabase = this.getClient();
      const { data, error } = await supabase.from("authors").select("*").order("name");
      if (error || !data || data.length === 0) return this.fallback.getAuthors();
      return data;
    } catch {
      return this.fallback.getAuthors();
    }
  }

  async getMediaList(): Promise<MediaItem[]> {
    try {
      const supabase = this.getClient();
      const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false });
      if (error || !data || data.length === 0) return this.fallback.getMediaList();
      return data;
    } catch {
      return this.fallback.getMediaList();
    }
  }

  async getMediaUsage(mediaId: string): Promise<MediaUsageResult> {
    return this.fallback.getMediaUsage(mediaId);
  }

  async createContent(data: Partial<FullContentItem>, specData: Record<string, unknown> = {}): Promise<FullContentItem> {
    try {
      const supabase = this.getClient();
      const { data: newRow, error } = await supabase
        .from("content")
        .insert({
          title: data.title,
          slug: data.slug,
          short_description: data.short_description,
          content: data.content,
          content_type: data.content_type,
          status: data.status || "DRAFT",
          featured: data.featured || false,
          category_id: data.category_id,
          organization_id: data.organization_id,
          country: data.country,
          location: data.location,
          published_at: data.status === "PUBLISHED" ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (error || !newRow) {
        return this.fallback.createContent(data, specData);
      }

      return this.normalizeItem(newRow);
    } catch {
      return this.fallback.createContent(data, specData);
    }
  }

  async updateContent(id: string, data: Partial<FullContentItem>, specData: Record<string, unknown> = {}): Promise<FullContentItem> {
    try {
      const supabase = this.getClient();
      const { data: updatedRow, error } = await supabase
        .from("content")
        .update({
          title: data.title,
          short_description: data.short_description,
          content: data.content,
          status: data.status,
          featured: data.featured,
          category_id: data.category_id,
          organization_id: data.organization_id,
          country: data.country,
          location: data.location,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error || !updatedRow) {
        return this.fallback.updateContent(id, data, specData);
      }

      return this.normalizeItem(updatedRow);
    } catch {
      return this.fallback.updateContent(id, data, specData);
    }
  }

  async deleteContent(id: string): Promise<boolean> {
    try {
      const supabase = this.getClient();
      const { error } = await supabase.from("content").delete().eq("id", id);
      if (error) return this.fallback.deleteContent(id);
      return true;
    } catch {
      return this.fallback.deleteContent(id);
    }
  }

  async updateContentStatus(id: string, status: ContentStatus): Promise<boolean> {
    try {
      const supabase = this.getClient();
      const { error } = await supabase
        .from("content")
        .update({
          status,
          published_at: status === "PUBLISHED" ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) return this.fallback.updateContentStatus(id, status);
      return true;
    } catch {
      return this.fallback.updateContentStatus(id, status);
    }
  }

  async toggleFeatured(id: string, featured: boolean): Promise<boolean> {
    try {
      const supabase = this.getClient();
      const { error } = await supabase.from("content").update({ featured }).eq("id", id);
      if (error) return this.fallback.toggleFeatured(id, featured);
      return true;
    } catch {
      return this.fallback.toggleFeatured(id, featured);
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.fallback.getDashboardStats();
  }

  async getAuditLogs(limit = 15): Promise<AuditLog[]> {
    try {
      const supabase = this.getClient();
      const { data, error } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(limit);
      if (error || !data || data.length === 0) return this.fallback.getAuditLogs(limit);
      return data;
    } catch {
      return this.fallback.getAuditLogs(limit);
    }
  }

  async addAuditLog(action: string, entityType: string, entityId?: string, details?: Record<string, unknown>): Promise<void> {
    try {
      const supabase = this.getClient();
      await supabase.from("audit_logs").insert({
        action,
        entity_type: entityType,
        entity_id: entityId,
        details,
      });
    } catch {
      await this.fallback.addAuditLog(action, entityType, entityId, details);
    }
  }

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const supabase = this.getClient();
      const { error } = await supabase.from("newsletter_subscribers").insert({ email });
      if (error) {
        if (error.code === "23505") {
          return { success: true, message: "You are already subscribed to AcademIQ." };
        }
        return this.fallback.subscribeNewsletter(email);
      }
      return { success: true, message: "Thank you for subscribing to AcademIQ Research & CFP alerts!" };
    } catch {
      return this.fallback.subscribeNewsletter(email);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private normalizeItem(raw: any): FullContentItem {
    const authors = raw.authors?.map((a: { author: Author }) => a.author) || [];
    const tags = raw.tags?.map((t: { tag: Tag }) => t.tag) || [];

    return {
      ...raw,
      authors,
      tags,
      research_paper: Array.isArray(raw.research_paper) ? raw.research_paper[0] : raw.research_paper,
      cfp: Array.isArray(raw.cfp) ? raw.cfp[0] : raw.cfp,
      conference: Array.isArray(raw.conference) ? raw.conference[0] : raw.conference,
      opportunity: Array.isArray(raw.opportunity) ? raw.opportunity[0] : raw.opportunity,
      funding: Array.isArray(raw.funding) ? raw.funding[0] : raw.funding,
      fellowship: Array.isArray(raw.fellowship) ? raw.fellowship[0] : raw.fellowship,
      workshop: Array.isArray(raw.workshop) ? raw.workshop[0] : raw.workshop,
      webinar: Array.isArray(raw.webinar) ? raw.webinar[0] : raw.webinar,
      article: Array.isArray(raw.article) ? raw.article[0] : raw.article,
      resource: Array.isArray(raw.resource) ? raw.resource[0] : raw.resource,
    };
  }
}
