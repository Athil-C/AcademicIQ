import { getContentRepository } from "@/lib/data";
import { CFPCard } from "@/components/cards/CFPCard";
import { ResearchPaperCard } from "@/components/cards/ResearchPaperCard";
import { ConferenceCard } from "@/components/cards/ConferenceCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ResourceCard } from "@/components/cards/ResourceCard";
import {
  Sparkles,
  BookOpen,
  Megaphone,
  Calendar,
  Users,
  Award,
  Globe,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default async function SSRFCommunityPage() {
  const repository = getContentRepository();

  const [papers, cfps, conferences, articles, resources] = await Promise.all([
    repository.getContentList({ category: "social-sciences", type: "RESEARCH_PAPER", limit: 3 }),
    repository.getContentList({ category: "social-sciences", type: "CFP", limit: 3 }),
    repository.getContentList({ category: "social-sciences", type: "CONFERENCE", limit: 2 }),
    repository.getContentList({ category: "social-sciences", type: "ARTICLE", limit: 2 }),
    repository.getContentList({ type: "RESOURCE", limit: 2 }),
  ]);

  const focusAreas = [
    { title: "Political Science", desc: "Governance, democratic institutions, and electoral behavior." },
    { title: "Sociology", desc: "Social movements, collective identity, and welfare state models." },
    { title: "Anthropology", desc: "Field ethnography, material culture, and indigenous methodologies." },
    { title: "Economics", desc: "Microeconometrics, sovereign resilience, and public finance." },
    { title: "International Relations", desc: "Multilateral diplomacy, peacebuilding, and geoeconomics." },
    { title: "Public Policy", desc: "Regulatory design, civic technology, and program evaluation." },
    { title: "Development Studies", desc: "South-South cooperation, climate adaptation, and community equity." },
    { title: "Interdisciplinary Studies", desc: "Epistemological synthesis bridging technology and humanities." },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* SSRF Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>An Initiative of AcademIQ – Research & CFP Network</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif text-white tracking-tight">
            Social Sciences Research Forum
          </h1>

          <p className="text-amber-200/90 font-medium text-base sm:text-lg max-w-2xl mx-auto">
            A scholarly community dedicated to research-driven discussion, epistemic justice,
            and academic exchange across the social disciplines.
          </p>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
            Convened within the AcademIQ Network, SSRF provides open-access dissemination,
            specialized colloquium calls, travel grant programs, and cross-border working groups
            for postgraduate scholars and institutional faculties.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="#working-papers"
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition"
            >
              Working Papers & Research
            </a>
            <a
              href="#ssrf-cfps"
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-xs sm:text-sm transition"
            >
              SSRF Calls for Papers
            </a>
            <a
              href="#focus-areas"
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition"
            >
              Focus Areas
            </a>
          </div>
        </div>
      </section>

      {/* Focus Areas Grid */}
      <section id="focus-areas" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Disciplinary Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Core Fields of Scholarly Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              SSRF supports rigorous quantitative, qualitative, and mixed-method scholarship across 8 key areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition space-y-2"
              >
                <h3 className="font-bold text-sm text-slate-900 font-serif">{area.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. SSRF Calls for Papers */}
      <section id="ssrf-cfps" className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Colloquium Calls
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-1">
                Social Science Calls for Papers
              </h2>
            </div>
            <Link href="/cfps" className="text-xs font-semibold text-blue-700 hover:underline">
              All Platform CFPs →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cfps.items.map((cfp) => (
              <CFPCard key={cfp.id} cfp={cfp} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. SSRF Working Papers & Research */}
      <section id="working-papers" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Peer-Reviewed Monograph Series
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-1">
                Recent Social Science Working Papers
              </h2>
            </div>
            <Link href="/research-papers" className="text-xs font-semibold text-blue-700 hover:underline">
              Full Research Archive →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {papers.items.map((paper) => (
              <ResearchPaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Symposia & Articles Dual Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Articles */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              SSRF Scholarly Essays & Discussion Pieces
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.items.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </div>

          {/* Conferences */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Featured Symposia & Conferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conferences.items.map((conf) => (
                <ConferenceCard key={conf.id} conference={conf} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
