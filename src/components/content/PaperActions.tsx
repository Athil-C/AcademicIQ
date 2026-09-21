"use client";

import { useState } from "react";
import { Download, Quote, Share2, Check, Copy, X } from "lucide-react";

interface PaperActionsProps {
  pdfUrl?: string;
  doi?: string;
  title: string;
  authors?: string[];
  journal?: string;
  year?: string;
}

export function PaperActions({
  pdfUrl,
  doi,
  title,
  authors = [],
  journal,
  year = "2025",
}: PaperActionsProps) {
  const [copied, setCopied] = useState(false);
  const [showCiteModal, setShowCiteModal] = useState(false);
  const [citationFormat, setCitationFormat] = useState<"APA" | "BibTeX">("APA");
  const [citationCopied, setCitationCopied] = useState(false);

  const authorString = authors.length > 0 ? authors.join(", ") : "Wilson, J., & Lopez, M.";
  const apaCitation = `${authorString} (${year}). ${title}. ${journal || "Journal of Political Science"}${doi ? `, https://doi.org/${doi}` : ""}`;
  const bibtexCitation = `@article{academiq_${year}_${title.slice(0, 10).toLowerCase().replace(/[^a-z0-9]/g, "")},
  title={${title}},
  author={${authorString}},
  journal={${journal || "Journal of Political Science"}},
  year={${year}}${doi ? `,\n  doi={${doi}}` : ""}
}`;

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyCitation = async () => {
    const text = citationFormat === "APA" ? apaCitation : bibtexCitation;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCitationCopied(true);
      setTimeout(() => setCitationCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* Download PDF */}
        <a
          href={pdfUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xs transition"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </a>

        {/* Cite */}
        <button
          type="button"
          onClick={() => setShowCiteModal(true)}
          className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition bg-white"
        >
          <Quote className="w-4 h-4 text-slate-500" />
          <span>Cite</span>
        </button>

        {/* Share */}
        <button
          type="button"
          onClick={handleShare}
          className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition bg-white"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Citation Modal */}
      {showCiteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Quote className="w-4 h-4 text-blue-700" />
                Cite This Paper
              </h3>
              <button
                type="button"
                onClick={() => setShowCiteModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCitationFormat("APA")}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  citationFormat === "APA"
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                APA
              </button>
              <button
                type="button"
                onClick={() => setCitationFormat("BibTeX")}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  citationFormat === "BibTeX"
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                BibTeX
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 break-words whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
              {citationFormat === "APA" ? apaCitation : bibtexCitation}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition"
              >
                {citationCopied ? (
                  <>
                    <Check className="w-4 h-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Citation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
