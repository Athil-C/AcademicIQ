import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { formatAcademicDate } from "@/lib/utils/deadline";
import { DeadlineBadge } from "@/components/deadlines/DeadlineBadge";
import { CFPCard } from "@/components/cards/CFPCard";
import {
  Megaphone,
  Calendar,
  MapPin,
  Globe,
  Mail,
  ExternalLink,
  Download,
  ArrowLeft,
  Clock,
  Sparkles,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const cfp = await repository.getContentBySlug(slug);

  if (!cfp) return { title: "Call for Papers Not Found" };

  return {
    title: `${cfp.title} | AcademIQ`,
    description: cfp.short_description || cfp.cfp?.theme || "",
    openGraph: {
      title: cfp.title,
      description: cfp.short_description || "",
      type: "article",
    },
  };
}

export default async function CFPDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repository = getContentRepository();
  const cfp = await repository.getContentBySlug(slug);

  if (!cfp) {
    notFound();
  }

  const spec = cfp.cfp;
  const related = await repository.getRelatedContent(cfp, 3);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/cfps" className="hover:text-blue-700 flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All CFPs
          </Link>
          <span>/</span>
          <span className="text-slate-700 truncate">{spec?.conference_name || "Call for Papers"}</span>
        </div>

        {/* Main CFP Card */}
        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
          {/* Header */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                <Megaphone className="w-3.5 h-3.5" />
                Call for Papers
              </span>

              {spec?.mode && (
                <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  Mode: <strong>{spec.mode}</strong>
                </span>
              )}
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {spec?.conference_name}
            </p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-slate-950 leading-tight">
              {cfp.title}
            </h1>

            {spec?.theme && (
              <p className="text-sm font-medium text-slate-700">
                <span className="text-slate-500">Conference Theme: </span>
                {spec.theme}
              </p>
            )}

            {spec?.organizing_institution && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Organized by {spec.organizing_institution}</span>
              </div>
            )}
          </div>

          {/* Important Deadlines Timeline Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                Important Dates & Deadlines
              </h2>
              <DeadlineBadge deadline={spec?.submission_deadline} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Final Submission
                </span>
                <span className="font-bold text-rose-700 text-sm">
                  {formatAcademicDate(spec?.submission_deadline)}
                </span>
              </div>

              {spec?.abstract_deadline && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Abstract Due
                  </span>
                  <span className="font-medium text-slate-800">
                    {formatAcademicDate(spec.abstract_deadline)}
                  </span>
                </div>
              )}

              {spec?.notification_date && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Author Notification
                  </span>
                  <span className="font-medium text-slate-800">
                    {formatAcademicDate(spec.notification_date)}
                  </span>
                </div>
              )}

              {spec?.conference_start && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Conference Dates
                  </span>
                  <span className="font-medium text-slate-800">
                    {formatAcademicDate(spec.conference_start)}
                    {spec.conference_end ? ` – ${formatAcademicDate(spec.conference_end)}` : ""}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Call Description & Thematic Tracks */}
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Call Overview & Submission Guidelines
            </h2>

            {cfp.content ? (
              <div
                className="prose-academic"
                dangerouslySetInnerHTML={{ __html: cfp.content }}
              />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed font-serif">
                {cfp.short_description}
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
            {spec?.submission_url && (
              <a
                href={spec.submission_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs transition"
              >
                <span>Submit Paper via Conference Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {spec?.cfp_pdf_url && (
              <a
                href={spec.cfp_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CFP Guidelines PDF</span>
              </a>
            )}

            {spec?.contact_email && (
              <a
                href={`mailto:${spec.contact_email}`}
                className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email Conference Secretariat</span>
              </a>
            )}
          </div>
        </article>

        {/* Related CFPs */}
        {related.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold font-serif text-slate-900">
              Related Calls for Papers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((item) => (
                <CFPCard key={item.id} cfp={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
