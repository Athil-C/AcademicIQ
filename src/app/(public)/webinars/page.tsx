import { getContentRepository } from "@/lib/data";
import { EventCard } from "@/components/cards/EventCard";
import { Video } from "lucide-react";

export default async function WebinarsListingPage() {
  const repository = getContentRepository();
  const { items: webinars } = await repository.getContentList({
    type: "WEBINAR",
    status: "PUBLISHED",
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 mb-1">
            <Video className="w-4 h-4" />
            <span>Virtual Academic Seminars</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Scholarly Webinars & Keynote Dialogues
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Live interactive presentations, journal publishing roundtables, and policy debates with distinguished academics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((w) => (
            <EventCard key={w.id} event={w} />
          ))}
        </div>
      </div>
    </div>
  );
}
