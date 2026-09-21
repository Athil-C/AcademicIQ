import { getContentRepository } from "@/lib/data";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { Sparkles } from "lucide-react";

export default async function ResourcesListingPage() {
  const repository = getContentRepository();
  const { items: resources } = await repository.getContentList({
    type: "RESOURCE",
    status: "PUBLISHED",
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Research Toolkits & Curated Datasets</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Scholarly Resources & Methodological Toolkits
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Writing manuals, econometric templates, open datasets, and peer review guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </div>
    </div>
  );
}
