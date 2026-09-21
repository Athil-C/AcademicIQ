import { getContentRepository } from "@/lib/data";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { BookOpen } from "lucide-react";

export default async function ArticlesListingPage() {
  const repository = getContentRepository();
  const { items: articles } = await repository.getContentList({
    type: "ARTICLE",
    status: "PUBLISHED",
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Scholarly Essays & Perspectives</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Academic Articles & Reviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Thought leadership, epistemic critiques, and review essays written by researchers and editorial directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </div>
    </div>
  );
}
