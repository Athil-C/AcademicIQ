export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xs text-slate-700 text-xs leading-relaxed">
        <h1 className="text-3xl font-bold font-serif text-slate-900 mb-2">Privacy & Scholarly Data Policy</h1>
        <p className="text-slate-400">Last updated: September 2026</p>

        <section className="space-y-2 pt-4">
          <h2 className="text-base font-bold text-slate-900 font-serif">1. Scope and Academic Principles</h2>
          <p>
            AcademIQ is committed to privacy and ethical handling of researcher data. We collect only information
            strictly required for scholarly notification delivery, newsletter digests, and editorial authentication.
          </p>
        </section>

        <section className="space-y-2 pt-4">
          <h2 className="text-base font-bold text-slate-900 font-serif">2. Researcher Accounts & Public Information</h2>
          <p>
            Public scholarly information (author affiliations, published abstracts, ORCID identifiers, and symposium dates)
            are displayed for research dissemination purposes. Personal contact details submitted for private newsletters
            are never sold, leased, or distributed to commercial advertisers.
          </p>
        </section>

        <section className="space-y-2 pt-4">
          <h2 className="text-base font-bold text-slate-900 font-serif">3. Supabase Authentication & Storage</h2>
          <p>
            Authentication credentials and media files are stored securely via Supabase PostgreSQL and Storage buckets.
            Administrative sessions are protected with HTTP-only cookies and Row Level Security (RLS) enforcement.
          </p>
        </section>
      </div>
    </div>
  );
}
