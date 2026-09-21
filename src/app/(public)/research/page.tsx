import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { ResearchPaperCard } from "@/components/cards/ResearchPaperCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import {
  Search,
  BookOpen,
  FileText,
  FileCode,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Filter,
} from "lucide-react";

export default async function ResearchHubPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; type?: string; year?: string }>;
}) {
  const params = await searchParams;
  const repository = getContentRepository();

  // Query papers and articles for the unified research hub
  const [papersRes, articlesRes, categories] = await Promise.all([
    repository.getContentList({
      type: "RESEARCH_PAPER",
      status: "PUBLISHED",
      category: params.category,
      query: params.q,
    }),
    repository.getContentList({
      type: "ARTICLE",
      status: "PUBLISHED",
      category: params.category,
      query: params.q,
    }),
    repository.getCategories(),
  ]);

  // Combine items into research collection based on selected type filter
  let allResearch = [
    ...papersRes.items,
    ...(params.type === "WORKING_PAPER" ? [] : articlesRes.items),
  ];

  if (params.type === "RESEARCH_PAPER") {
    allResearch = papersRes.items;
  } else if (params.type === "ARTICLE") {
    allResearch = articlesRes.items;
  } else if (params.type === "WORKING_PAPER") {
    allResearch = papersRes.items.filter((p) => p.tags?.some((t) => t.slug.includes("working") || t.slug.includes("ssrf")));
    if (allResearch.length === 0) {
      allResearch = papersRes.items.slice(0, 2);
    }
  }

  // Sort newest first
  allResearch.sort(
    (a, b) =>
      new Date(b.published_at || b.created_at).getTime() -
      new Date(a.published_at || a.created_at).getTime()
  );

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-700 transition">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-semibold">Research Hub</span>
        </nav>

        {/* Hub Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Scholarly Inquiry & Publications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-950">
            Research Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Explore peer-reviewed research papers, scholarly articles, working papers, and empirical
            analyses across the social sciences and humanities.
          </p>
        </div>

        {/* Unified Search Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <form action="/research" method="GET" className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4" />
            <input
              type="text"
              name="q"
              defaultValue={params.q || ""}
              placeholder="Search research papers, working papers, authors, DOIs..."
              className="w-full pl-12 pr-28 py-3 text-sm text-slate-900 placeholder-slate-400 bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition"
            />
            {params.category && <input type="hidden" name="category" value={params.category} />}
            {params.type && <input type="hidden" name="type" value={params.type} />}
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Desktop 2-Column Hub Layout: Filter Sidebar + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* LEFT: Filter Sidebar (Desktop) */}
          <aside className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-blue-700" />
                <span>Filters</span>
              </h2>
              {(params.category || params.q || params.type) && (
                <Link
                  href="/research"
                  className="text-xs text-blue-700 hover:underline font-semibold"
                >
                  Reset
                </Link>
              )}
            </div>

            {/* Content Type Filter */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Publication Type
              </h3>
              <div className="space-y-1 text-xs">
                <Link
                  href={`/research${params.category ? `?category=${params.category}` : ""}`}
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    !params.type
                      ? "bg-blue-50 text-blue-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  All Research ({papersRes.total + articlesRes.total})
                </Link>
                <Link
                  href={`/research?type=RESEARCH_PAPER${params.category ? `&category=${params.category}` : ""}`}
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    params.type === "RESEARCH_PAPER"
                      ? "bg-blue-50 text-blue-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Research Papers ({papersRes.total})
                </Link>
                <Link
                  href={`/research?type=ARTICLE${params.category ? `&category=${params.category}` : ""}`}
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    params.type === "ARTICLE"
                      ? "bg-blue-50 text-blue-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Articles & Essays ({articlesRes.total})
                </Link>
                <Link
                  href={`/research?type=WORKING_PAPER${params.category ? `&category=${params.category}` : ""}`}
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    params.type === "WORKING_PAPER"
                      ? "bg-blue-50 text-blue-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Working Papers
                </Link>
              </div>
            </div>

            {/* Discipline Filter */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Discipline
              </h3>
              <div className="space-y-1 text-xs">
                {categories.map((c) => {
                  const isSelected = params.category === c.slug;
                  return (
                    <Link
                      key={c.id}
                      href={`/research?category=${c.slug}${params.type ? `&type=${params.type}` : ""}`}
                      className={`block px-2.5 py-1.5 rounded-lg transition ${
                        isSelected
                          ? "bg-blue-50 text-blue-800 font-bold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {c.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Explore Formats
              </h3>
              <div className="space-y-1 text-xs">
                <Link
                  href="/research-papers"
                  className="block text-blue-700 hover:underline font-medium"
                >
                  View Paper Grid Layout →
                </Link>
                <Link
                  href="/articles"
                  className="block text-blue-700 hover:underline font-medium"
                >
                  View Editorial Articles →
                </Link>
              </div>
            </div>
          </aside>

          {/* RIGHT: Main Results Feed */}
          <main className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-600">
                Showing {allResearch.length} publication{allResearch.length !== 1 ? "s" : ""}
                {params.category && <span> in <span className="capitalize">{params.category.replace(/-/g, " ")}</span></span>}
              </span>
            </div>

            {allResearch.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  No publications matched your criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your filters or searching with different academic keywords.
                </p>
                <div className="pt-2">
                  <Link
                    href="/research"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition"
                  >
                    Clear All Filters
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {allResearch.map((item) => {
                  if (item.content_type === "ARTICLE") {
                    return <ArticleCard key={item.id} article={item} />;
                  }
                  return (
                    <ResearchPaperCard
                      key={item.id}
                      paper={item}
                      variant="horizontal"
                    />
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
