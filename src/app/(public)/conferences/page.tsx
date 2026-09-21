import { getContentRepository } from "@/lib/data";
import { ConferenceCard } from "@/components/cards/ConferenceCard";
import { Calendar, Globe } from "lucide-react";

export default async function ConferencesListingPage() {
  const repository = getContentRepository();
  const { items: conferences, total } = await repository.getContentList({
    type: "CONFERENCE",
    status: "PUBLISHED",
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
            <Calendar className="w-4 h-4" />
            <span>Global Academic Summits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Academic Conferences & Symposia
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Explore international conventions, plenary lectures, and interdisciplinary symposium dates across the world.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {conferences.length} Conference{conferences.length !== 1 ? "s" : ""}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferences.map((conf) => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>
      </div>
    </div>
  );
}
