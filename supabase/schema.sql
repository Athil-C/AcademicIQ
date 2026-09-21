-- ==============================================================================
-- AcademIQ — Research & CFP Network
-- Complete Normalized PostgreSQL Schema with RLS, Triggers, & Storage
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ------------------------------------------------------------------------------
-- 1. PROFILES & ROLES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('ADMIN', 'EDITOR', 'USER')) DEFAULT 'USER',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data->>'role', 'USER')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Helper function to check if current user is admin/editor
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'ADMIN'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_editor_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('ADMIN', 'EDITOR')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- 2. TAXONOMY: CATEGORIES & TAGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. MEDIA ASSETS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL UNIQUE,
    bucket TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    caption TEXT,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. ORGANIZATIONS & AUTHORS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    website TEXT,
    country TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    affiliation TEXT,
    avatar_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    orcid TEXT,
    email TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ------------------------------------------------------------------------------
-- 5. CENTRAL CONTENT SYSTEM
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    content TEXT, -- Central rich text article / overview
    content_type TEXT NOT NULL CHECK (
        content_type IN (
            'RESEARCH_PAPER',
            'CFP',
            'CONFERENCE',
            'OPPORTUNITY',
            'FUNDING',
            'FELLOWSHIP',
            'WORKSHOP',
            'WEBINAR',
            'ARTICLE',
            'RESOURCE'
        )
    ),
    status TEXT NOT NULL CHECK (
        status IN ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED')
    ) DEFAULT 'DRAFT',
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    cover_image_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    country TEXT,
    location TEXT,
    external_url TEXT,
    published_at TIMESTAMPTZ,
    scheduled_at TIMESTAMPTZ,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for lightning fast querying
CREATE INDEX IF NOT EXISTS idx_content_slug ON public.content(slug);
CREATE INDEX IF NOT EXISTS idx_content_type ON public.content(content_type);
CREATE INDEX IF NOT EXISTS idx_content_status ON public.content(status);
CREATE INDEX IF NOT EXISTS idx_content_published_at ON public.content(published_at);
CREATE INDEX IF NOT EXISTS idx_content_scheduled_at ON public.content(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_content_category ON public.content(category_id);
CREATE INDEX IF NOT EXISTS idx_content_organization ON public.content(organization_id);
CREATE INDEX IF NOT EXISTS idx_content_title_trgm ON public.content USING gin(title gin_trgm_ops);

-- Junction: Content Authors
CREATE TABLE IF NOT EXISTS public.content_authors (
    content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.authors(id) ON DELETE CASCADE,
    author_order INTEGER DEFAULT 1 NOT NULL,
    PRIMARY KEY (content_id, author_id)
);

-- Junction: Content Tags
CREATE TABLE IF NOT EXISTS public.content_tags (
    content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, tag_id)
);

-- ------------------------------------------------------------------------------
-- 6. SPECIALIZED DETAIL TABLES
-- ------------------------------------------------------------------------------

-- Research Papers
CREATE TABLE IF NOT EXISTS public.research_papers (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    abstract TEXT,
    publication_date DATE,
    journal TEXT,
    volume TEXT,
    issue TEXT,
    doi TEXT,
    publisher TEXT,
    pdf_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL
);

-- Calls for Papers (CFP)
CREATE TABLE IF NOT EXISTS public.cfps (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    conference_name TEXT NOT NULL,
    theme TEXT,
    organizing_institution TEXT,
    submission_deadline TIMESTAMPTZ NOT NULL,
    abstract_deadline TIMESTAMPTZ,
    full_paper_deadline TIMESTAMPTZ,
    notification_date TIMESTAMPTZ,
    conference_start DATE,
    conference_end DATE,
    mode TEXT NOT NULL CHECK (mode IN ('ONLINE', 'OFFLINE', 'HYBRID')) DEFAULT 'HYBRID',
    submission_url TEXT,
    cfp_pdf_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    contact_email TEXT
);
CREATE INDEX IF NOT EXISTS idx_cfps_deadline ON public.cfps(submission_deadline);

