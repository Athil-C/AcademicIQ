import Link from "next/link";
import { FullContentItem } from "@/types";
import { Coins, Globe, ArrowRight } from "lucide-react";
import { DeadlineBadge } from "@/components/deadlines/DeadlineBadge";

interface FundingCardProps {
  funding: FullContentItem;
}

export function FundingCard({ funding }: FundingCardProps) {
  const spec = funding.funding;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
            <Coins className="w-3 h-3" />
            Research Grant
          </span>
          <DeadlineBadge deadline={spec?.deadline} />
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition font-serif leading-snug">
          <Link href={`/funding/${funding.slug}`}>
            {funding.title}
          </Link>
        </h3>

        {spec?.provider && (
          <p className="text-xs text-slate-600">
            <span className="font-medium text-slate-700">Funder: </span>
            {spec.provider}
          </p>
        )}

        {spec?.funding_amount && (
          <div className="text-sm font-bold text-emerald-700 bg-emerald-50/60 px-3 py-1 rounded-lg border border-emerald-100 inline-block">
            {spec.funding_amount}
          </div>
        )}

        {spec?.eligible_countries && spec.eligible_countries.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Eligibility: {spec.eligible_countries.join(", ")}</span>
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <Link
          href={`/funding/${funding.slug}`}
          className="font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:underline"
        >
          View Grant Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
