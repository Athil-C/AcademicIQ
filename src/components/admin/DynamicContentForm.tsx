"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ContentType,
  ContentStatus,
  FullContentItem,
  Category,
  Organization,
  MediaItem,
} from "@/types";
import {
  FileText,
  Megaphone,
  Calendar,
  Compass,
  Coins,
  Award,
  BookOpen,
  Video,
  Layers,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Check,
  ArrowLeft,
  CalendarDays,
  Clock,
  ExternalLink,
} from "lucide-react";
import { MediaPicker } from "@/components/media/MediaPicker";
import { TiptapEditor } from "@/components/editor/TiptapEditor";
import Image from "next/image";

interface DynamicContentFormProps {
  initialData?: FullContentItem;
  initialType?: ContentType;
}

const CONTENT_TYPES: { type: ContentType; label: string; desc: string; icon: typeof FileText }[] = [
  { type: "RESEARCH_PAPER", label: "Research Paper", desc: "Peer-reviewed paper with DOI, journal citation, and abstract.", icon: FileText },
  { type: "CFP", label: "Call for Papers", desc: "Upcoming submission deadline, conference theme, and guidelines.", icon: Megaphone },
  { type: "CONFERENCE", label: "Conference", desc: "Academic summit, location, dates, and registration portal.", icon: Calendar },
  { type: "OPPORTUNITY", label: "Opportunity", desc: "Assistantships, visiting residencies, or research collaborations.", icon: Compass },
  { type: "FUNDING", label: "Research Grant", desc: "Competitive research grants, funding limits, and regional eligibility.", icon: Coins },
  { type: "FELLOWSHIP", label: "Fellowship", desc: "Postdoctoral or senior fellowship stipends and criteria.", icon: Award },
  { type: "WORKSHOP", label: "Methods Workshop", desc: "Practical hands-on methodology or computational workshop.", icon: Layers },
  { type: "WEBINAR", label: "Academic Webinar", desc: "Live scholarly presentation, panel session, and RSVP link.", icon: Video },
  { type: "ARTICLE", label: "Scholarly Article", desc: "Long-form essay, critical review, or discussion piece.", icon: BookOpen },
  { type: "RESOURCE", label: "Research Resource", desc: "Datasets, guidebooks, citation tools, and downloadable templates.", icon: Sparkles },
];

