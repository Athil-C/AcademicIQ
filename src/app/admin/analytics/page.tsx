import { getContentRepository } from "@/lib/data";
import {
  BarChart3,
  TrendingUp,
  Download,
  Eye,
  Megaphone,
  FileText,
  Globe,
  Share2,
} from "lucide-react";

export default async function AdminAnalyticsPage() {
  const repository = getContentRepository();
  const { items: papers } = await repository.getContentList({ type: "RESEARCH_PAPER", limit: 5 });
  const { items: cfps } = await repository.getContentList({ type: "CFP", limit: 5 });

  const metrics = [
    { label: "Scholarly Page Views (30d)", value: "148,290", change: "+18.4%", icon: Eye },
    { label: "Research Paper Downloads", value: "34,810", change: "+24.2%", icon: Download },
    { label: "CFP Submission Clicks", value: "12,940", change: "+9.1%", icon: Megaphone },
    { label: "Institutional Referrals", value: "8,420", change: "+14.6%", icon: Globe },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">Academic Analytics & Engagement</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Discovery telemetry, paper downloads, CFP clicks, and institutional referral tracking.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">{m.label}</span>
                <Icon className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-serif">{m.value}</div>
              <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{m.change} vs previous month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tables: Top Papers & Top CFPs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Downloaded Papers */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-600" />
            Most Downloaded Research Papers
          </h3>

          <div className="divide-y divide-slate-100">
            {papers.map((p, index) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {index + 1}. {p.title}
                  </p>
                  <span className="text-[11px] text-slate-400 font-mono">
                    DOI: {p.research_paper?.doi || "10.1080/example.2026"}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-700 font-mono shrink-0">
                  {(3400 - index * 620).toLocaleString()} DLs
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed CFPs */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-blue-600" />
            Top Viewed Calls for Papers (CFPs)
          </h3>

          <div className="divide-y divide-slate-100">
            {cfps.map((c, index) => (
              <div key={c.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {index + 1}. {c.title}
                  </p>
                  <span className="text-[11px] text-slate-400">
                    {c.cfp?.organizing_institution || "Academic Institution"}
                  </span>
                </div>
                <span className="text-xs font-bold text-blue-700 font-mono shrink-0">
                  {(2900 - index * 480).toLocaleString()} views
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
