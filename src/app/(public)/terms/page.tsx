export default function TermsOfUsePage() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xs text-slate-700 text-xs leading-relaxed">
        <h1 className="text-3xl font-bold font-serif text-slate-900 mb-2">Terms of Research & Platform Use</h1>
        <p className="text-slate-400">Last updated: September 2026</p>

        <section className="space-y-2 pt-4">
          <h2 className="text-base font-bold text-slate-900 font-serif">1. Academic Non-Commercial Integrity</h2>
          <p>
            AcademIQ is intended for researchers, students, and academic institutions. By accessing the platform, users agree
            not to scrape content for malicious purposes, spam editorial contacts, or misrepresent institutional affiliations.
          </p>
        </section>

        <section className="space-y-2 pt-4">
          <h2 className="text-base font-bold text-slate-900 font-serif">2. Calls for Papers & Opportunity Accuracy</h2>
          <p>
            While AcademIQ verifies calls for papers and research grants through verified organizing committees, users are
            encouraged to inspect official conference portals and institutional host terms prior to submitting financial or sensitive manuscript data.
          </p>
        </section>

        <section className="space-y-2 pt-4">
          <h2 className="text-base font-bold text-slate-900 font-serif">3. Intellectual Property & Open Access</h2>
          <p>
            Authors retain ownership of their intellectual property, working papers, and published research.
            Citations and abstracts published on AcademIQ follow fair academic attribution standards.
          </p>
        </section>
      </div>
    </div>
  );
}
