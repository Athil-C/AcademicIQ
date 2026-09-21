import { isSupabaseConfigured, getSupabaseConfig } from "@/lib/supabase/config";
import { ShieldCheck, Database, HardDrive, Lock, AlertTriangle, Key } from "lucide-react";

export default function AdminSettingsPage() {
  const isConfigured = isSupabaseConfigured();
  const config = getSupabaseConfig();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">System Infrastructure & Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Backend configuration, Supabase PostgreSQL status, Storage policies, and environment inspector.
        </p>
      </div>

      {/* Connection Status Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-700" />
            Backend Connection Status
          </span>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              isConfigured
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-amber-50 text-amber-900 border border-amber-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isConfigured ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
              }`}
            />
            {isConfigured ? "Connected (Production)" : "Demo Mode Active"}
          </span>
        </h3>

        {isConfigured ? (
          <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Supabase Backend is Live & Synchronized
            </p>
            <p>
              Target Supabase Project Endpoint: <code className="font-mono bg-emerald-100/80 px-1 py-0.5 rounded">{config.url}</code>
            </p>
            <p className="text-emerald-800">
              Row Level Security is enforcing read/write permissions. Administrative role verification is active.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-3">
            <p className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Running in Standalone Demo Mode
            </p>
            <p className="leading-relaxed">
              Supabase environment variables (<code className="font-mono bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="font-mono bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>) have not been provided yet.
              The application is serving the bundled academic dataset. Administrative mutations are previewed in memory.
            </p>

            <div className="pt-2 border-t border-amber-200/80">
              <p className="font-bold mb-1">To Connect Your Live Supabase Project:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-800">
                <li>Create a free project at <span className="font-mono">supabase.com</span></li>
                <li>Run the SQL schema in <code className="font-mono bg-amber-100 px-1">supabase/schema.sql</code> in the Supabase SQL Editor</li>
                <li>(Optional) Run <code className="font-mono bg-amber-100 px-1">supabase/seed.sql</code> to seed initial academic data</li>
                <li>Add your Project URL and Anon Key into <code className="font-mono bg-amber-100 px-1">.env.local</code></li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Storage Buckets Setup */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-slate-700" />
          Supabase Storage Buckets & Policies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
            <div className="font-bold text-slate-900 font-mono">academiq-images</div>
            <p className="text-slate-500">Posters, banners, logos, and author avatars. Max 5MB.</p>
            <span className="text-[10px] text-emerald-700 font-semibold uppercase">Public Read • Staff Write</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
            <div className="font-bold text-slate-900 font-mono">academiq-pdfs</div>
            <p className="text-slate-500">Research papers, CFPs, and call guidelines. Max 15MB.</p>
            <span className="text-[10px] text-emerald-700 font-semibold uppercase">Public Read • Staff Write</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
            <div className="font-bold text-slate-900 font-mono">academiq-documents</div>
            <p className="text-slate-500">Grant documentation, datasets, and templates. Max 15MB.</p>
            <span className="text-[10px] text-emerald-700 font-semibold uppercase">Public Read • Staff Write</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
            <div className="font-bold text-slate-900 font-mono">academiq-media</div>
            <p className="text-slate-500">General multimedia assets and conference recordings.</p>
            <span className="text-[10px] text-emerald-700 font-semibold uppercase">Public Read • Staff Write</span>
          </div>
        </div>
      </div>

      {/* Security Principles */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-700" />
          Security Architecture Guarantee
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          AcademIQ uses a zero-trust client model: client credentials only have public read permissions on published content.
          All administrative operations enforce server-side role validation (<code className="font-mono text-slate-800">ADMIN</code> or <code className="font-mono text-slate-800">EDITOR</code>).
          The <code className="font-mono text-slate-800">SUPABASE_SERVICE_ROLE_KEY</code> is strictly isolated to server runtimes.
        </p>
      </div>
    </div>
  );
}
