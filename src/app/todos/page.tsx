import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from("todos").select();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h1 className="text-xl font-bold font-serif text-slate-900">
            Supabase Connection Test
          </h1>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Live Check
          </span>
        </div>

        {error ? (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 space-y-1">
            <p className="font-semibold">Query Message:</p>
            <p>{error.message}</p>
            <p className="text-[11px] text-red-600 mt-1">
              (If the &apos;todos&apos; table does not exist in your Supabase project yet, create it in your Supabase SQL editor or Table Editor.)
            </p>
          </div>
        ) : todos && todos.length > 0 ? (
          <ul className="divide-y divide-slate-100 text-sm">
            {todos.map((todo) => (
              <li key={todo.id} className="py-2 flex items-center justify-between text-slate-800">
                <span>{todo.name || todo.title || JSON.stringify(todo)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
            <p className="font-semibold">Supabase Connected Successfully!</p>
            <p className="mt-1 text-slate-600">
              No rows currently found in the <code className="font-mono text-blue-900 bg-blue-100 px-1 rounded">&apos;todos&apos;</code> table.
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link href="/" className="text-blue-700 hover:underline font-semibold">
            ← Return to AcademIQ Home
          </Link>
          <span className="font-mono text-[10px]">/todos</span>
        </div>
      </div>
    </div>
  );
}
