import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { formatAcademicDate } from "@/lib/utils/deadline";
import { BookOpen, Clock, User, ArrowLeft, Share2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const article = await repository.getContentBySlug(slug);

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | AcademIQ`,
    description: article.article?.excerpt || article.short_description || "",
    openGraph: {
      title: article.title,
      description: article.article?.excerpt || article.short_description || "",
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repository = getContentRepository();
  const article = await repository.getContentBySlug(slug);

  if (!article) {
    notFound();
  }

  const spec = article.article;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/articles" className="hover:text-blue-700 flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
          </Link>
          <span>/</span>
          <span className="text-slate-700 truncate">{article.title}</span>
        </div>

        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 sm:p-12 space-y-8">
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                {article.category?.name || "Academic Essay"}
              </span>
              {spec?.reading_time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {spec.reading_time} min read
                </span>
              )}
              <span>• Published {formatAcademicDate(article.published_at)}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950 leading-tight">
              {article.title}
            </h1>

            {article.authors && article.authors.length > 0 && (
              <div className="pt-2 flex items-center gap-3 text-xs">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{article.authors.map((a) => a.name).join(", ")}</p>
                  <p className="text-slate-500 text-[11px]">
                    {article.authors[0]?.affiliation || "Academic Research Fellow"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {spec?.excerpt && (
            <p className="text-base text-slate-600 font-serif italic border-l-2 border-slate-300 pl-4">
              {spec.excerpt}
            </p>
          )}

          <div
            className="prose-academic"
            dangerouslySetInnerHTML={{ __html: article.content || "<p>Content in draft.</p>" }}
          />
        </article>
      </div>
    </div>
  );
}
