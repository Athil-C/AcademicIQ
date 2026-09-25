"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck, Info, UserPlus, Sparkles } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.toLowerCase().includes("invalid login credentials")) {
            setErrorMsg(
              "Invalid login credentials. This user has not been created in your Supabase project yet. Click 'Register this User in Supabase' below or 'Continue in Demo Mode'."
            );
          } else {
            setErrorMsg(error.message);
          }
          setLoading(false);
          return;
        }
      }

      // Successful login
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setErrorMsg("An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterInSupabase = async () => {
    if (!email || !password) {
      setErrorMsg("Please enter an email and password first.");
      return;
    }

    setRegistering(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const supabase = createClient();
      const role = email.includes("editor") ? "EDITOR" : "ADMIN";
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: role === "ADMIN" ? "AcademIQ Chief Administrator" : "AcademIQ Section Editor",
            role,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (data.session) {
        setSuccessMsg("Account created and authenticated in Supabase! Redirecting...");
        setTimeout(() => {
          router.push("/admin/dashboard");
          router.refresh();
        }, 1000);
      } else {
        setSuccessMsg(
          "User created in Supabase! If your Supabase project requires email confirmation, check your inbox or disable 'Confirm email' under Supabase -> Auth -> Providers -> Email."
        );
      }
    } catch {
      setErrorMsg("Failed to register user in Supabase.");
    } finally {
      setRegistering(false);
    }
  };

  const handleDemoBypass = () => {
    // Set demo cookie so middleware allows access to admin dashboard
    document.cookie = "academiq_demo_auth=true; path=/; max-age=86400; SameSite=Lax";
    router.push("/admin/dashboard");
    router.refresh();
  };

  const fillDemoAdmin = () => {
    setEmail("admin@academiq.org");
    setPassword("AcademIQ2026!Secure");
    setErrorMsg("");
    setSuccessMsg("");
  };

  const fillDemoEditor = () => {
    setEmail("editor@academiq.org");
    setPassword("Editor2026!Scholarly");
    setErrorMsg("");
    setSuccessMsg("");
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 bg-white p-7 sm:p-8 rounded-2xl shadow-xl border border-slate-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white mb-2 shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Academ<span className="text-blue-700">IQ</span> Admin CMS
          </h2>
          <p className="text-xs text-slate-500">
            Editorial Management, Media Library & Opportunity Dispatch
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 space-y-2">
            <p className="font-semibold">{errorMsg}</p>
            {errorMsg.includes("not been created") && (
              <button
                type="button"
                onClick={handleRegisterInSupabase}
                disabled={registering}
                className="w-full py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{registering ? "Registering in Supabase..." : "Register this User in Supabase Now"}</span>
              </button>
            )}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1">
            <p className="font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Editorial Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@academiq.org"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-sm rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign in to Editorial Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Development & Quick-Fill Helpers */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Development Quick-Fill:</span>
            </span>

            <button
              type="button"
              onClick={handleDemoBypass}
              className="text-blue-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Enter in Demo Mode</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-left transition cursor-pointer"
            >
              <span className="font-bold text-slate-900 block">Admin Role</span>
              <span className="text-[10px] text-slate-500 truncate block">admin@academiq.org</span>
            </button>

            <button
              type="button"
              onClick={fillDemoEditor}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-left transition cursor-pointer"
            >
              <span className="font-bold text-slate-900 block">Editor Role</span>
              <span className="text-[10px] text-slate-500 truncate block">editor@academiq.org</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-1">
          <Link href="/" className="text-xs text-blue-700 hover:underline">
            ← Back to Public AcademIQ Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
