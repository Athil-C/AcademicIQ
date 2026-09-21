import { getDataMode } from "@/lib/data";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface StatusBannerProps {
  minimal?: boolean;
}

export function StatusBanner({ minimal }: StatusBannerProps) {
  const mode = getDataMode();
  const isDemo = mode === "DEMO";

  if (minimal) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200">
        <span
          className={`w-2 h-2 rounded-full ${
            isDemo ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
          }`}
        />
        <span className="text-slate-600">
          Supabase:{" "}
          <strong className={isDemo ? "text-amber-700 font-semibold" : "text-emerald-700 font-semibold"}>
            {isDemo ? "Demo Mode" : "Connected"}
          </strong>
        </span>
      </div>
    );
  }

  if (!isDemo) {
    return (
      <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs text-emerald-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Production Mode:</strong> Connected to live Supabase backend. Row Level Security active.
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-700 font-semibold">
          ENV: CONNECTED
        </span>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Demo Mode:</strong> Supabase credentials are not configured. Using bundled academic dataset. Administrative mutations are preview-only.
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/admin/settings"
          className="underline font-semibold hover:text-amber-950 text-[11px]"
        >
          View Connection Instructions
        </Link>
        <span className="px-2 py-0.5 rounded bg-amber-200/80 font-mono text-[10px] font-bold text-amber-900">
          ENV: DEMO
        </span>
      </div>
    </div>
  );
}
