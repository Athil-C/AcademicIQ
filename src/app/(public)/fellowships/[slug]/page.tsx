import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { formatAcademicDate } from "@/lib/utils/deadline";
import { DeadlineBadge } from "@/components/deadlines/DeadlineBadge";
import { Award, MapPin, ExternalLink, ArrowLeft, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const item = await repository.getContentBySlug(slug);

  if (!item) return { title: "Fellowship Not Found" };

  return {
    title: `${item.title} | AcademIQ`,
    description: item.short_description || "",
  };
}

export default async function FellowshipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repository = getContentRepository();
  const item = await repository.getContentBySlug(slug);

  if (!item) {
    notFound();
  }

  const spec = item.fellowship;

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/fellowships" className="hover:text-blue-700 flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Fellowships
          </Link>
          <span>/</span>
          <span className="text-slate-700 truncate">{item.title}</span>
        </div>

        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-100 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Academic Fellowship
              </span>
              <DeadlineBadge deadline={spec?.deadline} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950 leading-tight">
              {item.title}
            </h1>

            {spec?.institution && (
              <p className="text-sm font-semibold text-slate-700">
                Host Institution: {spec.institution}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Stipend / Funding</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">{spec?.funding || "Fully Funded"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
              <span className="font-semibold text-slate-800">{spec?.duration || "12-24 Months"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Application Deadline</span>
              <span className="font-semibold text-slate-800">{formatAcademicDate(spec?.deadline)}</span>
            </div>
          </div>

          {spec?.eligibility && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Eligibility & Qualifications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{spec.eligibility}</p>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-lg font-bold font-serif text-slate-900">Fellowship Overview & Research Agenda</h2>
            {item.content ? (
              <div className="prose-academic" dangerouslySetInnerHTML={{ __html: item.content }} />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed font-serif">{item.short_description}</p>
            )}
          </div>

          {spec?.application_url && (
            <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
              <a
                href={spec.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs transition"
              >
                <span>Apply for Fellowship</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
