"use client";

import Link from "next/link";
import { Plus, User, LogOut, Bell } from "lucide-react";
import { StatusBanner } from "./StatusBanner";

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <StatusBanner minimal />
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/admin/content/new"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Content</span>
        </Link>

        {/* User profile widget */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left text-xs">
            <p className="font-bold text-slate-900 leading-tight">Admin User</p>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Role: ADMIN</p>
          </div>

          <Link
            href="/admin/login"
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition"
            title="Sign out / Switch account"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
