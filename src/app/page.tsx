import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getContentRepository } from "@/lib/data";
import { calculateDeadline, formatAcademicDate } from "@/lib/utils/deadline";
import { getContentPath } from "@/lib/utils/routes";
import { FullContentItem } from "@/types";
import {
  Search,
  ArrowRight,
  BookOpen,
  Megaphone,
  Calendar,
  Compass,
  Coins,
  Award,
  Video,
  Layers,
  Sparkles,
  FileText,
  Clock,
  MapPin,
  Globe,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export default async function HomePage() {
  const repository = getContentRepository();

  // Fetch diverse content for discovery gateway
  const [
    papersRes,
    cfpsRes,
    conferencesRes,
    opportunitiesRes,
    fundingRes,
    workshopsRes,
    articlesRes,
  ] = await Promise.all([
    repository.getContentList({ type: "RESEARCH_PAPER", limit: 6, status: "PUBLISHED" }),
    repository.getContentList({ type: "CFP", limit: 6, status: "PUBLISHED" }),
    repository.getContentList({ type: "CONFERENCE", limit: 4, status: "PUBLISHED" }),
    repository.getContentList({ type: "OPPORTUNITY", limit: 4, status: "PUBLISHED" }),
    repository.getContentList({ type: "FUNDING", limit: 4, status: "PUBLISHED" }),
    repository.getContentList({ type: "WORKSHOP", limit: 2, status: "PUBLISHED" }),
    repository.getContentList({ type: "ARTICLE", limit: 4, status: "PUBLISHED" }),
  ]);

  const papers = papersRes.items;
  const cfps = cfpsRes.items;
  const conferences = conferencesRes.items;
  const opportunities = opportunitiesRes.items;
  const funding = fundingRes.items;
  const workshops = workshopsRes.items;
  const articles = articlesRes.items;

  // 1. Unified Feed for "Latest Academic Updates" (interleaving key items)
  const unifiedFeed: FullContentItem[] = [
    ...papers.slice(0, 2),
    ...cfps.slice(0, 2),
    ...funding.slice(0, 1),
    ...conferences.slice(0, 1),
    ...opportunities.slice(0, 1),
    ...articles.slice(0, 1),
  ].sort(
    (a, b) =>
      new Date(b.published_at || b.created_at).getTime() -
      new Date(a.published_at || a.created_at).getTime()
  ).slice(0, 6);

  // 2. Closing Soon - automatically aggregated deadline-driven items
  interface DeadlineItem {
    item: FullContentItem;
    deadlineDate: string;
    remainingDays: number;
    badgeLabel: string;
    badgeClass: string;
  }

  const deadlineItems: DeadlineItem[] = [];

  // Extract CFPs
  for (const cfp of cfps) {
    const d = cfp.cfp?.submission_deadline;
    if (d) {
      const calc = calculateDeadline(d);
      if (calc.remainingDays >= 0 && calc.remainingDays <= 60) {
        deadlineItems.push({
          item: cfp,
          deadlineDate: d,
          remainingDays: calc.remainingDays,
          badgeLabel: calc.label,
          badgeClass: calc.badgeClass,
        });
      }
    }
  }

  // Extract Funding
  for (const f of funding) {
    const d = f.funding?.deadline;
    if (d) {
      const calc = calculateDeadline(d);
      if (calc.remainingDays >= 0 && calc.remainingDays <= 90) {
        deadlineItems.push({
          item: f,
          deadlineDate: d,
          remainingDays: calc.remainingDays,
          badgeLabel: calc.label,
          badgeClass: calc.badgeClass,
        });
      }
    }
  }

  // Extract Opportunities & Fellowships
  for (const opp of opportunities) {
    const d = opp.opportunity?.deadline || opp.fellowship?.deadline;
    if (d) {
      const calc = calculateDeadline(d);
      if (calc.remainingDays >= 0 && calc.remainingDays <= 90) {
        deadlineItems.push({
          item: opp,
          deadlineDate: d,
          remainingDays: calc.remainingDays,
          badgeLabel: calc.label,
          badgeClass: calc.badgeClass,
        });
      }
    }
  }

  // Sort by closest deadline first
  deadlineItems.sort((a, b) => a.remainingDays - b.remainingDays);
  const closingSoon = deadlineItems.slice(0, 4);

  // 3. SSRF Spotlight Items
  const ssrfArticle = articles.find((a) => a.tags?.some((t) => t.slug.includes("ssrf"))) || articles[0];
  const ssrfPaper = papers.find((p) => p.tags?.some((t) => t.slug.includes("ssrf"))) || papers[0];
  const ssrfCFP = cfps.find((c) => c.tags?.some((t) => t.slug.includes("ssrf"))) || cfps[0];
  const ssrfEvent = conferences.find((c) => c.tags?.some((t) => t.slug.includes("ssrf"))) || conferences[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* ================================================================= */}
        {/* 1. HERO SECTION (EDITORIAL ASYMMETRIC DISCOVERY GATEWAY) */}
        {/* ================================================================= */}
        <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/40 border-b border-slate-200 overflow-hidden">
          {/* Subtle Ambient Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column (Span 7): Announcement, Editorial Headline, Multi-scope Search, Trending, Metrics */}
              <div className="lg:col-span-7 space-y-6">
                {/* Live Announcement Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-medium text-slate-800 shadow-2xs">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  <span className="font-semibold text-slate-900">SSRF & AcademIQ 2026 Academic Network</span>
                  <span className="text-slate-300">•</span>
                  <Link href="/communities/ssrf" className="text-blue-700 hover:text-blue-800 hover:underline flex items-center gap-1 font-semibold">
                    <span>Explore Hub</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Editorial Headline */}
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 font-serif tracking-tight leading-[1.12]">
                    Discover Research. <br className="hidden sm:inline" />
                    Find Opportunities. <br className="hidden sm:inline" />
                    <span className="text-blue-700 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 bg-clip-text text-transparent">
                      Connect with Academia.
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                    AcademIQ brings peer-reviewed research papers, active calls for papers, international
                    conferences, fellowships, and academic grants together in one structured network.
                  </p>
                </div>

                {/* Enhanced Multi-Scope Search Bar */}
                <div className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200">
                  <form action="/search" method="GET" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    {/* Category Scope Selector */}
                    <div className="relative shrink-0">
                      <select
                        name="type"
                        aria-label="Search scope"
                        className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                      >
                        <option value="">All Categories</option>
                        <option value="RESEARCH_PAPER">Research Papers</option>
                        <option value="CFP">Calls for Papers</option>
                        <option value="CONFERENCE">Conferences</option>
                        <option value="FUNDING">Grants & Funding</option>
                        <option value="FELLOWSHIP">Fellowships</option>
                        <option value="WORKSHOP">Workshops</option>
                      </select>
                    </div>

                    {/* Search Input */}
                    <div className="relative flex-1 flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        name="q"
                        placeholder="Search papers, CFPs, conferences, funding..."
                        className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                      />
                    </div>

                    {/* Submit Action */}
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-slate-950 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm shrink-0"
                    >
                      <span>Search</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* Trending Academic Keywords */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">Trending:</span>
                  {[
                    { label: "Digital Governance", href: "/search?q=governance" },
                    { label: "AI & Society", href: "/search?q=AI" },
                    { label: "Climate Policy", href: "/search?q=climate" },
                    { label: "Econometrics", href: "/search?q=econometrics" },
                    { label: "Horizon Europe", href: "/funding?q=horizon" },
                  ].map((tag) => (
                    <Link
                      key={tag.label}
                      href={tag.href}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 border border-slate-200/90 hover:border-blue-200 text-slate-600 hover:text-blue-700 text-[11px] font-medium transition shadow-2xs"
                    >
                      #{tag.label}
                    </Link>
                  ))}
                </div>

                {/* Trust & Network Metrics */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold font-serif text-slate-950">12,400+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Publications</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-serif text-slate-950">850+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Active CFPs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-serif text-slate-950">1,200+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Conferences</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-serif text-slate-950">150+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Countries</div>
                  </div>
                </div>
              </div>

              {/* Right Column (Span 5): Live Scholarly Showcase Card Stack */}
              <div className="lg:col-span-5 relative">
                {/* Main Featured Paper Card */}
                <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Peer Reviewed
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      DOI: 10.1234/jps.2025.001
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-blue-700 uppercase tracking-tight">
                      Journal of Political Science • Vol. 42
                    </div>
                    <h3 className="text-lg font-bold font-serif text-slate-950 leading-snug">
                      <Link href="/research-papers/digital-platforms-and-democratic-engagement" className="hover:text-blue-700 transition">
                        Digital Platforms and Democratic Engagement: A Global Perspective
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      Cross-national empirical analysis investigating how algorithmic social platforms influence
                      electoral participation, civic discourse, and polarization across 18 democracies.
                    </p>
                  </div>

                  {/* Authors & Publication Line */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <div className="font-medium text-slate-800">
                      Dr. James Wilson & Dr. Maria Lopez
                    </div>
                    <span className="text-[11px] text-slate-400">Oxford & Stanford</span>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-500">
                      Open Access • PDF Available
                    </span>
                    <Link
                      href="/research-papers/digital-platforms-and-democratic-engagement"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900"
                    >
                      <span>Read Publication</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Floating Urgent Deadline Card (Bottom Right overlap) */}
                <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-xl border border-amber-200 shadow-xl p-4 max-w-xs space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      Closing Soon
                    </span>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      7 days left
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 font-serif line-clamp-1">
                    18th Int'l Conference on Democratic Innovations
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Deadline: 30 April 2026 • Barcelona, Spain
                  </p>
                </div>

                {/* Floating Verified Badge (Top Right overlap) */}
                <div className="hidden sm:flex absolute -top-4 -right-4 bg-slate-900 text-white rounded-xl shadow-lg px-3.5 py-2 items-center gap-2 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>150+ Partner Institutions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. EXPLORE SECTION (3 MAJOR VISUAL HUBS) */}
        {/* ================================================================= */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
                Explore the Network
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                A structured gateway to scholarly literature, career opportunities, and academic assemblies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Hub 1: Research */}
              <div className="group bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-8 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-950 group-hover:text-blue-700 transition">
                      Research
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Discover scholarly work and academic publications.
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-200/80 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <Link href="/research-papers" className="hover:text-blue-700 font-medium">
                        Research Papers
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <Link href="/articles" className="hover:text-blue-700 font-medium">
                        Articles & Essays
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <Link href="/research?type=WORKING_PAPER" className="hover:text-blue-700 font-medium">
                        Working Papers
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 group-hover:text-blue-800"
                  >
                    <span>Explore Research</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Hub 2: Opportunities */}
              <div className="group bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-teal-300 p-8 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-950 group-hover:text-teal-700 transition">
                      Opportunities
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Find opportunities to advance your academic journey.
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-200/80 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                      <Link href="/funding" className="hover:text-teal-700 font-medium">
                        Funding & Grants
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                      <Link href="/fellowships" className="hover:text-teal-700 font-medium">
                        Fellowships & Residencies
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                      <Link href="/opportunities" className="hover:text-teal-700 font-medium">
                        Research Positions
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    href="/opportunities"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 group-hover:text-teal-800"
                  >
                    <span>Explore Opportunities</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Hub 3: Events */}
              <div className="group bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-sky-300 p-8 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-950 group-hover:text-sky-700 transition">
                      Events
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Discover conferences and academic learning events.
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-200/80 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                      <Link href="/conferences" className="hover:text-sky-700 font-medium">
                        Conferences & Symposia
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                      <Link href="/workshops" className="hover:text-sky-700 font-medium">
                        Workshops & Masterclasses
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                      <Link href="/webinars" className="hover:text-sky-700 font-medium">
                        Webinars & Lectures
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 group-hover:text-sky-800"
                  >
                    <span>Explore Events</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. LATEST SECTION (ONE UNIFIED RESEARCH & ACADEMIC FEED) */}
        {/* ================================================================= */}
        <section className="py-16 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
                  Latest Academic Updates
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Recent scholarly publications, calls for papers, and academic announcements across fields.
                </p>
              </div>

              <Link
                href="/search"
                className="text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 shrink-0"
              >
                <span>Browse All Content</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Unified Feed Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {unifiedFeed.map((item) => {
                const targetPath = getContentPath(item);
                const typeLabel = item.content_type.replace(/_/g, " ");

                // Style badge by type
                let badgeColor = "bg-blue-50 text-blue-800 border-blue-200";
                if (item.content_type === "CFP") badgeColor = "bg-amber-50 text-amber-900 border-amber-200";
                if (item.content_type === "CONFERENCE") badgeColor = "bg-sky-50 text-sky-800 border-sky-200";
                if (item.content_type === "FUNDING") badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
                if (item.content_type === "OPPORTUNITY" || item.content_type === "FELLOWSHIP") badgeColor = "bg-teal-50 text-teal-800 border-teal-200";
                if (item.content_type === "ARTICLE") badgeColor = "bg-purple-50 text-purple-800 border-purple-200";

                const authorOrOrg =
                  item.authors && item.authors.length > 0
                    ? item.authors.map((a) => a.name).join(", ")
                    : item.organization?.name || item.research_paper?.journal || "AcademIQ Network";

                return (
                  <article
                    key={item.id}
                    className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor}`}>
                          {typeLabel}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatAcademicDate(item.published_at || item.created_at)}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition font-serif line-clamp-2 leading-snug">
                        <Link href={targetPath}>{item.title}</Link>
                      </h3>

                      <p className="text-xs text-slate-500 font-medium truncate">
                        By {authorOrOrg}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.short_description || "Read full details and download resources on AcademIQ."}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 truncate max-w-[150px]">
                        <Globe className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.category?.name || "Interdisciplinary"}</span>
                      </span>

                      <Link
                        href={targetPath}
                        className="text-xs font-semibold text-blue-700 group-hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. CLOSING SOON (DEADLINE-BASED OPPORTUNITIES) */}
        {/* ================================================================= */}
        {closingSoon.length > 0 && (
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold mb-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Time-Sensitive Deadlines</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
                    Closing Soon
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upcoming submission and application deadlines across CFPs, grants, and fellowships.
                  </p>
                </div>

                <Link
                  href="/cfps"
                  className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 shrink-0"
                >
                  <span>View All Deadlines</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 4-Card Deadline Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {closingSoon.map(({ item, deadlineDate, remainingDays, badgeLabel, badgeClass }) => {
                  const targetPath = getContentPath(item);
                  const typeLabel = item.content_type.replace(/_/g, " ");

                  return (
                    <div
                      key={item.id}
                      className="group bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                            {typeLabel}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${badgeClass}`}>
                            {badgeLabel}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition font-serif line-clamp-2 leading-snug">
                          <Link href={targetPath}>{item.title}</Link>
                        </h3>

                        <div className="text-xs text-slate-500 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="font-semibold text-slate-700">
                              Deadline: {formatAcademicDate(deadlineDate)}
                            </span>
                          </div>
                          {item.organization && (
                            <p className="text-[11px] text-slate-400 truncate">
                              {item.organization.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-200/80">
                        <Link
                          href={targetPath}
                          className="w-full py-2 px-3 rounded-lg bg-white group-hover:bg-slate-900 text-slate-800 group-hover:text-white border border-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                        >
                          <span>Apply / Submit</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 5. SSRF SPOTLIGHT (SOCIAL SCIENCES RESEARCH FORUM) */}
        {/* ================================================================= */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>An Initiative of AcademIQ</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
                  Social Sciences Research Forum (SSRF)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A scholarly community for research-driven discussion and academic exchange in the social sciences.
                  SSRF connects doctoral candidates, senior faculty, and think-tank analysts.
                </p>
              </div>

              <Link
                href="/communities/ssrf"
                className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-xs transition inline-flex items-center gap-2 shrink-0 self-start md:self-auto"
              >
                <span>Explore SSRF</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 4 SSRF Showcase Items: Article, Working Paper, CFP, Event */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Latest Article */}
              {ssrfArticle && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                      Latest Article
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 hover:text-blue-700 transition font-serif line-clamp-2">
                      <Link href={`/articles/${ssrfArticle.slug}`}>{ssrfArticle.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {ssrfArticle.short_description}
                    </p>
                  </div>
                  <Link
                    href={`/articles/${ssrfArticle.slug}`}
                    className="text-xs font-semibold text-blue-700 hover:underline pt-2 inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Latest Working Paper / Research Paper */}
              {ssrfPaper && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      Working Paper
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 hover:text-blue-700 transition font-serif line-clamp-2">
                      <Link href={`/research-papers/${ssrfPaper.slug}`}>{ssrfPaper.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {ssrfPaper.short_description}
                    </p>
                  </div>
                  <Link
                    href={`/research-papers/${ssrfPaper.slug}`}
                    className="text-xs font-semibold text-blue-700 hover:underline pt-2 inline-flex items-center gap-1"
                  >
                    <span>Read Paper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Latest CFP */}
              {ssrfCFP && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                      Latest CFP
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 hover:text-blue-700 transition font-serif line-clamp-2">
                      <Link href={`/cfps/${ssrfCFP.slug}`}>{ssrfCFP.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {ssrfCFP.short_description}
                    </p>
                  </div>
                  <Link
                    href={`/cfps/${ssrfCFP.slug}`}
                    className="text-xs font-semibold text-blue-700 hover:underline pt-2 inline-flex items-center gap-1"
                  >
                    <span>View CFP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Upcoming Event */}
              {ssrfEvent && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      Upcoming Symposium
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 hover:text-blue-700 transition font-serif line-clamp-2">
                      <Link href={`/conferences/${ssrfEvent.slug}`}>{ssrfEvent.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {ssrfEvent.short_description}
                    </p>
                  </div>
                  <Link
                    href={`/conferences/${ssrfEvent.slug}`}
                    className="text-xs font-semibold text-blue-700 hover:underline pt-2 inline-flex items-center gap-1"
                  >
                    <span>Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
