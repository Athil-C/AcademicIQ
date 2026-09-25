"use client";

import { useState, useRef } from "react";
import { Search, ArrowRight, X, BookOpen, Megaphone, Calendar, Coins, Award, Layers } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CategoryChip {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}

const CATEGORIES: CategoryChip[] = [
  { id: "", label: "All Categories", shortLabel: "All", icon: Search },
  { id: "RESEARCH_PAPER", label: "Research Papers", shortLabel: "Papers", icon: BookOpen },
  { id: "CFP", label: "Calls for Papers", shortLabel: "CFPs", icon: Megaphone },
  { id: "CONFERENCE", label: "Conferences", shortLabel: "Conferences", icon: Calendar },
  { id: "FUNDING", label: "Grants & Funding", shortLabel: "Grants", icon: Coins },
  { id: "FELLOWSHIP", label: "Fellowships", shortLabel: "Fellowships", icon: Award },
  { id: "WORKSHOP", label: "Workshops", shortLabel: "Workshops", icon: Layers },
];

export function HeroSearch() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      {/* ========================================================= */}
      {/* MOBILE SEARCH EXPERIENCE (Optimized for one-thumb usability) */}
      {/* ========================================================= */}
      <div className="block sm:hidden space-y-2.5">
        {/* Horizontal Category Pill Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedType === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedType(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95 cursor-pointer",
                  isSelected
                    ? "bg-blue-700 text-white shadow-xs shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/90"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isSelected ? "text-white" : "text-slate-400")} />
                <span>{cat.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Unified Mobile Search Input Bar with Embedded Submit Action */}
        <form
          action="/search"
          method="GET"
          className="relative flex items-center bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/90 p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
        >
          <input type="hidden" name="type" value={selectedType} />

          <div className="pl-2.5 pr-1 text-slate-400">
            <Search className="w-4 h-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              selectedType === "RESEARCH_PAPER"
                ? "Search peer-reviewed papers..."
                : selectedType === "CFP"
                ? "Search active calls for papers..."
                : selectedType === "CONFERENCE"
                ? "Search academic conferences..."
                : selectedType === "FUNDING"
                ? "Search grants & funding..."
                : "Search papers, CFPs, funding..."
            }
            className="w-full py-2 px-2 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />

          {/* Quick Clear Button when typing */}
          {query.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Embedded Mobile Submit Button */}
          <button
            type="submit"
            aria-label="Submit search"
            className="h-9 px-3.5 bg-slate-950 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs shrink-0 active:scale-95 cursor-pointer ml-1"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP SEARCH BAR (100% Preserved from original desktop UI) */}
      {/* ========================================================= */}
      <div className="hidden sm:block bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200">
        <form action="/search" method="GET" className="flex flex-row items-center gap-2">
          {/* Category Scope Selector */}
          <div className="relative shrink-0">
            <select
              name="type"
              aria-label="Search scope"
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            >
              <option value="">All Categories</option>
              <option value="RESEARCH_PAPER">Research Papers</option>
              <option value="CFP">Calls for Papers</option>
              <option value="CONFERENCE">Conferences</option>
              <option value="FUNDING">Grants & Funding</option>
              <option value="FELLOWSHIP">Fellowships</option>
              <option value="WORKSHOP">Workshops</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              name="q"
              placeholder="Search papers, CFPs, conferences, funding..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-950 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