-- Conferences
CREATE TABLE IF NOT EXISTS public.conferences (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    conference_name TEXT NOT NULL,
    theme TEXT,
    organizer TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    submission_deadline TIMESTAMPTZ,
    registration_deadline TIMESTAMPTZ,
    country TEXT,
    city TEXT,
    venue TEXT,
    mode TEXT NOT NULL CHECK (mode IN ('ONLINE', 'OFFLINE', 'HYBRID')) DEFAULT 'HYBRID',
    website TEXT,
    registration_url TEXT,
    cfp_url TEXT,
    contact TEXT
);
CREATE INDEX IF NOT EXISTS idx_conferences_start ON public.conferences(start_date);

-- Research Opportunities
CREATE TABLE IF NOT EXISTS public.opportunities (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    opportunity_type TEXT NOT NULL, -- Assistantship, Visiting Scholar, Postdoc, Project Collab
    eligibility TEXT,
    location TEXT,
    deadline TIMESTAMPTZ,
    research_area TEXT,
    application_url TEXT
);

-- Funding & Grants
CREATE TABLE IF NOT EXISTS public.funding (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    provider TEXT,
    eligibility TEXT,
    funding_amount TEXT,
    deadline TIMESTAMPTZ,
    eligible_countries TEXT[],
    research_areas TEXT[],
    application_url TEXT,
    official_website TEXT,
    document_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL
);

-- Fellowships
CREATE TABLE IF NOT EXISTS public.fellowships (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    institution TEXT,
    eligibility TEXT,
    duration TEXT,
    funding TEXT,
    deadline TIMESTAMPTZ,
    location TEXT,
    eligible_countries TEXT[],
    application_url TEXT,
    official_website TEXT
);

-- Workshops
CREATE TABLE IF NOT EXISTS public.workshops (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    organizer TEXT,
    speaker TEXT,
    date DATE NOT NULL,
    time TEXT,
    timezone TEXT DEFAULT 'UTC',
    mode TEXT NOT NULL CHECK (mode IN ('ONLINE', 'OFFLINE', 'HYBRID')) DEFAULT 'ONLINE',
    registration_url TEXT,
    meeting_url TEXT
);

-- Webinars
CREATE TABLE IF NOT EXISTS public.webinars (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    organizer TEXT,
    speaker TEXT,
    date DATE NOT NULL,
    time TEXT,
    timezone TEXT DEFAULT 'UTC',
    registration_url TEXT,
    meeting_url TEXT
);

-- Articles
CREATE TABLE IF NOT EXISTS public.articles (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    excerpt TEXT,
    reading_time INTEGER DEFAULT 5
);