export function DynamicContentForm({ initialData, initialType }: DynamicContentFormProps) {
  const router = useRouter();

  // Selected Type
  const [selectedType, setSelectedType] = useState<ContentType | null>(
    initialData?.content_type || initialType || null
  );

  // Common Fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDescription, setShortDescription] = useState(initialData?.short_description || "");
  const [contentHtml, setContentHtml] = useState(initialData?.content || "");
  const [status, setStatus] = useState<ContentStatus>(initialData?.status || "DRAFT");
  const [featured, setFeatured] = useState<boolean>(initialData?.featured || false);
  const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
  const [organizationId, setOrganizationId] = useState(initialData?.organization_id || "");
  const [country, setCountry] = useState(initialData?.country || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.cover_image_url || "");
  const [coverImageId, setCoverImageId] = useState(initialData?.cover_image_id || "");

  // Specialized State
  // 1. Research Paper
  const [abstract, setAbstract] = useState(initialData?.research_paper?.abstract || "");
  const [publicationDate, setPublicationDate] = useState(initialData?.research_paper?.publication_date || "");
  const [journal, setJournal] = useState(initialData?.research_paper?.journal || "");
  const [volume, setVolume] = useState(initialData?.research_paper?.volume || "");
  const [issue, setIssue] = useState(initialData?.research_paper?.issue || "");
  const [doi, setDoi] = useState(initialData?.research_paper?.doi || "");
  const [publisher, setPublisher] = useState(initialData?.research_paper?.publisher || "");
  const [paperPdfUrl, setPaperPdfUrl] = useState(initialData?.research_paper?.pdf_url || "");

  // 2. CFP
  const [cfpConfName, setCfpConfName] = useState(initialData?.cfp?.conference_name || "");
  const [cfpTheme, setCfpTheme] = useState(initialData?.cfp?.theme || "");
  const [cfpInstitution, setCfpInstitution] = useState(initialData?.cfp?.organizing_institution || "");
  const [cfpDeadline, setCfpDeadline] = useState(
    initialData?.cfp?.submission_deadline ? initialData.cfp.submission_deadline.substring(0, 10) : ""
  );
  const [cfpAbstractDeadline, setCfpAbstractDeadline] = useState(
    initialData?.cfp?.abstract_deadline ? initialData.cfp.abstract_deadline.substring(0, 10) : ""
  );
  const [cfpFullPaperDeadline, setCfpFullPaperDeadline] = useState(
    initialData?.cfp?.full_paper_deadline ? initialData.cfp.full_paper_deadline.substring(0, 10) : ""
  );
  const [cfpNotificationDate, setCfpNotificationDate] = useState(
    initialData?.cfp?.notification_date ? initialData.cfp.notification_date.substring(0, 10) : ""
  );
  const [cfpStart, setCfpStart] = useState(initialData?.cfp?.conference_start || "");
  const [cfpEnd, setCfpEnd] = useState(initialData?.cfp?.conference_end || "");
  const [cfpMode, setCfpMode] = useState<"ONLINE" | "OFFLINE" | "HYBRID">(initialData?.cfp?.mode || "HYBRID");
  const [cfpSubmissionUrl, setCfpSubmissionUrl] = useState(initialData?.cfp?.submission_url || "");
  const [cfpContactEmail, setCfpContactEmail] = useState(initialData?.cfp?.contact_email || "");
  const [cfpPdfUrl, setCfpPdfUrl] = useState(initialData?.cfp?.cfp_pdf_url || "");

  // 3. Conference
  const [confName, setConfName] = useState(initialData?.conference?.conference_name || "");
  const [confTheme, setConfTheme] = useState(initialData?.conference?.theme || "");
  const [confOrganizer, setConfOrganizer] = useState(initialData?.conference?.organizer || "");
  const [confStart, setConfStart] = useState(initialData?.conference?.start_date || "");
  const [confEnd, setConfEnd] = useState(initialData?.conference?.end_date || "");
  const [confCity, setConfCity] = useState(initialData?.conference?.city || "");
  const [confVenue, setConfVenue] = useState(initialData?.conference?.venue || "");
  const [confMode, setConfMode] = useState<"ONLINE" | "OFFLINE" | "HYBRID">(initialData?.conference?.mode || "HYBRID");
  const [confWebsite, setConfWebsite] = useState(initialData?.conference?.website || "");
  const [confRegUrl, setConfRegUrl] = useState(initialData?.conference?.registration_url || "");

  // 4. Opportunity & Fellowship & Funding
  const [oppType, setOppType] = useState(initialData?.opportunity?.opportunity_type || "Research Assistantship");
  const [oppEligibility, setOppEligibility] = useState(
    initialData?.opportunity?.eligibility || initialData?.fellowship?.eligibility || initialData?.funding?.eligibility || ""
  );
  const [oppDeadline, setOppDeadline] = useState(
    initialData?.opportunity?.deadline?.substring(0, 10) ||
      initialData?.fellowship?.deadline?.substring(0, 10) ||
      initialData?.funding?.deadline?.substring(0, 10) ||
      ""
  );
  const [oppUrl, setOppUrl] = useState(
    initialData?.opportunity?.application_url || initialData?.fellowship?.application_url || initialData?.funding?.application_url || ""
  );
  const [fundingAmount, setFundingAmount] = useState(initialData?.funding?.funding_amount || initialData?.fellowship?.funding || "");
  const [fundingProvider, setFundingProvider] = useState(initialData?.funding?.provider || initialData?.fellowship?.institution || "");

  // 5. Workshop & Webinar
  const [eventSpeaker, setEventSpeaker] = useState(initialData?.workshop?.speaker || initialData?.webinar?.speaker || "");
  const [eventDate, setEventDate] = useState(initialData?.workshop?.date || initialData?.webinar?.date || "");
  const [eventTime, setEventTime] = useState(initialData?.workshop?.time || initialData?.webinar?.time || "");
  const [eventTimezone, setEventTimezone] = useState(initialData?.workshop?.timezone || initialData?.webinar?.timezone || "UTC");
  const [eventRegUrl, setEventRegUrl] = useState(initialData?.workshop?.registration_url || initialData?.webinar?.registration_url || "");

  // 6. Resource
  const [resourceType, setResourceType] = useState(initialData?.resource?.resource_type || "Methodology Guide");
  const [resourceFormat, setResourceFormat] = useState(initialData?.resource?.file_format || "PDF");
  const [resourceSize, setResourceSize] = useState(initialData?.resource?.file_size || "1.5 MB");
  const [resourceDownloadUrl, setResourceDownloadUrl] = useState(initialData?.resource?.download_url || "");

  // Taxonomies from API
  const [categories, setCategories] = useState<Category[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loadingTaxonomy, setLoadingTaxonomy] = useState(false);
  const [saving, setSaving] = useState(false);

  // Modals for MediaPicker
  const [isCoverPickerOpen, setIsCoverPickerOpen] = useState(false);
  const [isPdfPickerOpen, setIsPdfPickerOpen] = useState(false);

  useEffect(() => {
    async function loadMeta() {
      setLoadingTaxonomy(true);
      try {
        const [catRes, orgRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/organizations"),
        ]);
        if (catRes.ok) {
          const d = await catRes.json();
          setCategories(d.categories || []);
          if (!categoryId && d.categories?.length > 0) {
            setCategoryId(d.categories[0].id);
          }
        }
        if (orgRes.ok) {
          const d = await orgRes.json();
          setOrganizations(d.organizations || []);
        }
      } catch {
        // demo fallback
      } finally {
        setLoadingTaxonomy(false);
      }
    }
    loadMeta();
  }, []);

  // Automatic Slug generation from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(generated);
    }
  };

  const handleSubmit = async (targetStatus: ContentStatus) => {
    if (!title.trim()) {
      alert("Please provide a title");
      return;
    }
    if (!slug.trim()) {
      alert("Please provide a slug");
      return;
    }

    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        title,
        slug,
        short_description: shortDescription,
        content: contentHtml,
        content_type: selectedType,
        status: targetStatus,
        featured,
        category_id: categoryId,
        organization_id: organizationId || null,
        country: country || null,
        location: location || null,
        cover_image_url: coverImageUrl || null,
        cover_image_id: coverImageId || null,
      };

      // Construct specialized specs
      if (selectedType === "RESEARCH_PAPER") {
        payload.research_paper = {
          abstract,
          publication_date: publicationDate || null,
          journal,
          volume,
          issue,
          doi,
          publisher,
          pdf_url: paperPdfUrl || null,
        };
      } else if (selectedType === "CFP") {
        payload.cfp = {
          conference_name: cfpConfName || title,
          theme: cfpTheme,
          organizing_institution: cfpInstitution,
          submission_deadline: cfpDeadline ? new Date(cfpDeadline).toISOString() : new Date().toISOString(),
          abstract_deadline: cfpAbstractDeadline ? new Date(cfpAbstractDeadline).toISOString() : null,
          full_paper_deadline: cfpFullPaperDeadline ? new Date(cfpFullPaperDeadline).toISOString() : null,
          notification_date: cfpNotificationDate ? new Date(cfpNotificationDate).toISOString() : null,
          conference_start: cfpStart || null,
          conference_end: cfpEnd || null,
          mode: cfpMode,
          submission_url: cfpSubmissionUrl,
          contact_email: cfpContactEmail,
          cfp_pdf_url: cfpPdfUrl,
        };
      } else if (selectedType === "CONFERENCE") {
        payload.conference = {
          conference_name: confName || title,
          theme: confTheme,
          organizer: confOrganizer,
          start_date: confStart || new Date().toISOString().substring(0, 10),
          end_date: confEnd || null,
          city: confCity,
          venue: confVenue,
          mode: confMode,
          website: confWebsite,
          registration_url: confRegUrl,
        };
      } else if (selectedType === "OPPORTUNITY") {
        payload.opportunity = {
          opportunity_type: oppType,
          eligibility: oppEligibility,
          deadline: oppDeadline ? new Date(oppDeadline).toISOString() : null,
          application_url: oppUrl,
        };
      } else if (selectedType === "FUNDING") {
        payload.funding = {
          provider: fundingProvider,
          eligibility: oppEligibility,
          funding_amount: fundingAmount,
          deadline: oppDeadline ? new Date(oppDeadline).toISOString() : null,
          application_url: oppUrl,
        };
      } else if (selectedType === "FELLOWSHIP") {
        payload.fellowship = {
          institution: fundingProvider,
          eligibility: oppEligibility,
          funding: fundingAmount,
          deadline: oppDeadline ? new Date(oppDeadline).toISOString() : null,
          application_url: oppUrl,
        };
      } else if (selectedType === "WORKSHOP") {
        payload.workshop = {
          speaker: eventSpeaker,
          date: eventDate || new Date().toISOString().substring(0, 10),
          time: eventTime,
          timezone: eventTimezone,
          registration_url: eventRegUrl,
        };
      } else if (selectedType === "WEBINAR") {
        payload.webinar = {
          speaker: eventSpeaker,
          date: eventDate || new Date().toISOString().substring(0, 10),
          time: eventTime,
          timezone: eventTimezone,
          registration_url: eventRegUrl,
        };
      } else if (selectedType === "RESOURCE") {
        payload.resource = {
          resource_type: resourceType,
          file_format: resourceFormat,
          file_size: resourceSize,
          download_url: resourceDownloadUrl,
        };
      }

      const method = initialData ? "PUT" : "POST";
      const endpoint = initialData ? `/api/content/${initialData.id}` : "/api/content";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/content");
        router.refresh();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to save content item.");
      }
    } catch {
      alert("Error submitting content form.");
    } finally {
      setSaving(false);
    }
  };

  // STEP 1: Type Selection Screen if creating new
  if (!selectedType) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif">What do you want to publish?</h2>
          <p className="text-sm text-slate-600 mt-1">
            Choose the scholarly content format to load its specialized academic metadata fields.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTENT_TYPES.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                onClick={() => setSelectedType(item.type)}
                className="text-left p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:ring-2 hover:ring-blue-500/20 hover:shadow-md transition group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 font-serif">
                    {item.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700">
                  <span>Create {item.label}</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // STEP 2: Dedicated Form
  const activeTypeMeta = CONTENT_TYPES.find((c) => c.type === selectedType);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          {!initialData && (
            <button
              onClick={() => setSelectedType(null)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
              title="Change content type"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {activeTypeMeta?.label}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 font-serif mt-1">
              {initialData ? `Edit: ${initialData.title}` : `New ${activeTypeMeta?.label}`}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit("DRAFT")}
            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit("REVIEW")}
            className="px-4 py-2 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold transition"
          >
            Submit for Review
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit("PUBLISHED")}
            className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition"
          >
            {saving ? "Saving..." : "Publish to AcademIQ"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Call for Papers: 18th International Conference on..."
              className="w-full text-base font-medium px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              URL Slug <span className="text-rose-500">*</span>
            </label>
            <div className="flex rounded-lg border border-slate-300 overflow-hidden focus-within:border-blue-600">
              <span className="bg-slate-50 px-3 py-2 text-xs text-slate-500 border-r border-slate-200 select-none">
                /content/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 text-xs focus:outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Short Summary / Executive Teaser
            </label>
            <textarea
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief 1-2 sentence overview for cards and meta descriptions..."
              className="w-full text-xs px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-blue-600"
            />
          </div>

          {/* Specialized Fields By Type */}
          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/20 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-700" />
              Specialized {activeTypeMeta?.label} Metadata
            </h3>

            {/* A. CFP FORM */}
            {selectedType === "CFP" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Conference Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cfpConfName}
                      onChange={(e) => setCfpConfName(e.target.value)}
                      placeholder="e.g. World Congress of Political Science"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Organizing Institution
                    </label>
                    <input
                      type="text"
                      value={cfpInstitution}
                      onChange={(e) => setCfpInstitution(e.target.value)}
                      placeholder="e.g. European Consortium for Political Research"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Conference Theme
                  </label>
                  <input
                    type="text"
                    value={cfpTheme}
                    onChange={(e) => setCfpTheme(e.target.value)}
                    placeholder="e.g. Institutional Resilience in Polarized Societies"
                    className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-rose-800 block mb-1">
                      Submission Deadline <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={cfpDeadline}
                      onChange={(e) => setCfpDeadline(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-md border border-rose-300 bg-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Abstract Deadline
                    </label>
                    <input
                      type="date"
                      value={cfpAbstractDeadline}
                      onChange={(e) => setCfpAbstractDeadline(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Mode
                    </label>
                    <select
                      value={cfpMode}
                      onChange={(e) => setCfpMode(e.target.value as "ONLINE" | "OFFLINE" | "HYBRID")}
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    >
                      <option value="HYBRID">Hybrid (In-Person & Online)</option>
                      <option value="ONLINE">Online Only</option>
                      <option value="OFFLINE">In-Person Only</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Online Submission URL
                    </label>
                    <input
                      type="url"
                      value={cfpSubmissionUrl}
                      onChange={(e) => setCfpSubmissionUrl(e.target.value)}
                      placeholder="https://conference-portal.org/submit"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Editorial Contact Email
                    </label>
                    <input
                      type="email"
                      value={cfpContactEmail}
                      onChange={(e) => setCfpContactEmail(e.target.value)}
                      placeholder="cfp@institution.org"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Attached CFP PDF Document
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={cfpPdfUrl}
                      placeholder="No CFP PDF selected"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-slate-50"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPdfPickerOpen(true)}
                      className="px-3 py-2 bg-slate-800 text-white rounded-md text-xs font-medium hover:bg-slate-900 shrink-0"
                    >
                      Select PDF
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* B. RESEARCH PAPER FORM */}
            {selectedType === "RESEARCH_PAPER" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Structured Abstract <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Enter scholarly abstract..."
                    className="w-full text-xs px-3.5 py-2 rounded-md border border-slate-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Journal Name
                    </label>
                    <input
                      type="text"
                      value={journal}
                      onChange={(e) => setJournal(e.target.value)}
                      placeholder="e.g. Journal of Digital Politics"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      DOI Identifier
                    </label>
                    <input
                      type="text"
                      value={doi}
                      onChange={(e) => setDoi(e.target.value)}
                      placeholder="10.1080/example.2026.0418"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Publication Date
                    </label>
                    <input
                      type="date"
                      value={publicationDate}
                      onChange={(e) => setPublicationDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Paper PDF Document
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={paperPdfUrl}
                      placeholder="No PDF selected"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-slate-50"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPdfPickerOpen(true)}
                      className="px-3 py-2 bg-slate-800 text-white rounded-md text-xs font-medium hover:bg-slate-900 shrink-0"
                    >
                      Attach PDF
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* C. CONFERENCE */}
            {selectedType === "CONFERENCE" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Start Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={confStart}
                      onChange={(e) => setConfStart(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={confEnd}
                      onChange={(e) => setConfEnd(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">City</label>
                    <input
                      type="text"
                      value={confCity}
                      onChange={(e) => setConfCity(e.target.value)}
                      placeholder="e.g. Geneva"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Venue</label>
                    <input
                      type="text"
                      value={confVenue}
                      onChange={(e) => setConfVenue(e.target.value)}
                      placeholder="Convention Hall"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Mode</label>
                    <select
                      value={confMode}
                      onChange={(e) => setConfMode(e.target.value as "ONLINE" | "OFFLINE" | "HYBRID")}
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    >
                      <option value="HYBRID">Hybrid</option>
                      <option value="ONLINE">Online</option>
                      <option value="OFFLINE">In-Person</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Official Conference Website
                    </label>
                    <input
                      type="url"
                      value={confWebsite}
                      onChange={(e) => setConfWebsite(e.target.value)}
                      placeholder="https://conference.example.org"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Registration Portal URL
                    </label>
                    <input
                      type="url"
                      value={confRegUrl}
                      onChange={(e) => setConfRegUrl(e.target.value)}
                      placeholder="https://conference.example.org/register"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* D. FUNDING & OPPORTUNITY */}
            {(selectedType === "FUNDING" || selectedType === "FELLOWSHIP" || selectedType === "OPPORTUNITY") && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Provider / Funding Body
                    </label>
                    <input
                      type="text"
                      value={fundingProvider}
                      onChange={(e) => setFundingProvider(e.target.value)}
                      placeholder="e.g. Global Social Science Research Fund"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Grant / Fellowship Value
                    </label>
                    <input
                      type="text"
                      value={fundingAmount}
                      onChange={(e) => setFundingAmount(e.target.value)}
                      placeholder="e.g. €50,000 – €120,000"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-rose-800 block mb-1">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      value={oppDeadline}
                      onChange={(e) => setOppDeadline(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-md border border-rose-300 bg-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Online Application Link
                    </label>
                    <input
                      type="url"
                      value={oppUrl}
                      onChange={(e) => setOppUrl(e.target.value)}
                      placeholder="https://grant-portal.org/apply"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Eligibility Criteria
                  </label>
                  <textarea
                    rows={3}
                    value={oppEligibility}
                    onChange={(e) => setOppEligibility(e.target.value)}
                    placeholder="Doctoral scholars, accredited university researchers, or research groups..."
                    className="w-full text-xs px-3.5 py-2 rounded-md border border-slate-300 bg-white"
                  />
                </div>
              </div>
            )}

            {/* E. WORKSHOPS & WEBINARS */}
            {(selectedType === "WORKSHOP" || selectedType === "WEBINAR") && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Featured Speaker(s)
                    </label>
                    <input
                      type="text"
                      value={eventSpeaker}
                      onChange={(e) => setEventSpeaker(e.target.value)}
                      placeholder="e.g. Prof. Elena Rostova & Dr. Marcus Sterling"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Event Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Time & Timezone</label>
                    <input
                      type="text"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      placeholder="14:00 - 16:30 CET"
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      RSVP / Registration Link
                    </label>
                    <input
                      type="url"
                      value={eventRegUrl}
                      onChange={(e) => setEventRegUrl(e.target.value)}
                      placeholder="https://zoom.us/webinar/register/..."
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* F. RESOURCE */}
            {selectedType === "RESOURCE" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Resource Type</label>
                  <input
                    type="text"
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    placeholder="Methodology Guidebook"
                    className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Format</label>
                  <input
                    type="text"
                    value={resourceFormat}
                    onChange={(e) => setResourceFormat(e.target.value)}
                    placeholder="PDF / Stata / CSV"
                    className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Download URL</label>
                  <input
                    type="url"
                    value={resourceDownloadUrl}
                    onChange={(e) => setResourceDownloadUrl(e.target.value)}
                    placeholder="https://example.org/download.pdf"
                    className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Full Content (Tiptap Rich Text Editor) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Detailed Content / Body (Tiptap Editor)
            </label>
            <TiptapEditor
              content={contentHtml}
              onChange={setContentHtml}
              placeholder="Write the full scholarly article, conference program, or call guidelines..."
            />
          </div>
        </div>

        {/* Sidebar Controls (1 col) */}
        <div className="space-y-6">
          {/* Status & Publishing Workflow */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Publishing Workflow
            </h3>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Current State</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContentStatus)}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white font-medium"
              >
                <option value="DRAFT">Draft (Internal Only)</option>
                <option value="REVIEW">Review (Pending Editorial Approval)</option>
                <option value="PUBLISHED">Published (Public Network)</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured-toggle"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <label htmlFor="featured-toggle" className="text-xs text-slate-800 font-medium">
                Feature on Homepage & Spotlight
              </label>
            </div>
          </div>

          {/* Taxonomies: Discipline Category & Org */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Academic Taxonomy
            </h3>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Discipline / Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Institutional Affiliation / Organization
              </label>
              <select
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white"
              >
                <option value="">None / Independent Scholar</option>
                {organizations.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} ({o.country || "Global"})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Germany"
                  className="w-full text-xs px-2.5 py-1.5 rounded-md border border-slate-300"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">City / Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Berlin"
                  className="w-full text-xs px-2.5 py-1.5 rounded-md border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Cover Media Picker */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Cover Image / Poster
            </h3>

            {coverImageUrl ? (
              <div className="space-y-2">
                <div className="aspect-video relative rounded-lg overflow-hidden border border-slate-200">
                  <Image
                    src={coverImageUrl}
                    alt="Cover image"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsCoverPickerOpen(true)}
                    className="text-xs text-blue-700 font-semibold hover:underline"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImageUrl("");
                      setCoverImageId("");
                    }}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsCoverPickerOpen(true)}
                className="aspect-video border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg flex flex-col items-center justify-center p-4 text-center cursor-pointer transition bg-slate-50/50"
              >
                <ImageIcon className="w-8 h-8 text-slate-400 mb-1" />
                <span className="text-xs font-medium text-slate-700">Select Cover Image</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Media Library or Upload</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image Picker Modal */}
      <MediaPicker
        isOpen={isCoverPickerOpen}
        onClose={() => setIsCoverPickerOpen(false)}
        filterType="image"
        title="Select Cover Image"
        onSelect={(media) => {
          if (media.public_url) {
            setCoverImageUrl(media.public_url);
            setCoverImageId(media.id);
          }
        }}
      />

      {/* PDF Picker Modal */}
      <MediaPicker
        isOpen={isPdfPickerOpen}
        onClose={() => setIsPdfPickerOpen(false)}
        filterType="document"
        title="Select Academic Document (PDF)"
        onSelect={(media) => {
          if (media.public_url) {
            if (selectedType === "RESEARCH_PAPER") {
              setPaperPdfUrl(media.public_url);
            } else if (selectedType === "CFP") {
              setCfpPdfUrl(media.public_url);
            }
          }
        }}
      />
    </div>
  );
}
