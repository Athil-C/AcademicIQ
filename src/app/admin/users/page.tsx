import { Users, ShieldCheck, UserCheck } from "lucide-react";

export default function AdminUsersPage() {
  const users = [
    {
      id: "u1",
      name: "Chief Academic Officer",
      email: "admin@academiq.org",
      role: "ADMIN",
      status: "ACTIVE",
      joined: "January 2026",
    },
    {
      id: "u2",
      name: "Associate Editor (Social Sciences)",
      email: "editor@academiq.org",
      role: "EDITOR",
      status: "ACTIVE",
      joined: "March 2026",
    },
    {
      id: "u3",
      name: "Conference Liaison Officer",
      email: "liaison@academiq.org",
      role: "EDITOR",
      status: "ACTIVE",
      joined: "April 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Editorial Staff & Role Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Role-based access control (ADMIN, EDITOR, USER) linked to Supabase Auth profiles.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span>{u.name}</span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-600">{u.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      u.role === "ADMIN"
                        ? "bg-purple-50 text-purple-800 border border-purple-200"
                        : "bg-blue-50 text-blue-800 border border-blue-200"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">{u.status}</td>
                <td className="py-3 px-4 text-slate-500">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
