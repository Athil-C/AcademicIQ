"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Mail, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFeedback(data.message || "Thank you for subscribing to AcademIQ Research Alerts.");
        setEmail("");
      } else {
        setStatus("error");
        setFeedback(data.message || "Could not subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                Academ<span className="text-blue-400">IQ</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AcademIQ is a global scholarly discovery and publication network connecting
              researchers, postgraduate fellows, and institutional faculties with peer-reviewed
              research, Calls for Papers, funding opportunities, and international conferences.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent Open Academic Information Infrastructure</span>
            </div>
          </div>

          {/* Column 2: Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Scholarly Discovery
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/research-papers" className="hover:text-white transition">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="/cfps" className="hover:text-white transition">
                  Calls for Papers (CFPs)
                </Link>
              </li>
              <li>
                <Link href="/conferences" className="hover:text-white transition">
                  Academic Conferences
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white transition">
                  Research Opportunities
                </Link>
              </li>
              <li>
                <Link href="/funding" className="hover:text-white transition">
                  Grants & Fellowships
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: SSRF & Communities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Community & Forums
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/communities/ssrf"
                  className="text-amber-400 hover:text-amber-300 font-medium transition"
                >
                  SSRF Research Forum
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition">
                  Scholarly Articles
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="hover:text-white transition">
                  Methods Workshops
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition">
                  Research Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Editorial Advisory Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Scholarly Digest
            </h4>
            <p className="text-xs text-slate-400">
              Receive curated CFP deadlines, research grants, and peer-reviewed working papers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="university.email@domain.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-md flex items-center transition"
                  aria-label="Subscribe"
                >
                  {status === "submitting" ? (
                    <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}
              {status === "error" && (
                <div className="text-[11px] text-rose-400 mt-1">{feedback}</div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Legal & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AcademIQ — Research & CFP Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition">
              Contact Editorial Desk
            </Link>
            <Link href="/privacy" className="hover:text-slate-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition">
              Terms of Research Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
