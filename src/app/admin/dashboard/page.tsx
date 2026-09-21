import Link from "next/link";
import Image from "next/image";
import { getContentRepository } from "@/lib/data";
import {
  FileText,
  CheckCircle2,
  FileEdit,
  Clock,
  Plus,
  Upload,
  FolderTree,
  BarChart3,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const repository = getContentRepository();
  const [stats, recentItems] = await Promise.all([
    repository.getDashboardStats(),
    repository.getContentList({ limit: 4 }),
  ]);

  const topMetricCards = [
    {
      label: "Total Content",
      count: "1,248",
      realCount: stats.total,
      icon: FileText,
      iconBg: "bg-blue-50 text-blue-700",
      borderColor: "border-blue-100",
    },
    {
      label: "Published",
      count: "892",
      realCount: stats.published,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-700",
      borderColor: "border-emerald-100",
    },
    {
      label: "Drafts",
      count: "256",
      realCount: stats.drafts,
      icon: FileEdit,
      iconBg: "bg-amber-50 text-amber-700",
      borderColor: "border-amber-100",
    },
    {
      label: "Pending Review",
      count: "24",
      realCount: 24,
      icon: Clock,
      iconBg: "bg-rose-50 text-rose-700",
      borderColor: "border-rose-100",
    },
  ];

  const deadlines = [
    {
      id: "dl-1",
      month: "APR",
      day: "15",
      title: "CFP Deadline",
      subtitle: "Sustainable Development 2025",
      daysLeft: "3 days left",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      href: "/admin/cfps",
    },
    {
      id: "dl-2",
      month: "APR",
      day: "20",
      title: "Grant Application",
      subtitle: "Global Research Fund",
      daysLeft: "8 days left",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      href: "/admin/funding",
    },
    {
      id: "dl-3",
      month: "MAY",
      day: "05",
      title: "Fellowship Deadline",
      subtitle: "International Fellowship Program",
      daysLeft: "22 days left",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      href: "/admin/fellowships",
    },
    {
      id: "dl-4",
      month: "MAY",
      day: "12",
      title: "Conference Registration",
      subtitle: "Global Education Summit",
      daysLeft: "30 days left",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      href: "/admin/conferences",
    },
  ];

  const recentContentList = [
    {
      id: "rc-1",
      title: "The Impact of Social Media on Political Participation",
      type: "Research Paper",
      status: "Published",
      time: "2 days ago",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=300&auto=format&fit=crop",
      href: "/admin/research-papers",
    },
    {
      id: "rc-2",
      title: "Urbanization and Social Inequality in South Asia",
      type: "Article",
      status: "Draft",
      time: "3 days ago",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=300&auto=format&fit=crop",
      href: "/admin/articles",
    },
    {
      id: "rc-3",
      title: "Global Research Grant for Early Career Scholars",
      type: "Funding",
      status: "Published",
      time: "4 days ago",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300&auto=format&fit=crop",
      href: "/admin/funding",
    },
    {
      id: "rc-4",
      title: "Workshop on Qualitative Research Methods",
      type: "Workshop",
      status: "Draft",
      time: "1 week ago",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=300&auto=format&fit=crop",
      href: "/admin/workshops",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Welcome back! Here&apos;s what&apos;s happening on AcademIQ.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/content/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Content</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {topMetricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`bg-white p-5 rounded-xl border ${card.borderColor} shadow-2xs flex items-center justify-between transition hover:shadow-sm`}
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">
                  {card.label}
                </span>
                <div className="text-3xl font-bold font-serif text-slate-950">
                  {card.count}
                </div>
              </div>

              <div className={`p-3 rounded-xl ${card.iconBg}`}>
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle 2 Columns: Upcoming Deadlines + Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Upcoming Deadlines */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
              Upcoming Deadlines
            </h2>
            <Link
              href="/admin/cfps"
              className="text-xs text-blue-700 hover:underline font-semibold"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {deadlines.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/60 transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Calendar Date Tile */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-rose-200 bg-white shadow-2xs flex flex-col items-center shrink-0">
                    <div className="w-full bg-rose-600 text-white text-[9px] font-bold py-0.5 text-center tracking-wider uppercase">
                      {item.month}
                    </div>
                    <div className="flex-1 flex items-center justify-center text-base font-bold text-slate-900 font-serif leading-none">
                      {item.day}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="min-w-0 space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 truncate">
                      <Link href={item.href}>{item.title}</Link>
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Days left badge */}
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border shrink-0 ${item.badgeColor}`}
                >
                  {item.daysLeft}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Recent Content */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 font-serif">
              Recent Content
            </h2>
            <Link
              href="/admin/content"
              className="text-xs text-blue-700 hover:underline font-semibold"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentContentList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 truncate">
                      <Link href={item.href}>{item.title}</Link>
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{item.type}</span>
                      <span>•</span>
                      <span
                        className={
                          item.status === "Published"
                            ? "text-emerald-700 font-medium"
                            : "text-amber-700 font-medium"
                        }
                      >
                        {item.status}
                      </span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={item.href}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                  title="View item"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 font-serif">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Action 1: Add New Content */}
          <Link
            href="/admin/content/new"
            className="flex items-center justify-center gap-2.5 p-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Content</span>
          </Link>

          {/* Action 2: Upload Media */}
          <Link
            href="/admin/media"
            className="flex items-center justify-center gap-2.5 p-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Media</span>
          </Link>

          {/* Action 3: Manage Categories */}
          <Link
            href="/admin/categories"
            className="flex items-center justify-center gap-2.5 p-4 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <FolderTree className="w-4 h-4" />
            <span>Manage Categories</span>
          </Link>

          {/* Action 4: View Analytics */}
          <Link
            href="/admin/analytics"
            className="flex items-center justify-center gap-2.5 p-4 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <BarChart3 className="w-4 h-4" />
            <span>View Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
