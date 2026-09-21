import Link from "next/link";
import { FullContentItem } from "@/types";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { formatAcademicDate } from "@/lib/utils/deadline";

interface ArticleCardProps {
  article: FullContentItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const spec = article.article;

  return (
    <article className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            Scholarly Article
          </span>
          {spec?.reading_time && (
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3" /> {spec.reading_time} min read
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition font-serif leading-snug">
          <Link href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        {article.authors && article.authors.length > 0 && (
          <p className="text-xs text-slate-600 font-medium">
            By {article.authors.map((a) => a.name).join(", ")}
          </p>
        )}

        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {spec?.excerpt || article.short_description}
        </p>

        <div className="text-[11px] text-slate-400">
          Published {formatAcademicDate(article.published_at)}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <Link
          href={`/articles/${article.slug}`}
          className="font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:underline"
        >
          Read Full Essay <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
