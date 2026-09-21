import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { formatAcademicDate } from "@/lib/utils/deadline";
import { DeadlineBadge } from "@/components/deadlines/DeadlineBadge";
import { Compass, MapPin, ExternalLink, ArrowLeft, Building } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const item = await repository.getContentBySlug(slug);

  if (!item) return { title: "Opportunity Not Found" };

  return {
    title: `${item.title} | AcademIQ`,
    description: item.short_description || "",
  };
}

export default async function OpportunityDetailPage({
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

  const spec = item.opportunity;

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/opportunities" className="hover:text-blue-700 flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Opportunities
          </Link>
          <span>/</span>
          <span className="text-slate-700 truncate">{item.title}</span>
        </div>

        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-100 flex items-center gap-1">
                <Compass className="w-3 h-3" />
                {spec?.opportunity_type || "Research Position"}
              </span>
              <DeadlineBadge deadline={spec?.deadline} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950 leading-tight">
              {item.title}
            </h1>

            {item.organization && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Building className="w-4 h-4 text-slate-400" />
                <span>{item.organization.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Position Scope & Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="font-semibold text-slate-800">{spec?.location || item.location || "Flexible"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Deadline</span>
                <span className="font-semibold text-slate-800">{formatAcademicDate(spec?.deadline)}</span>
              </div>
            </div>
          </div>

          {spec?.eligibility && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Eligibility Requirements</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{spec.eligibility}</p>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-lg font-bold font-serif text-slate-900">Role Description & Application Process</h2>
            {item.content ? (
              <div className="prose-academic" dangerouslySetInnerHTML={{ __html: item.content }} />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed font-serif">{item.short_description}</p>
            )}
          </div>

          {spec?.application_url && (
            <div className="pt-6 border-t border-slate-100">
              <a
                href={spec.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs transition"
              >
                <span>Apply via Institutional Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
