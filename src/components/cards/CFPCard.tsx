import Link from "next/link";
import { FullContentItem } from "@/types";
import { Megaphone, Calendar, MapPin, Globe, ArrowRight } from "lucide-react";
import { DeadlineBadge } from "@/components/deadlines/DeadlineBadge";
import { formatAcademicDate } from "@/lib/utils/deadline";

interface CFPCardProps {
  cfp: FullContentItem;
}

export function CFPCard({ cfp }: CFPCardProps) {
  const spec = cfp.cfp;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Top Header: Badge & Mode */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
            <Megaphone className="w-3 h-3" />
            Call for Papers
          </span>

          {spec?.mode && (
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" />
              {spec.mode}
            </span>
          )}
        </div>

        {/* Conference / Event Name */}
        <div className="text-xs font-semibold text-slate-600 uppercase tracking-tight">
          {spec?.conference_name || "Academic Conference"}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition font-serif leading-snug">
          <Link href={`/cfps/${cfp.slug}`}>
            {cfp.title}
          </Link>
        </h3>

        {/* Theme or Institution */}
        {spec?.theme && (
          <p className="text-xs text-slate-600 line-clamp-2">
            <span className="font-semibold text-slate-700">Theme: </span>
            {spec.theme}
          </p>
        )}

        {/* Institution & Country */}
        {(spec?.organizing_institution || cfp.country) && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              {spec?.organizing_institution}
              {spec?.organizing_institution && cfp.country ? `, ${cfp.country}` : cfp.country}
            </span>
          </div>
        )}
      </div>

      {/* Deadline & CTA Section */}
      <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs">
            <span className="text-slate-500 block text-[11px]">Submission Deadline:</span>
            <span className="font-semibold text-slate-800">
              {formatAcademicDate(spec?.submission_deadline)}
            </span>
          </div>

          <DeadlineBadge deadline={spec?.submission_deadline} />
        </div>

        <Link
          href={`/cfps/${cfp.slug}`}
          className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-blue-50 text-blue-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200 hover:border-blue-200 transition"
        >
          <span>View Call for Papers</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
