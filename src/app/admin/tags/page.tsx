import { getContentRepository } from "@/lib/data";
import { Tags, Hash } from "lucide-react";

export default async function AdminTagsPage() {
  const repository = getContentRepository();
  const tags = await repository.getTags();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">Taxonomy Tags</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Cross-cutting keywords used across disciplines for search and recommendation clustering.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Currently Configured Tags ({tags.length})
        </h3>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:border-blue-400 transition"
            >
              <Hash className="w-3.5 h-3.5 text-blue-600" />
              <span>{tag.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">({tag.slug})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
