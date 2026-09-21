import { getContentRepository } from "@/lib/data";
import { FullContentItem, ContentType } from "@/types";
import { ResearchPaperCard } from "@/components/cards/ResearchPaperCard";
import { CFPCard } from "@/components/cards/CFPCard";
import { ConferenceCard } from "@/components/cards/ConferenceCard";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { FundingCard } from "@/components/cards/FundingCard";
import { EventCard } from "@/components/cards/EventCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export default async function GlobalSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
    deadline?: string;
    sortBy?: string;
  }>;
}) {
  const params = await searchParams;
  const repository = getContentRepository();

  const [{ items, total }, categories] = await Promise.all([
    repository.getContentList({
      query: params.q || undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: (params.type as any) || undefined,
      category: params.category || undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deadline: (params.deadline as any) || undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sortBy: (params.sortBy as any) || "newest",
      status: "PUBLISHED",
      limit: 30,
    }),
    repository.getCategories(),
  ]);

  const renderCard = (item: FullContentItem) => {
    switch (item.content_type) {
      case "RESEARCH_PAPER":
        return <ResearchPaperCard key={item.id} paper={item} />;
      case "CFP":
        return <CFPCard key={item.id} cfp={item} />;
      case "CONFERENCE":
        return <ConferenceCard key={item.id} conference={item} />;
      case "OPPORTUNITY":
      case "FELLOWSHIP":
        return <OpportunityCard key={item.id} opportunity={item} />;
      case "FUNDING":
        return <FundingCard key={item.id} funding={item} />;
      case "WORKSHOP":
      case "WEBINAR":
        return <EventCard key={item.id} event={item} />;
      case "ARTICLE":
        return <ArticleCard key={item.id} article={item} />;
      case "RESOURCE":
        return <ResourceCard key={item.id} resource={item} />;
      default:
        return <ArticleCard key={item.id} article={item} />;
    }
  };

  const contentTypes: { label: string; value: string }[] = [
    { label: "All Formats", value: "" },
    { label: "Research Papers", value: "RESEARCH_PAPER" },
    { label: "Calls for Papers (CFP)", value: "CFP" },
    { label: "Conferences", value: "CONFERENCE" },
    { label: "Opportunities", value: "OPPORTUNITY" },
    { label: "Grants & Funding", value: "FUNDING" },
    { label: "Fellowships", value: "FELLOWSHIP" },
    { label: "Workshops", value: "WORKSHOP" },
    { label: "Articles", value: "ARTICLE" },
    { label: "Resources", value: "RESOURCE" },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Header Bar */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold font-serif text-slate-900">
            Global Scholarly Discovery
          </h1>

          <form method="GET" action="/search" className="max-w-3xl flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3" />
              <input
                type="text"
                name="q"
                defaultValue={params.q || ""}
                placeholder="Search papers, CFPs, conferences, authors, methodologies..."
                className="w-full pl-12 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg shadow-xs focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold shadow-xs transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Faceted Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Type selector */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Format:</span>
              <div className="flex flex-wrap gap-1">
                {contentTypes.slice(0, 5).map((ct) => {
                  const isSelected = (!params.type && ct.value === "") || params.type === ct.value;
                  return (
                    <a
                      key={ct.label}
                      href={`/search?${new URLSearchParams({
                        ...(params.q ? { q: params.q } : {}),
                        ...(params.category ? { category: params.category } : {}),
                        ...(ct.value ? { type: ct.value } : {}),
                      }).toString()}`}
                      className={`px-2.5 py-1 rounded text-xs transition ${
                        isSelected
                          ? "bg-blue-700 text-white font-semibold"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {ct.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Count & Sorting */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              Found <strong>{total}</strong> result{total !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Results Grid */}
        {items.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-xl border border-slate-200 p-8 space-y-2">
            <p className="text-base font-bold text-slate-900 font-serif">No academic records matched your search.</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching for general keywords like &ldquo;democracy&rdquo;, &ldquo;governance&rdquo;, &ldquo;SSRF&rdquo;, or reset filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(renderCard)}
          </div>
        )}
      </div>
    </div>
  );
}
