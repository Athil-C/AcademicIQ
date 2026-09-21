import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { Sparkles, Download, FileCheck, ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const item = await repository.getContentBySlug(slug);

  if (!item) return { title: "Resource Not Found" };

  return {
    title: `${item.title} | AcademIQ`,
    description: item.short_description || "",
  };
}

export default async function ResourceDetailPage({
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

  const spec = item.resource;

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/resources" className="hover:text-blue-700 flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources
          </Link>
          <span>/</span>
          <span className="text-slate-700 truncate">{item.title}</span>
        </div>

        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-100 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {spec?.resource_type || "Resource Toolkit"}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950 leading-tight">
              {item.title}
            </h1>

            {spec?.author_org && (
              <p className="text-xs text-slate-600 font-medium">
                Curated by {spec.author_org}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">File Format</span>
              <span className="font-bold text-slate-900 font-mono">{spec?.file_format || "PDF"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Package Size</span>
              <span className="font-semibold text-slate-800 font-mono">{spec?.file_size || "1.2 MB"}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold font-serif text-slate-900">Resource Summary & Usage</h2>
            {item.content ? (
              <div className="prose-academic" dangerouslySetInnerHTML={{ __html: item.content }} />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed font-serif">{item.short_description}</p>
            )}
          </div>

          {spec?.download_url && (
            <div className="pt-6 border-t border-slate-100">
              <a
                href={spec.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Resource Package ({spec.file_format || "PDF"})</span>
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
