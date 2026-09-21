import Link from "next/link";
import { FullContentItem } from "@/types";
import { Calendar, MapPin, Globe, ArrowRight } from "lucide-react";
import { formatAcademicDate } from "@/lib/utils/deadline";

interface ConferenceCardProps {
  conference: FullContentItem;
}

export function ConferenceCard({ conference }: ConferenceCardProps) {
  const spec = conference.conference;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Category & Mode */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Conference
          </span>
          {spec?.mode && (
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" />
              {spec.mode}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition font-serif leading-snug">
          <Link href={`/conferences/${conference.slug}`}>
            {conference.title}
          </Link>
        </h3>

        {/* Organizer */}
        {spec?.organizer && (
          <p className="text-xs text-slate-600">
            <span className="font-medium text-slate-700">Organized by: </span>
            {spec.organizer}
          </p>
        )}

        {/* Dates */}
        <div className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            {formatAcademicDate(spec?.start_date)}
            {spec?.end_date ? ` – ${formatAcademicDate(spec.end_date)}` : ""}
          </span>
        </div>

        {/* Venue */}
        {(spec?.city || spec?.country || spec?.venue) && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              {spec?.venue ? `${spec.venue}, ` : ""}
              {spec?.city ? `${spec.city}, ` : ""}
              {spec?.country || conference.country}
            </span>
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <Link
          href={`/conferences/${conference.slug}`}
          className="font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:underline"
        >
          View Conference Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
