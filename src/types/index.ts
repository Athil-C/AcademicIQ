// ==============================================================================
// AcademIQ — Data Types & Models
// ==============================================================================

export type UserRole = 'ADMIN' | 'EDITOR' | 'USER';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface MediaItem {
  id: string;
  file_name: string;
  storage_path: string;
  bucket: string;
  mime_type: string;
  file_size: number;
  width?: number | null;
  height?: number | null;
  alt_text?: string | null;
  caption?: string | null;
  uploaded_by?: string | null;
  created_at?: string;
  updated_at?: string;
  public_url?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_media_id?: string | null;
  logo_url?: string | null;
  website?: string | null;
  country?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Author {
  id: string;
  name: string;
  affiliation?: string | null;
  avatar_media_id?: string | null;
  avatar_url?: string | null;
  orcid?: string | null;
  email?: string | null;
  bio?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type ContentType =
  | 'RESEARCH_PAPER'
  | 'CFP'
  | 'CONFERENCE'
  | 'OPPORTUNITY'
  | 'FUNDING'
  | 'FELLOWSHIP'
  | 'WORKSHOP'
  | 'WEBINAR'
  | 'ARTICLE'
  | 'RESOURCE';

export type ContentStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface BaseContent {
  id: string;
  title: string;
  slug: string;
  short_description?: string | null;
  content?: string | null; // Rich text body or detailed overview
  content_type: ContentType;
  status: ContentStatus;
  featured: boolean;
  cover_image_id?: string | null;
  cover_image_url?: string | null;
  category_id?: string | null;
  category?: Category | null;
  organization_id?: string | null;
  organization?: Organization | null;
  country?: string | null;
  location?: string | null;
  external_url?: string | null;
  published_at?: string | null;
  scheduled_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  authors?: Author[];
}

export interface ResearchPaperSpec {
  abstract?: string | null;
  publication_date?: string | null;
  journal?: string | null;
  volume?: string | null;
  issue?: string | null;
  doi?: string | null;
  publisher?: string | null;
  pdf_media_id?: string | null;
  pdf_url?: string | null;
}

export interface CFPSpec {
  conference_name: string;
  theme?: string | null;
  organizing_institution?: string | null;
  submission_deadline: string;
  abstract_deadline?: string | null;
  full_paper_deadline?: string | null;
  notification_date?: string | null;
  conference_start?: string | null;
  conference_end?: string | null;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  submission_url?: string | null;
  cfp_pdf_media_id?: string | null;
  cfp_pdf_url?: string | null;
  contact_email?: string | null;
}

export interface ConferenceSpec {
  conference_name: string;
  theme?: string | null;
  organizer?: string | null;
  start_date: string;
  end_date?: string | null;
  submission_deadline?: string | null;
  registration_deadline?: string | null;
  country?: string | null;
  city?: string | null;
  venue?: string | null;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  website?: string | null;
  registration_url?: string | null;
  cfp_url?: string | null;
  contact?: string | null;
}

export interface OpportunitySpec {
  opportunity_type: string;
  eligibility?: string | null;
  location?: string | null;
  deadline?: string | null;
  research_area?: string | null;
  application_url?: string | null;
}

export interface FundingSpec {
  provider?: string | null;
  eligibility?: string | null;
  funding_amount?: string | null;
  deadline?: string | null;
  eligible_countries?: string[];
  research_areas?: string[];
  application_url?: string | null;
  official_website?: string | null;
  document_media_id?: string | null;
  document_url?: string | null;
}

export interface FellowshipSpec {
  institution?: string | null;
  eligibility?: string | null;
  duration?: string | null;
  funding?: string | null;
  deadline?: string | null;
  location?: string | null;
  eligible_countries?: string[];
  application_url?: string | null;
  official_website?: string | null;
}

export interface WorkshopSpec {
  organizer?: string | null;
  speaker?: string | null;
  date: string;
  time?: string | null;
  timezone?: string | null;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  registration_url?: string | null;
  meeting_url?: string | null;
}

export interface WebinarSpec {
  organizer?: string | null;
  speaker?: string | null;
  date: string;
  time?: string | null;
  timezone?: string | null;
  registration_url?: string | null;
  meeting_url?: string | null;
}

export interface ArticleSpec {
  excerpt?: string | null;
  reading_time?: number;
}

export interface ResourceSpec {
  resource_type: string;
  author_org?: string | null;
  download_media_id?: string | null;
  download_url?: string | null;
  file_format?: string | null;
  file_size?: string | null;
}

export interface FullContentItem extends BaseContent {
  research_paper?: ResearchPaperSpec | null;
  cfp?: CFPSpec | null;
  conference?: ConferenceSpec | null;
  opportunity?: OpportunitySpec | null;
  funding?: FundingSpec | null;
  fellowship?: FellowshipSpec | null;
  workshop?: WorkshopSpec | null;
  webinar?: WebinarSpec | null;
  article?: ArticleSpec | null;
  resource?: ResourceSpec | null;
}

export interface Gallery {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  media_items?: MediaItem[];
}

export interface AuditLog {
  id: string;
  user_id?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  details?: Record<string, unknown> | null;
  created_at: string;
  user_email?: string | null;
  user_name?: string | null;
}

export interface DeadlineInfo {
  state: 'active' | 'urgent' | 'today' | 'passed';
  remainingDays: number;
  label: string;
  badgeClass: string;
}

export interface ContentFilterParams {
  type?: ContentType;
  category?: string;
  tag?: string;
  country?: string;
  mode?: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  query?: string;
  deadline?: 'active' | 'closing-soon' | 'passed' | 'all';
  status?: ContentStatus;
  featured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'newest' | 'oldest' | 'deadline' | 'relevance';
}
