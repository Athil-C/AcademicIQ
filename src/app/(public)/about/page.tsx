import { GraduationCap, ShieldCheck, Globe, BookOpen, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-2 shadow-md">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
            About AcademIQ
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connecting Scholars with Opportunities. Building transparent, open, and global academic discovery infrastructure.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 sm:p-12 space-y-8 text-slate-700 leading-relaxed text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-slate-900">Institutional Mission</h2>
            <p>
              AcademIQ was established to resolve the friction between scholarly discovery and academic mobility.
              Researchers, PhD candidates, and institutional faculties often struggle across fragmented platforms to track
              Calls for Papers, specialized conference tracks, competitive research grants, and postdoctoral residencies.
            </p>
            <p>
              By combining normalized academic discovery with persistent DOI cataloging, human-centered deadline tracking,
              and open collaboration forums, AcademIQ empowers scholars to discover relevant opportunities and disseminate rigorous research.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-xl font-bold font-serif text-slate-900">The SSRF Flagship Initiative</h2>
            <p>
              As part of our commitment to epistemic pluralism and South-North academic symmetry, AcademIQ hosts the{" "}
              <strong>Social Sciences Research Forum (SSRF)</strong>. SSRF fosters interdisciplinary dialogues, qualitative
              fieldwork ethics, and working paper colloquiums to ensure scholars from emerging regions gain visible global platforms.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-xl font-bold font-serif text-slate-900">Editorial Standards & Non-Commercial Independence</h2>
            <p>
              AcademIQ operates under strict scholarly validation criteria. We reject predatory journals, unverified conferences,
              and opaque fee structures. Every Call for Papers and research grant undergoes rigorous editorial verification
              before publication to our global network.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
