import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { ResearchPaperCard } from "@/components/cards/ResearchPaperCard";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default async function ResearchPapersListingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: string; year?: string }>;
}) {
  const params = await searchParams;
  const repository = getContentRepository();

  const [{ items: papers, total }, categories] = await Promise.all([
    repository.getContentList({
      type: "RESEARCH_PAPER",
      status: "PUBLISHED",
      category: params.category,
      query: params.q,
    }),
    repository.getCategories(),
  ]);

  const disciplineCounts = [
    { name: "Social Sciences", slug: "social-sciences", count: 542 },
    { name: "Political Science", slug: "political-science", count: 312 },
    { name: "Economics", slug: "economics", count: 198 },
    { name: "Sociology", slug: "sociology", count: 154 },
    { name: "Anthropology", slug: "anthropology", count: 82 },
    { name: "History", slug: "history", count: 58 },
  ];

  const yearCounts = [
    { year: "2025", count: 320 },
    { year: "2024", count: 210 },
    { year: "2023", count: 189 },
    { year: "2022", count: 110 },
  ];

  return (
    <div className="py-8 sm:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-700 transition">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Research Papers</span>
        </nav>

        {/* Page Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tracking-tight">
            Research Papers
          </h1>
          <p className="text-sm text-slate-600">
            Explore peer-reviewed research and working papers from around the world.
          </p>
        </div>

        {/* Top Search & Filter Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          {/* Search form */}
          <form method="GET" action="/research-papers" className="relative flex-1 min-w-[260px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={params.q || ""}
              placeholder="Search paper by title, author, keyword..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
            />
          </form>

          {/* Quick Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative inline-flex items-center">
              <select
                aria-label="Filter by discipline"
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 pr-7 text-xs font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="">Discipline</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 pointer-events-none" />
            </div>

            <div className="relative inline-flex items-center">
              <select
                aria-label="Filter by publication year"
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 pr-7 text-xs font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="">Publication Year</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 pointer-events-none" />
            </div>

            <div className="relative inline-flex items-center">
              <select
                aria-label="Sort research papers"
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 pr-7 text-xs font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="recent">Sort by: Most Recent</option>
                <option value="cited">Most Cited</option>
                <option value="downloads">Most Downloaded</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 pointer-events-none" />
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
              <span>Filters</span>
            </button>

            {/* Grid / List switcher */}
            <div className="hidden sm:flex items-center border border-slate-200 rounded-lg overflow-hidden ml-1">
              <button
                type="button"
                aria-label="Grid layout"
                className="p-1.5 bg-white hover:bg-slate-50 text-slate-400 border-r border-slate-200 transition"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="List layout"
                className="p-1.5 bg-blue-50 text-blue-700 transition"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout: Left Faceted Sidebar + Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Faceted Filters Sidebar */}
          <aside className="space-y-6 lg:col-span-1">
            {/* Discipline */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Discipline
              </h3>
              <div className="space-y-2 text-xs">
                {disciplineCounts.map((item) => (
                  <label
                    key={item.slug}
                    className="flex items-center justify-between text-slate-700 hover:text-blue-700 cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="discipline"
                        value={item.slug}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-slate-400 group-hover:text-blue-600">
                      ({item.count})
                    </span>
                  </label>
                ))}
                <div className="pt-1">
                  <button type="button" className="text-xs text-blue-700 hover:underline font-medium">
                    More...
                  </button>
                </div>
              </div>
            </div>

            {/* Publication Year */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Publication Year
              </h3>
              <div className="space-y-2 text-xs">
                {yearCounts.map((item) => (
                  <label
                    key={item.year}
                    className="flex items-center justify-between text-slate-700 hover:text-blue-700 cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="year"
                        value={item.year}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <span>{item.year}</span>
                    </div>
                    <span className="text-slate-400 group-hover:text-blue-600">
                      ({item.count})
                    </span>
                  </label>
                ))}
                <div className="pt-1">
                  <button type="button" className="text-xs text-blue-700 hover:underline font-medium">
                    More...
                  </button>
                </div>
              </div>
            </div>

            {/* Access Type */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Access Type
              </h3>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between text-slate-700 hover:text-blue-700 cursor-pointer select-none">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>Open Access</span>
                  </div>
                  <span className="text-slate-400">(412)</span>
                </label>
                <label className="flex items-center justify-between text-slate-700 hover:text-blue-700 cursor-pointer select-none">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>Subscription</span>
                  </div>
                  <span className="text-slate-400">(165)</span>
                </label>
              </div>
            </div>

            {/* Collapsible Filters: Author, Journal, Country */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden text-xs">
              <button
                type="button"
                className="w-full p-4 flex items-center justify-between text-slate-800 font-bold hover:bg-slate-50 transition"
              >
                <span>Author</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                className="w-full p-4 flex items-center justify-between text-slate-800 font-bold hover:bg-slate-50 transition"
              >
                <span>Journal</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                className="w-full p-4 flex items-center justify-between text-slate-800 font-bold hover:bg-slate-50 transition"
              >
                <span>Country</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </aside>

          {/* Right Main Column: Count + Paper Cards + Pagination */}
          <main className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-semibold text-slate-600">
                1,248 papers found
              </span>
            </div>

            {papers.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-xl border border-slate-200 p-8 space-y-2">
                <p className="text-sm font-semibold text-slate-800">No research papers found.</p>
                <p className="text-xs text-slate-500">
                  Try adjusting your search keywords or clearing your filters.
                </p>
                <div className="pt-2">
                  <Link
                    href="/research-papers"
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    Clear all filters
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                {papers.map((paper) => (
                  <ResearchPaperCard
                    key={paper.id}
                    paper={paper}
                    variant="horizontal"
                  />
                ))}
              </div>
            )}

            {/* Pagination Row */}
            <div className="pt-6 flex items-center justify-center gap-1.5 text-xs font-medium select-none">
              <button
                type="button"
                aria-label="Previous page"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-blue-700 text-white font-bold flex items-center justify-center shadow-2xs"
              >
                1
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition"
              >
                2
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition"
              >
                3
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition"
              >
                4
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition"
              >
                5
              </button>
              <span className="px-1 text-slate-400">...</span>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition"
              >
                124
              </button>
              <button
                type="button"
                aria-label="Next page"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
