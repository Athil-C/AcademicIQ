import { AdminContentTable } from "@/components/admin/AdminContentTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminArticlesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Articles & Essays</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage long-form academic essays, critical commentaries, and editorial reviews.
          </p>
        </div>

        <Link
          href="/admin/content/new?type=ARTICLE"
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </Link>
      </div>

      <AdminContentTable initialTypeFilter="ARTICLE" />
    </div>
  );
}
