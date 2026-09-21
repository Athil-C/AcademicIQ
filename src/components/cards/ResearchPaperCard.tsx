import Link from "next/link";
import Image from "next/image";
import { FullContentItem } from "@/types";
import { FileText, ArrowUpRight, Download, BookOpen } from "lucide-react";
import { formatAcademicDate } from "@/lib/utils/deadline";

interface ResearchPaperCardProps {
  paper: FullContentItem;
  featured?: boolean;
  variant?: "vertical" | "horizontal";
}

export function ResearchPaperCard({ paper, featured, variant = "vertical" }: ResearchPaperCardProps) {
  const spec = paper.research_paper;

  if (variant === "horizontal") {
    return (
      <article className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all p-5 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
        {/* Left Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
          {paper.cover_image_url ? (
            <Image
              src={paper.cover_image_url}
              alt={paper.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
              <BookOpen className="w-8 h-8 stroke-[1.5]" />
            </div>
          )}
        </div>

        {/* Right Info */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition font-serif leading-snug">
            <Link href={`/research-papers/${paper.slug}`}>
              {paper.title}
            </Link>
          </h3>

          {/* Authors */}
          {paper.authors && paper.authors.length > 0 && (
            <p className="text-xs text-slate-700 font-medium">
              {paper.authors.map((a, i) => (
                <span key={a.id}>
                  {a.name}
                  {i < (paper.authors?.length || 0) - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}

          {/* Publication Metadata Line */}
          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 font-medium">
            {spec?.journal && <span>{spec.journal}</span>}
            {spec?.journal && <span>•</span>}
            <span>
              {spec?.publication_date
                ? new Date(spec.publication_date).getFullYear()
                : "2025"}
            </span>
            {spec?.doi && <span>•</span>}
            {spec?.doi && (
              <span className="font-mono text-slate-600">DOI: {spec.doi}</span>
            )}
          </div>

          {/* Tags & Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {paper.category && (
                <span className="text-[11px] font-medium text-blue-700 bg-blue-50/80 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
                  {paper.category.name}
                </span>
              )}
              {paper.tags?.slice(0, 2).map((t) => (
                <span
                  key={t.id}
                  className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full"
                >
                  {t.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                Open Access
              </span>
              {spec?.pdf_url && (
                <a
                  href={spec.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-blue-800 bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100">
              <FileText className="w-3 h-3" />
              {paper.category?.name || "Research Paper"}
            </span>
            {spec?.journal && (
              <span className="font-serif italic text-slate-600 truncate max-w-[200px]">
                {spec.journal}
              </span>
            )}
          </div>
          <span>{formatAcademicDate(spec?.publication_date || paper.published_at)}</span>
        </div>

        {/* Paper Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition font-serif leading-snug">
          <Link href={`/research-papers/${paper.slug}`}>
            {paper.title}
          </Link>
        </h3>

        {/* Authors */}
        {paper.authors && paper.authors.length > 0 && (
          <div className="text-xs text-slate-600 font-medium">
            <span>By </span>
            {paper.authors.map((a, i) => (
              <span key={a.id}>
                {a.name}
                {i < (paper.authors?.length || 0) - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        )}

        {/* Abstract snippet */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {spec?.abstract || paper.short_description}
        </p>

        {/* DOI & Keywords */}
        {spec?.doi && (
          <div className="pt-1">
            <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              DOI: {spec.doi}
            </span>
          </div>
        )}
      </div>

      {/* Footer Action Links */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <Link
          href={`/research-papers/${paper.slug}`}
          className="font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:underline"
        >
          Read Abstract & Paper <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {spec?.pdf_url && (
          <a
            href={spec.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 transition"
          >
            <Download className="w-3.5 h-3.5" />
            PDF
          </a>
        )}
      </div>
    </article>
  );
}
