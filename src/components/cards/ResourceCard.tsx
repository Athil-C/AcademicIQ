import Link from "next/link";
import { FullContentItem } from "@/types";
import { Sparkles, Download, FileCheck, ArrowRight } from "lucide-react";

interface ResourceCardProps {
  resource: FullContentItem;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const spec = resource.resource;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {spec?.resource_type || "Resource"}
          </span>
          {spec?.file_format && (
            <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              {spec.file_format} {spec.file_size ? `• ${spec.file_size}` : ""}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition font-serif leading-snug">
          <Link href={`/resources/${resource.slug}`}>
            {resource.title}
          </Link>
        </h3>

        {spec?.author_org && (
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <FileCheck className="w-3 h-3 text-slate-400" />
            <span>Curated by: {spec.author_org}</span>
          </p>
        )}

        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {resource.short_description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <Link
          href={`/resources/${resource.slug}`}
          className="font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:underline"
        >
          View Resource Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {spec?.download_url && (
          <a
            href={spec.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        )}
      </div>
    </div>
  );
}
