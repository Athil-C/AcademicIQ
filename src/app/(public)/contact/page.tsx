"use client";

import { Mail, Building, Globe, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-900">Contact Editorial Directorate</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Inquiries regarding Call for Papers partnerships, SSRF working groups, institutional listings, or editorial corrections.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100 text-xs text-slate-600">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-700" /> Editorial Desk
              </span>
              <p>editorial@academiq-network.org</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-700" /> Institutional Partnerships
              </span>
              <p>partnerships@academiq-network.org</p>
            </div>
          </div>

          <form className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Prof. / Dr. Jane Doe"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Institutional Email</label>
                <input
                  type="email"
                  placeholder="jane.doe@university.edu"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Subject / Inquiry Type</label>
              <select className="w-full px-3.5 py-2 border border-slate-300 rounded-lg bg-white">
                <option>Submit Call for Papers (CFP) for Verification</option>
                <option>SSRF Working Group & Community Inquiry</option>
                <option>Conference Partnership & Media Collaboration</option>
                <option>Editorial Correction / Persistent Identifier Issue</option>
                <option>General Academic Question</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Provide details, symposium links, or submission requirements..."
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <button
              type="button"
              onClick={() => alert("Message sent to the AcademIQ editorial secretariat. We will respond within 2 business days.")}
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold shadow-xs flex items-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
