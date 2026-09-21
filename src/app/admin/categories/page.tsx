import { getContentRepository } from "@/lib/data";
import { FolderTree, Plus, Layers } from "lucide-react";

export default async function AdminCategoriesPage() {
  const repository = getContentRepository();
  const categories = await repository.getCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Academic Disciplines & Categories</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize research papers, symposiums, and opportunities into scholarly disciplines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                  <FolderTree className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 font-serif">{c.name}</h3>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>slug: {c.slug}</span>
              <span className="text-emerald-700 font-medium font-sans">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
