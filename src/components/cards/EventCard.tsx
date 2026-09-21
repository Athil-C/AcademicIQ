import Link from "next/link";
import { FullContentItem } from "@/types";
import { Video, Layers, Calendar, User, Clock, ArrowRight } from "lucide-react";
import { formatAcademicDate } from "@/lib/utils/deadline";
import { getContentPath } from "@/lib/utils/routes";

interface EventCardProps {
  event: FullContentItem;
}

export function EventCard({ event }: EventCardProps) {
  const isWebinar = event.content_type === "WEBINAR";
  const spec = event.webinar || event.workshop;
  const targetPath = getContentPath(event);

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span
            className={`font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
              isWebinar
                ? "text-orange-800 bg-orange-50 border-orange-100"
                : "text-amber-800 bg-amber-50 border-amber-100"
            }`}
          >
            {isWebinar ? <Video className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
            {isWebinar ? "Live Webinar" : "Methods Workshop"}
          </span>

          {spec?.date && (
            <span className="text-slate-500 font-medium">
              {formatAcademicDate(spec.date)}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition font-serif leading-snug">
          <Link href={targetPath}>
            {event.title}
          </Link>
        </h3>

        {spec?.speaker && (
          <div className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Speaker: {spec.speaker}</span>
          </div>
        )}

        {spec?.time && (
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {spec.time} ({spec.timezone || "UTC"})
            </span>
          </div>
        )}

        <p className="text-xs text-slate-600 line-clamp-2">
          {event.short_description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <Link
          href={targetPath}
          className="font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:underline"
        >
          Event Details & RSVP <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
