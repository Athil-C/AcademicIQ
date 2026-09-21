import Link from "next/link";
import { FullContentItem } from "@/types";
import { Compass, MapPin, Award, ArrowRight } from "lucide-react";
import { DeadlineBadge } from "@/components/deadlines/DeadlineBadge";
import { getContentPath } from "@/lib/utils/routes";

interface OpportunityCardProps {
  opportunity: FullContentItem;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const spec = opportunity.opportunity || opportunity.fellowship;
  const deadline = opportunity.opportunity?.deadline || opportunity.fellowship?.deadline;
  const location = opportunity.opportunity?.location || opportunity.fellowship?.location || opportunity.location || opportunity.country;
  const targetPath = getContentPath(opportunity);

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100 flex items-center gap-1">
            <Compass className="w-3 h-3" />
            {opportunity.content_type === "FELLOWSHIP" ? "Fellowship" : "Research Opportunity"}
          </span>
          <DeadlineBadge deadline={deadline} />
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition font-serif leading-snug">
          <Link href={targetPath}>
            {opportunity.title}
          </Link>
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2">
          {opportunity.short_description}
        </p>

        {spec && "duration" in spec && spec.duration && (
          <div className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
            <Award className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>Duration: {spec.duration}</span>
          </div>
        )}

        {location && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <Link
          href={targetPath}
          className="font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:underline"
        >
          View Eligibility & Apply <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
