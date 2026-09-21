import { z } from "zod";

export const ContentTypeEnum = z.enum([
  "RESEARCH_PAPER",
  "CFP",
  "CONFERENCE",
  "OPPORTUNITY",
  "FUNDING",
  "FELLOWSHIP",
  "WORKSHOP",
  "WEBINAR",
  "ARTICLE",
  "RESOURCE",
]);

export const ContentStatusEnum = z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]);

export const ModeEnum = z.enum(["ONLINE", "OFFLINE", "HYBRID"]);

export const BaseContentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(300, "Title is too long"),
  slug: z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens"),
  short_description: z.string().max(600).optional().nullable(),
  content: z.string().optional().nullable(),
  content_type: ContentTypeEnum,
  status: ContentStatusEnum.default("DRAFT"),
  featured: z.boolean().default(false),
  category_id: z.string().min(1, "Please select an academic discipline"),
  organization_id: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  cover_image_url: z.string().optional().nullable(),
});

export const ResearchPaperFormSchema = BaseContentSchema.extend({
  abstract: z.string().min(10, "Abstract must be at least 10 characters"),
  publication_date: z.string().optional().nullable(),
  journal: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  issue: z.string().optional().nullable(),
  doi: z.string().optional().nullable(),
  publisher: z.string().optional().nullable(),
  pdf_url: z.string().optional().nullable(),
});

export const CFPFormSchema = BaseContentSchema.extend({
  conference_name: z.string().min(3, "Conference name is required"),
  theme: z.string().optional().nullable(),
  organizing_institution: z.string().optional().nullable(),
  submission_deadline: z.string().min(1, "Submission deadline is mandatory"),
  abstract_deadline: z.string().optional().nullable(),
  full_paper_deadline: z.string().optional().nullable(),
  notification_date: z.string().optional().nullable(),
  conference_start: z.string().optional().nullable(),
  conference_end: z.string().optional().nullable(),
  mode: ModeEnum.default("HYBRID"),
  submission_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  contact_email: z.string().email("Must be a valid email").optional().or(z.literal("")),
});

export const ConferenceFormSchema = BaseContentSchema.extend({
  conference_name: z.string().min(3, "Conference name is required"),
  theme: z.string().optional().nullable(),
  organizer: z.string().optional().nullable(),
  start_date: z.string().min(1, "Conference start date is required"),
  end_date: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  venue: z.string().optional().nullable(),
  mode: ModeEnum.default("HYBRID"),
  website: z.string().url().optional().or(z.literal("")),
  registration_url: z.string().url().optional().or(z.literal("")),
});

export const OpportunityFormSchema = BaseContentSchema.extend({
  opportunity_type: z.string().min(2, "Opportunity type is required"),
  eligibility: z.string().optional().nullable(),
  deadline: z.string().optional().nullable(),
  research_area: z.string().optional().nullable(),
  application_url: z.string().url().optional().or(z.literal("")),
});

export const FundingFormSchema = BaseContentSchema.extend({
  provider: z.string().min(2, "Provider name is required"),
  eligibility: z.string().optional().nullable(),
  funding_amount: z.string().optional().nullable(),
  deadline: z.string().optional().nullable(),
  application_url: z.string().url().optional().or(z.literal("")),
  official_website: z.string().url().optional().or(z.literal("")),
});

export const FellowshipFormSchema = BaseContentSchema.extend({
  institution: z.string().min(2, "Institution is required"),
  eligibility: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  funding: z.string().optional().nullable(),
  deadline: z.string().optional().nullable(),
  application_url: z.string().url().optional().or(z.literal("")),
});

export const WorkshopFormSchema = BaseContentSchema.extend({
  organizer: z.string().optional().nullable(),
  speaker: z.string().optional().nullable(),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional().nullable(),
  mode: ModeEnum.default("ONLINE"),
  registration_url: z.string().url().optional().or(z.literal("")),
});

export const ArticleFormSchema = BaseContentSchema.extend({
  excerpt: z.string().optional().nullable(),
  reading_time: z.number().int().min(1).default(5),
});

export const ResourceFormSchema = BaseContentSchema.extend({
  resource_type: z.string().min(2, "Resource type is required"),
  author_org: z.string().optional().nullable(),
  file_format: z.string().optional().nullable(),
  file_size: z.string().optional().nullable(),
  download_url: z.string().url().optional().or(z.literal("")),
});
