import { AdminContentTable } from "@/components/admin/AdminContentTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminPapersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Research Papers</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage peer-reviewed articles, working papers, DOI citations, and attached PDFs.
          </p>
        </div>

        <Link
          href="/admin/content/new?type=RESEARCH_PAPER"
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Research Paper</span>
        </Link>
      </div>

      <AdminContentTable initialTypeFilter="RESEARCH_PAPER" />
    </div>
  );
}
