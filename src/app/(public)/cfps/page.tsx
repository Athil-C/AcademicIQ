import { getContentRepository } from "@/lib/data";
import { CFPCard } from "@/components/cards/CFPCard";
import { Megaphone, Calendar, Filter } from "lucide-react";

export default async function CFPsListingPage({
  searchParams,
}: {
  searchParams: Promise<{ deadline?: string; mode?: string; category?: string }>;
}) {
  const params = await searchParams;
  const repository = getContentRepository();

  const [{ items: cfps, total }, categories] = await Promise.all([
    repository.getContentList({
      type: "CFP",
      status: "PUBLISHED",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deadline: (params.deadline as any) || "all",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mode: (params.mode as any) || undefined,
      category: params.category || undefined,
    }),
    repository.getCategories(),
  ]);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
            <Megaphone className="w-4 h-4" />
            <span>Academic Call for Papers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Calls for Papers (CFPs) Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Discover peer-reviewed submission opportunities, abstract deadlines, and special issues across academic disciplines.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Deadline status pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight mr-1">
                Deadline:
              </span>
              {[
                { label: "All Calls", value: "all" },
                { label: "Active", value: "active" },
                { label: "Closing Soon (≤7d)", value: "closing-soon" },
                { label: "Passed", value: "passed" },
              ].map((pill) => {
                const isSelected = (!params.deadline && pill.value === "all") || params.deadline === pill.value;
                return (
                  <a
                    key={pill.value}
                    href={`/cfps?${new URLSearchParams({
                      ...(params.category ? { category: params.category } : {}),
                      ...(params.mode ? { mode: params.mode } : {}),
                      deadline: pill.value,
                    }).toString()}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      isSelected
                        ? "bg-blue-700 text-white font-semibold shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {pill.label}
                  </a>
                );
              })}
            </div>

            {/* Mode selection */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Mode:</span>
              <a
                href="/cfps"
                className={`px-2.5 py-1 text-xs rounded ${
                  !params.mode ? "bg-slate-900 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All
              </a>
              <a
                href={`/cfps?mode=HYBRID`}
                className={`px-2.5 py-1 text-xs rounded ${
                  params.mode === "HYBRID" ? "bg-slate-900 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Hybrid
              </a>
              <a
                href={`/cfps?mode=ONLINE`}
                className={`px-2.5 py-1 text-xs rounded ${
                  params.mode === "ONLINE" ? "bg-slate-900 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Online
              </a>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-xs text-slate-500 font-medium">
          Showing {cfps.length} Call{cfps.length !== 1 ? "s" : ""} for Papers
        </div>

        {/* CFPs Grid */}
        {cfps.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-xl border border-slate-200 p-8 space-y-2">
            <p className="text-sm font-semibold text-slate-800">No CFPs found matching the current filters.</p>
            <p className="text-xs text-slate-500">
              Try switching back to &ldquo;All Calls&rdquo; to view open and upcoming academic submissions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cfps.map((cfp) => (
              <CFPCard key={cfp.id} cfp={cfp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
