import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { formatAcademicDate } from "@/lib/utils/deadline";
import { generateEventSchema } from "@/lib/seo/structured-data";
import { ConferenceCard } from "@/components/cards/ConferenceCard";
import {
  Calendar,
  MapPin,
  Globe,
  ExternalLink,
  ArrowLeft,
  Mail,
  UserCheck,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const conference = await repository.getContentBySlug(slug);

  if (!conference) return { title: "Conference Not Found" };

  return {
    title: `${conference.title} | AcademIQ`,
    description: conference.short_description || conference.conference?.theme || "",
    openGraph: {
      title: conference.title,
      description: conference.short_description || "",
      type: "article",
    },
  };
}

export default async function ConferenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repository = getContentRepository();
  const conference = await repository.getContentBySlug(slug);

  if (!conference) {
    notFound();
  }

  const spec = conference.conference;
  const related = await repository.getRelatedContent(conference, 3);
  const jsonLd = generateEventSchema(conference);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-10 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/conferences" className="hover:text-blue-700 flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Conferences
            </Link>
            <span>/</span>
            <span className="text-slate-700 truncate">{conference.title}</span>
          </div>

          <article className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
            <div className="space-y-3 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-100 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Academic Conference
                </span>
                {spec?.mode && (
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {spec.mode}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-slate-950 leading-tight">
                {conference.title}
              </h1>

              {spec?.theme && (
                <p className="text-sm text-slate-700 font-medium">
                  <span className="text-slate-500">Theme: </span>
                  {spec.theme}
                </p>
              )}

              {spec?.organizer && (
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Convened by {spec.organizer}</span>
                </div>
              )}
            </div>

            {/* Conference Dates & Location Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Start Date</span>
                <span className="font-bold text-slate-900 text-sm">
                  {formatAcademicDate(spec?.start_date)}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">End Date</span>
                <span className="font-semibold text-slate-800">
                  {formatAcademicDate(spec?.end_date)}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="font-semibold text-slate-800 truncate block">
                  {spec?.city ? `${spec.city}, ` : ""}
                  {spec?.country || conference.country}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Venue</span>
                <span className="font-semibold text-slate-800 truncate block">
                  {spec?.venue || "University Campus"}
                </span>
              </div>
            </div>

            {/* Content & Schedule Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-serif text-slate-900">Conference Overview</h2>
              {conference.content ? (
                <div
                  className="prose-academic"
                  dangerouslySetInnerHTML={{ __html: conference.content }}
                />
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed font-serif">
                  {conference.short_description}
                </p>
              )}
            </div>

            {/* Registration Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
              {spec?.registration_url && (
                <a
                  href={spec.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs transition"
                >
                  <span>Register for Conference</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {spec?.website && (
                <a
                  href={spec.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Official Conference Website</span>
                </a>
              )}
            </div>
          </article>

          {/* Related Conferences */}
          {related.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold font-serif text-slate-900">Related Academic Conferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((item) => (
                  <ConferenceCard key={item.id} conference={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