-- Research Resources
CREATE TABLE IF NOT EXISTS public.resources (
    content_id UUID PRIMARY KEY REFERENCES public.content(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL, -- Methodology, Dataset, Guide, Citation Guide, Toolkit
    author_org TEXT,
    download_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    file_format TEXT,
    file_size TEXT
);

-- ------------------------------------------------------------------------------
-- 7. GALLERIES & MEDIA JUNCTIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.galleries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.gallery_media (
    gallery_id UUID REFERENCES public.galleries(id) ON DELETE CASCADE,
    media_id UUID REFERENCES public.media(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 1 NOT NULL,
    PRIMARY KEY (gallery_id, media_id)
);

-- ------------------------------------------------------------------------------
-- 8. NEWSLETTER SUBSCRIBERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'UNSUBSCRIBED')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ------------------------------------------------------------------------------
-- 9. AUDIT LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ------------------------------------------------------------------------------
-- 10. ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cfps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fellowships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are readable by everyone"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles"
    ON public.profiles FOR ALL USING (public.is_admin());

-- PUBLIC CONTENT POLICIES
-- Content is visible to the public ONLY if status is 'PUBLISHED' and scheduled_at is null or passed
CREATE POLICY "Public read published content"
    ON public.content FOR SELECT
    USING (
        status = 'PUBLISHED'
        AND (scheduled_at IS NULL OR scheduled_at <= NOW())
    );

CREATE POLICY "Admins and editors can see and manage all content"
    ON public.content FOR ALL
    USING (public.is_editor_or_admin());

-- TAXONOMY POLICIES
CREATE POLICY "Categories readable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Categories editable by admin" ON public.categories FOR ALL USING (public.is_admin());

CREATE POLICY "Tags readable by everyone" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Tags editable by editor or admin" ON public.tags FOR ALL USING (public.is_editor_or_admin());

-- ORGANIZATIONS & AUTHORS
CREATE POLICY "Organizations readable by everyone" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Organizations editable by editor or admin" ON public.organizations FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Authors readable by everyone" ON public.authors FOR SELECT USING (true);
CREATE POLICY "Authors editable by editor or admin" ON public.authors FOR ALL USING (public.is_editor_or_admin());

-- SPECIALIZED DETAIL TABLES (inherit access from content or published read)
CREATE POLICY "Public read research papers" ON public.research_papers FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage research papers" ON public.research_papers FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read cfps" ON public.cfps FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage cfps" ON public.cfps FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read conferences" ON public.conferences FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage conferences" ON public.conferences FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read opportunities" ON public.opportunities FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage opportunities" ON public.opportunities FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read funding" ON public.funding FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage funding" ON public.funding FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read fellowships" ON public.fellowships FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage fellowships" ON public.fellowships FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read workshops" ON public.workshops FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage workshops" ON public.workshops FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read webinars" ON public.webinars FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage webinars" ON public.webinars FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage articles" ON public.articles FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read resources" ON public.resources FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Staff manage resources" ON public.resources FOR ALL USING (public.is_editor_or_admin());

-- JUNCTIONS
CREATE POLICY "Public read content_authors" ON public.content_authors FOR SELECT USING (true);
CREATE POLICY "Staff manage content_authors" ON public.content_authors FOR ALL USING (public.is_editor_or_admin());

CREATE POLICY "Public read content_tags" ON public.content_tags FOR SELECT USING (true);
CREATE POLICY "Staff manage content_tags" ON public.content_tags FOR ALL USING (public.is_editor_or_admin());

-- MEDIA
CREATE POLICY "Media readable by everyone" ON public.media FOR SELECT USING (true);
CREATE POLICY "Staff manage media" ON public.media FOR ALL USING (public.is_editor_or_admin());

-- GALLERIES
CREATE POLICY "Galleries readable by everyone" ON public.galleries FOR SELECT USING (true);
CREATE POLICY "Staff manage galleries" ON public.galleries FOR ALL USING (public.is_editor_or_admin());
CREATE POLICY "Gallery media readable by everyone" ON public.gallery_media FOR SELECT USING (true);
CREATE POLICY "Staff manage gallery media" ON public.gallery_media FOR ALL USING (public.is_editor_or_admin());

-- NEWSLETTER
CREATE POLICY "Public can insert newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can view newsletter" ON public.newsletter_subscribers FOR SELECT USING (public.is_editor_or_admin());
CREATE POLICY "Admin can manage newsletter" ON public.newsletter_subscribers FOR ALL USING (public.is_admin());

-- AUDIT LOGS
CREATE POLICY "Only staff can view audit logs" ON public.audit_logs FOR SELECT USING (public.is_editor_or_admin());
CREATE POLICY "System and staff can insert audit logs" ON public.audit_logs FOR INSERT WITH CHECK (public.is_editor_or_admin());

-- ------------------------------------------------------------------------------
-- 11. SUPABASE STORAGE BUCKETS SETUP
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('academiq-images', 'academiq-images', true),
    ('academiq-pdfs', 'academiq-pdfs', true),
    ('academiq-documents', 'academiq-documents', true),
    ('academiq-media', 'academiq-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: Anyone can download/view, Staff can upload/delete
CREATE POLICY "Public can view academiq storage files"
    ON storage.objects FOR SELECT
    USING (bucket_id IN ('academiq-images', 'academiq-pdfs', 'academiq-documents', 'academiq-media'));

CREATE POLICY "Staff can upload to academiq storage"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id IN ('academiq-images', 'academiq-pdfs', 'academiq-documents', 'academiq-media')
        AND (auth.role() = 'authenticated')
    );

CREATE POLICY "Staff can update/delete academiq storage"
    ON storage.objects FOR ALL
    USING (
        bucket_id IN ('academiq-images', 'academiq-pdfs', 'academiq-documents', 'academiq-media')
        AND (auth.role() = 'authenticated')
    );
