import { getContentRepository } from "@/lib/data";
import { FundingCard } from "@/components/cards/FundingCard";
import { Coins } from "lucide-react";

export default async function FundingListingPage() {
  const repository = getContentRepository();
  const { items: grants } = await repository.getContentList({
    type: "FUNDING",
    status: "PUBLISHED",
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <Coins className="w-4 h-4" />
            <span>Research Funding & Grants</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Scholarly Grants & Research Funding
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Explore competitive institutional grants, research funding mechanisms, and international project funds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grants.map((grant) => (
            <FundingCard key={grant.id} funding={grant} />
          ))}
        </div>
      </div>
    </div>
  );
}
