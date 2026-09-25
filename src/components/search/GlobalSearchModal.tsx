"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, BookOpen, Megaphone, Calendar } from "lucide-react";
import { ContentTypeBadge } from "@/components/content/ContentTypeBadge";
import { FullContentItem } from "@/types";
import { getContentPath } from "@/lib/utils/routes";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FullContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
          const evt = new CustomEvent("open-search-modal");
          window.dispatchEvent(evt);
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }

  useEffect(() => {
    if (!isOpen || !query.trim()) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.items || []);
        }
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            className="w-full text-slate-900 placeholder-slate-400 bg-transparent border-none text-base focus:outline-hidden"
            placeholder="Search papers, CFPs, conferences, funding, authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-2">
          {loading && (
            <div className="py-8 text-center text-sm text-slate-500">
              Searching scholarly network...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="py-8 text-center text-sm text-slate-500">
              No matching academic records found for &ldquo;{query}&rdquo;.
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-1">
              {results.map((item) => {
                const targetPath = getContentPath(item);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onClose();
                      router.push(targetPath);
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors flex items-start gap-3 group"
                  >
                    <div className="mt-0.5">
                      <ContentTypeBadge type={item.content_type} showIcon={false} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 truncate">
                        {item.title}
                      </h4>
                      {item.short_description && (
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {item.short_description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-700 shrink-0 self-center transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          )}

          {!query && (
            <div className="p-4 text-xs text-slate-500">
              <p className="font-medium text-slate-700 mb-2">Suggested Academic Searches:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setQuery("Democratic Innovations")}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  <Megaphone className="w-3 h-3 inline mr-1 text-blue-600" />
                  Democratic Innovations
                </button>
                <button
                  onClick={() => setQuery("Deliberative Norms")}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  <BookOpen className="w-3 h-3 inline mr-1 text-indigo-600" />
                  Deliberative Norms
                </button>
                <button
                  onClick={() => setQuery("SSRF Annual Colloquium")}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  <Calendar className="w-3 h-3 inline mr-1 text-sky-600" />
                  SSRF Colloquium
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        {query && (
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Press Enter to explore all results</span>
            <button
              onClick={() => {
                onClose();
                router.push(`/search?q=${encodeURIComponent(query)}`);
              }}
              className="text-blue-700 font-medium hover:underline flex items-center gap-1"
            >
              Full Search View <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
