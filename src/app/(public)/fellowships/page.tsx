import { getContentRepository } from "@/lib/data";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { Award } from "lucide-react";

export default async function FellowshipsListingPage() {
  const repository = getContentRepository();
  const { items: fellowships } = await repository.getContentList({
    type: "FELLOWSHIP",
    status: "PUBLISHED",
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
            <Award className="w-4 h-4" />
            <span>Academic Fellowships</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Postdoctoral & Senior Research Fellowships
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Explore fully funded research residencies, post-doctoral stipends, and scholarly grants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fellowships.map((f) => (
            <OpportunityCard key={f.id} opportunity={f} />
          ))}
        </div>
      </div>
    </div>
  );
}
