import { getContentRepository } from "@/lib/data";
import { EventCard } from "@/components/cards/EventCard";
import { Layers } from "lucide-react";

export default async function WorkshopsListingPage() {
  const repository = getContentRepository();
  const { items: workshops } = await repository.getContentList({
    type: "WORKSHOP",
    status: "PUBLISHED",
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
            <Layers className="w-4 h-4" />
            <span>Academic Capacity Building</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Methodology & Technical Workshops
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Hands-on training sessions in quantitative econometrics, qualitative field research, and computational social science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w) => (
            <EventCard key={w.id} event={w} />
          ))}
        </div>
      </div>
    </div>
  );
}
