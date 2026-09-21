"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Megaphone,
  Calendar,
  Compass,
  Coins,
  Award,
  BookOpen,
  Video,
  Layers,
  Sparkles,
  FolderTree,
  Tags,
  Image as ImageIcon,
  Library,
  Users,
  BarChart3,
  ShieldAlert,
  Settings,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function AdminSidebar() {
  const pathname = usePathname();

  const contentItems = [
    { href: "/admin/content", label: "All Content", icon: FileText },
    { href: "/admin/papers", label: "Research Papers", icon: FileText },
    { href: "/admin/cfps", label: "CFPs", icon: Megaphone },
    { href: "/admin/conferences", label: "Conferences", icon: Calendar },
    { href: "/admin/opportunities", label: "Opportunities", icon: Compass },
    { href: "/admin/funding", label: "Funding", icon: Coins },
    { href: "/admin/fellowships", label: "Fellowships", icon: Award },
    { href: "/admin/workshops", label: "Workshops", icon: Layers },
    { href: "/admin/webinars", label: "Webinars", icon: Video },
    { href: "/admin/articles", label: "Articles", icon: BookOpen },
    { href: "/admin/resources", label: "Resources", icon: Sparkles },
  ];

  const taxonomyItems = [
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/tags", label: "Tags", icon: Tags },
  ];

  const mediaItems = [
    { href: "/admin/media", label: "Media Library", icon: ImageIcon },
    { href: "/admin/galleries", label: "Galleries", icon: Library },
  ];

  const systemItems = [
    { href: "/admin/users", label: "Users & Roles", icon: Users },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/audit-logs", label: "Audit Logs", icon: ShieldAlert },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-bold text-white tracking-tight font-serif text-lg">
            Academ<span className="text-blue-400">IQ</span>
          </span>
        </Link>
        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
          CMS
        </span>
      </div>

      {/* Quick Action */}
      <div className="p-4 border-b border-slate-800/80">
        <Link
          href="/admin/content/new"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Content</span>
        </Link>
      </div>

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs">
        {/* Dashboard */}
        <div>
          <Link
            href="/admin/dashboard"
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition",
              pathname === "/admin/dashboard"
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-1">
            Content
          </div>
          {contentItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition",
                  isActive
                    ? "bg-slate-800 text-blue-400 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Taxonomy */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-1">
            Taxonomy
          </div>
          {taxonomyItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition",
                  isActive
                    ? "bg-slate-800 text-blue-400 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Media */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-1">
            Media
          </div>
          {mediaItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition",
                  isActive
                    ? "bg-slate-800 text-blue-400 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* System */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-1">
            System
          </div>
          {systemItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition",
                  isActive
                    ? "bg-slate-800 text-blue-400 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Return to Public Platform */}
      <div className="p-3 border-t border-slate-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition"
        >
          <span>View Public AcademIQ</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
