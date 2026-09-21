import { Library, Image as ImageIcon, Calendar } from "lucide-react";
import Image from "next/image";

export default function AdminGalleriesPage() {
  const galleries = [
    {
      id: "g1",
      name: "World Congress of Political Science 2026 Proceedings",
      slug: "wcps-2026-proceedings",
      description: "Plenary speeches, poster sessions, and ministerial roundtable documentation.",
      imageCount: 24,
      coverUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
      date: "November 2026",
    },
    {
      id: "g2",
      name: "SSRF Geneva Colloquium & Working Sessions",
      slug: "ssrf-geneva-colloquium",
      description: "Working group photographs and keynote session documentation at CICG.",
      imageCount: 18,
      coverUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
      date: "December 2026",
    },
    {
      id: "g3",
      name: "Empirical Methods Summer Institute",
      slug: "empirical-methods-summer-institute",
      description: "Workshop lab training, computer cluster sessions, and cohort activities.",
      imageCount: 12,
      coverUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
      date: "October 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Event & Symposium Galleries</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Photo documentation and archival galleries for conferences, SSRF initiatives, and workshops.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((g) => (
          <div
            key={g.id}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="aspect-video relative bg-slate-100 overflow-hidden">
              <Image
                src={g.coverUrl}
                alt={g.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
                sizes="400px"
              />
              <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[11px] px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 font-mono">
                <ImageIcon className="w-3 h-3" />
                {g.imageCount} photos
              </span>
            </div>

            <div className="p-5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{g.date}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-serif group-hover:text-blue-700 transition">
                {g.name}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {g.description}
              </p>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">/{g.slug}</span>
              <button
                type="button"
                className="text-blue-700 hover:underline font-semibold"
              >
                Manage Album →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
