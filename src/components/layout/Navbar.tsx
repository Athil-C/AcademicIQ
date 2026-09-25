"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  Lock,
  ChevronDown,
  BookOpen,
  FileText,
  FileCode,
  Coins,
  Award,
  Compass,
  Briefcase,
  Calendar,
  Layers,
  Video,
  BookmarkCheck,
  Cpu,
  Globe,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { GlobalSearchModal } from "@/components/search/GlobalSearchModal";

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ElementType;
  description?: string;
}

interface NavHub {
  label: string;
  href: string;
  items?: DropdownItem[];
}

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change without triggering useEffect setState warnings
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }

  const navHubs: NavHub[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Research",
      href: "/research",
      items: [
        { label: "Research Papers", href: "/research-papers", icon: BookOpen, description: "Peer-reviewed studies & pre-prints" },
        { label: "Articles & Essays", href: "/articles", icon: FileText, description: "Scholarly commentary & perspectives" },
        { label: "Working Papers", href: "/research?type=WORKING_PAPER", icon: FileCode, description: "Preliminary empirical findings" },
      ],
    },
    {
      label: "Opportunities",
      href: "/opportunities",
      items: [
        { label: "Funding & Grants", href: "/funding", icon: Coins, description: "Project, travel & institutional grants" },
        { label: "Fellowships", href: "/fellowships", icon: Award, description: "Postdoctoral & residency fellowships" },
        { label: "Research Positions", href: "/opportunities", icon: Compass, description: "Assistantships & faculty openings" },
      ],
    },
    {
      label: "Events",
      href: "/events",
      items: [
        { label: "Conferences & CFPs", href: "/conferences", icon: Calendar, description: "Global academic symposia & summits" },
        { label: "Calls for Papers", href: "/cfps", icon: Globe, description: "Active journal & volume deadlines" },
        { label: "Workshops", href: "/workshops", icon: Layers, description: "Methodological hands-on masterclasses" },
        { label: "Webinars", href: "/webinars", icon: Video, description: "Virtual lectures & panel discussions" },
      ],
    },
    {
      label: "Resources",
      href: "/resources",
      items: [
        { label: "Research Guides", href: "/resources?cat=guides", icon: BookmarkCheck, description: "Methodological frameworks & tips" },
        { label: "Methodology & Data", href: "/resources?cat=methods", icon: Cpu, description: "Qualitative & quantitative toolkits" },
        { label: "Academic Resources", href: "/resources", icon: FileText, description: "Publishing & citation handbooks" },
      ],
    },
    {
      label: "SSRF",
      href: "/communities/ssrf",
      items: [
        { label: "About SSRF", href: "/communities/ssrf", icon: Sparkles, description: "Social Sciences Research Forum hub" },
        { label: "SSRF Articles", href: "/articles?tag=ssrf", icon: FileText, description: "Forum essays & disciplinary debates" },
        { label: "SSRF CFPs", href: "/cfps?tag=ssrf", icon: Globe, description: "SSRF conference tracks & calls" },
        { label: "SSRF Events", href: "/conferences?tag=ssrf", icon: Calendar, description: "Annual forum symposia & roundtables" },
      ],
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-900 transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-slate-950 font-serif">
                    Academ<span className="text-blue-700">IQ</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 -mt-1">
                    Research & CFP Network
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation with Hub Dropdowns */}
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
              {navHubs.map((hub) => {
                const hasDropdown = Boolean(hub.items && hub.items.length > 0);
                const isCurrentHubActive =
                  hub.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(hub.href) ||
                      hub.items?.some((item) => pathname.startsWith(item.href.split("?")[0]));

                if (!hasDropdown) {
                  return (
                    <Link
                      key={hub.label}
                      href={hub.href}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                        isCurrentHubActive
                          ? "text-blue-700 bg-blue-50/80 font-semibold"
                          : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                      )}
                    >
                      {hub.label}
                    </Link>
                  );
                }

                const isOpen = openDropdown === hub.label;

                return (
                  <div
                    key={hub.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(hub.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={hub.href}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors",
                        isCurrentHubActive || isOpen
                          ? "text-blue-700 bg-blue-50/80 font-semibold"
                          : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                      )}
                      onClick={(e) => {
                        // Allow clicking directly to hub or toggle on mobile
                      }}
                    >
                      <span>{hub.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 opacity-60 transition-transform duration-200",
                          isOpen ? "rotate-180" : ""
                        )}
                      />
                    </Link>

                    {/* Dropdown Menu */}
                    {isOpen && hub.items && (
                      <div className="absolute left-0 mt-0.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 pb-1.5 mb-1 border-b border-slate-100 flex items-center justify-between">
                          <Link
                            href={hub.href}
                            className="text-xs font-bold text-blue-700 hover:underline uppercase tracking-wider"
                          >
                            Explore {hub.label} Hub →
                          </Link>
                        </div>
                        {hub.items.map((item) => {
                          const Icon = item.icon;
                          const isItemActive = pathname === item.href.split("?")[0];
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              className={cn(
                                "flex items-start gap-2.5 px-3 py-2 rounded-lg mx-1.5 transition text-left group",
                                isItemActive ? "bg-blue-50/70" : "hover:bg-slate-50"
                              )}
                            >
                              <div className="p-1 rounded bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-700 shrink-0 transition">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-700 transition">
                                  {item.label}
                                </div>
                                {item.description && (
                                  <p className="text-[10px] text-slate-400 line-clamp-1 leading-snug">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action Tools */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Quick Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-center sm:justify-start gap-2 h-9 w-9 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl sm:rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100 text-xs transition active:scale-95 cursor-pointer"
                title="Search AcademIQ (Cmd + K)"
                aria-label="Search AcademIQ"
              >
                <Search className="w-4 h-4 text-slate-500 sm:text-slate-400" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white border border-slate-200 rounded-sm">
                  ⌘K
                </kbd>
              </button>

              {/* Admin Portal Gateway */}
              <Link
                href="/admin/dashboard"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin</span>
              </Link>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 active:scale-95 transition-all lg:hidden cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
            {/* Mobile Quick Search Bar inside drawer */}
            <div className="pb-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-medium active:scale-[0.99] transition"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-600" />
                  <span>Search all papers, CFPs, grants...</span>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                  Tap to search
                </span>
              </button>
            </div>

            <div className="space-y-1">
              {navHubs.map((hub) => (
                <div key={hub.label} className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
                  <Link
                    href={hub.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm font-bold text-slate-900 hover:text-blue-700"
                  >
                    <span>{hub.label}</span>
                    <span className="text-[10px] text-blue-600 font-semibold">View Hub →</span>
                  </Link>
                  {hub.items && (
                    <div className="grid grid-cols-1 gap-1 pt-2 border-t border-slate-200/50 mt-1.5">
                      {hub.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:text-blue-700 hover:bg-white rounded-lg transition active:bg-blue-50"
                          >
                            <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200/80">
              <Link
                href="/admin/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-blue-900 font-semibold transition active:scale-[0.99]"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin CMS Portal</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

