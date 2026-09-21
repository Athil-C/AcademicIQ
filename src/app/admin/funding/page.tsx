import { AdminContentTable } from "@/components/admin/AdminContentTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminFundingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Research Grants & Funding</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage academic grants, funding providers, application windows, and budgets.
          </p>
        </div>

        <Link
          href="/admin/content/new?type=FUNDING"
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Research Grant</span>
        </Link>
      </div>

      <AdminContentTable initialTypeFilter="FUNDING" />
    </div>
  );
}
