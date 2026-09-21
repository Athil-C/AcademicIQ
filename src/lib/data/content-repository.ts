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

export interface DashboardStats {
  total: number;
  published: number;
  drafts: number;
  papers: number;
  cfps: number;
  conferences: number;
  opportunities: number;
}

export interface MediaUsageResult {
  count: number;
  items: { id: string; title: string; type: string; slug: string }[];
}

export interface IContentRepository {
  getContentList(params?: ContentFilterParams): Promise<{ items: FullContentItem[]; total: number }>;
  getContentBySlug(slug: string): Promise<FullContentItem | null>;
  getContentById(id: string): Promise<FullContentItem | null>;
  getFeaturedContent(limit?: number): Promise<FullContentItem[]>;
  getUpcomingDeadlines(limit?: number): Promise<FullContentItem[]>;
  getRelatedContent(item: FullContentItem, limit?: number): Promise<FullContentItem[]>;
  getCategories(): Promise<Category[]>;
  getTags(): Promise<Tag[]>;
  getOrganizations(): Promise<Organization[]>;
  getAuthors(): Promise<Author[]>;
  getMediaList(bucket?: string): Promise<MediaItem[]>;
  getMediaUsage(mediaId: string): Promise<MediaUsageResult>;
  createContent(data: Partial<FullContentItem>, specData?: Record<string, unknown>): Promise<FullContentItem>;
  updateContent(id: string, data: Partial<FullContentItem>, specData?: Record<string, unknown>): Promise<FullContentItem>;
  deleteContent(id: string): Promise<boolean>;
  updateContentStatus(id: string, status: ContentStatus): Promise<boolean>;
  toggleFeatured(id: string, featured: boolean): Promise<boolean>;
  getDashboardStats(): Promise<DashboardStats>;
  getAuditLogs(limit?: number): Promise<AuditLog[]>;
  addAuditLog(action: string, entityType: string, entityId?: string, details?: Record<string, unknown>): Promise<void>;
  subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }>;
}
