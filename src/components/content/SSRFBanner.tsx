import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Megaphone, Calendar, Users } from "lucide-react";

export function SSRFBanner() {
  const focusAreas = [
    "Political Science",
    "Sociology",
    "Anthropology",
    "History",
    "Economics",
    "International Relations",
    "Development Studies",
    "Public Policy",
    "Interdisciplinary Studies",
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-8 sm:p-12 border border-slate-700 shadow-xl">
      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Flagship Scholarly Initiative</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-serif text-white">
            Social Sciences Research Forum (SSRF)
          </h2>
          <p className="text-amber-200/90 font-medium text-sm sm:text-base">
            An Initiative of AcademIQ – Research & CFP Network
          </p>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          SSRF is a global scholarly community dedicated to research-driven discussion,
          epistemic justice, and academic exchange across the social disciplines. It connects
          working papers, specialized Call for Papers, methodological workshops, and regional
          symposiums for international researchers.
        </p>

        {/* Focus Areas Pills */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block">
            Core Fields of Inquiry:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-md transition"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            href="/communities/ssrf"
            className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm inline-flex items-center gap-2 shadow-sm transition"
          >
            <span>Explore SSRF Community Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/cfps?category=social-sciences"
            className="px-4 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white text-sm font-medium border border-slate-600 inline-flex items-center gap-1.5 transition"
          >
            <Megaphone className="w-4 h-4 text-amber-400" />
            <span>Social Science CFPs</span>
          </Link>
        </div>
      </div>

      {/* Subtle background graphic */}
      <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
