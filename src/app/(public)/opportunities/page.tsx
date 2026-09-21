import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { FundingCard } from "@/components/cards/FundingCard";
import {
  Compass,
  Coins,
  Award,
  Search,
  Filter,
} from "lucide-react";

export default async function OpportunitiesHubPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const params = await searchParams;
  const repository = getContentRepository();

  const [oppsRes, fundingRes, fellowshipsRes] = await Promise.all([
    repository.getContentList({
      type: "OPPORTUNITY",
      status: "PUBLISHED",
      query: params.q,
    }),
    repository.getContentList({
      type: "FUNDING",
      status: "PUBLISHED",
      query: params.q,
    }),
    repository.getContentList({
      type: "FELLOWSHIP",
      status: "PUBLISHED",
      query: params.q,
    }),
  ]);

  let allItems = [
    ...fundingRes.items,
    ...fellowshipsRes.items,
    ...oppsRes.items,
  ];

  if (params.type === "FUNDING") {
    allItems = fundingRes.items;
  } else if (params.type === "FELLOWSHIP") {
    allItems = fellowshipsRes.items;
  } else if (params.type === "OPPORTUNITY") {
    allItems = oppsRes.items;
  }

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-teal-700 transition">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-semibold">Opportunities Hub</span>
        </nav>

        {/* Hub Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            <Compass className="w-3.5 h-3.5" />
            <span>Grants, Fellowships & Positions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-950">
            Opportunities Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Find funding grants, postdoctoral fellowships, doctoral studentships, and scholarly research
            positions to advance your academic career.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <form action="/opportunities" method="GET" className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4" />
            <input
              type="text"
              name="q"
              defaultValue={params.q || ""}
              placeholder="Search grants, fellowships, positions, providers..."
              className="w-full pl-12 pr-28 py-3 text-sm text-slate-900 placeholder-slate-400 bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white transition"
            />
            {params.type && <input type="hidden" name="type" value={params.type} />}
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* 2-Column Hub Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <aside className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-teal-700" />
                <span>Filters</span>
              </h2>
              {(params.type || params.q) && (
                <Link
                  href="/opportunities"
                  className="text-xs text-teal-700 hover:underline font-semibold"
                >
                  Reset
                </Link>
              )}
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Opportunity Type
              </h3>
              <div className="space-y-1 text-xs">
                <Link
                  href="/opportunities"
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    !params.type
                      ? "bg-teal-50 text-teal-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  All Opportunities ({fundingRes.total + fellowshipsRes.total + oppsRes.total})
                </Link>
                <Link
                  href="/opportunities?type=FUNDING"
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    params.type === "FUNDING"
                      ? "bg-teal-50 text-teal-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Funding & Grants ({fundingRes.total})
                </Link>
                <Link
                  href="/opportunities?type=FELLOWSHIP"
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    params.type === "FELLOWSHIP"
                      ? "bg-teal-50 text-teal-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Fellowships ({fellowshipsRes.total})
                </Link>
                <Link
                  href="/opportunities?type=OPPORTUNITY"
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    params.type === "OPPORTUNITY"
                      ? "bg-teal-50 text-teal-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Research Positions ({oppsRes.total})
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick Links
              </h3>
              <div className="space-y-1 text-xs">
                <Link href="/funding" className="block text-teal-700 hover:underline font-medium">
                  Browse Grant Opportunities →
                </Link>
                <Link href="/fellowships" className="block text-teal-700 hover:underline font-medium">
                  Explore Fellowships →
                </Link>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-600">
                Showing {allItems.length} academic opportunit{allItems.length !== 1 ? "ies" : "y"}
              </span>
            </div>

            {allItems.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Compass className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  No opportunities matched your search
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search criteria or resetting filters.
                </p>
                <div className="pt-2">
                  <Link
                    href="/opportunities"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition"
                  >
                    Clear Filters
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {allItems.map((item) => {
                  if (item.content_type === "FUNDING") {
                    return <FundingCard key={item.id} funding={item} />;
                  }
                  return <OpportunityCard key={item.id} opportunity={item} />;
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
