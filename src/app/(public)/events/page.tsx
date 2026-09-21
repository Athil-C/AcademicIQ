import Link from "next/link";
import { getContentRepository } from "@/lib/data";
import { ConferenceCard } from "@/components/cards/ConferenceCard";
import { EventCard } from "@/components/cards/EventCard";
import {
  Calendar,
  Video,
  Layers,
  Search,
  Filter,
  Globe,
  MapPin,
} from "lucide-react";

export default async function EventsHubPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; mode?: string; q?: string }>;
}) {
  const params = await searchParams;
  const repository = getContentRepository();

  const [conferencesRes, workshopsRes, webinarsRes] = await Promise.all([
    repository.getContentList({
      type: "CONFERENCE",
      status: "PUBLISHED",
      query: params.q,
      mode: params.mode as any,
    }),
    repository.getContentList({
      type: "WORKSHOP",
      status: "PUBLISHED",
      query: params.q,
      mode: params.mode as any,
    }),
    repository.getContentList({
      type: "WEBINAR",
      status: "PUBLISHED",
      query: params.q,
    }),
  ]);

  let allEvents = [
    ...conferencesRes.items,
    ...workshopsRes.items,
    ...webinarsRes.items,
  ];

  if (params.type === "CONFERENCE") {
    allEvents = conferencesRes.items;
  } else if (params.type === "WORKSHOP") {
    allEvents = workshopsRes.items;
  } else if (params.type === "WEBINAR") {
    allEvents = webinarsRes.items;
  }

  // Filter by mode if selected
  if (params.mode) {
    allEvents = allEvents.filter((item) => {
      const m =
        item.conference?.mode ||
        item.workshop?.mode ||
        (item.content_type === "WEBINAR" ? "ONLINE" : undefined);
      return m === params.mode;
    });
  }

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-700 transition">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-semibold">Events Hub</span>
        </nav>

        {/* Hub Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            <Calendar className="w-3.5 h-3.5" />
            <span>Conferences, Workshops & Symposia</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-950">
            Events Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Discover upcoming international academic conferences, methodology workshops,
            and research webinars to connect with global scholars.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <form action="/events" method="GET" className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4" />
            <input
              type="text"
              name="q"
              defaultValue={params.q || ""}
              placeholder="Search conferences, workshops, webinars, locations..."
              className="w-full pl-12 pr-28 py-3 text-sm text-slate-900 placeholder-slate-400 bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-600 focus:bg-white transition"
            />
            {params.type && <input type="hidden" name="type" value={params.type} />}
            {params.mode && <input type="hidden" name="mode" value={params.mode} />}
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* 2-Column Hub Layout: Filters + Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar */}
          <aside className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-sky-700" />
                <span>Filters</span>
              </h2>
              {(params.type || params.mode || params.q) && (
                <Link
                  href="/events"
                  className="text-xs text-sky-700 hover:underline font-semibold"
                >
                  Reset
                </Link>
              )}
            </div>

            {/* Event Category Filter */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Event Format
              </h3>
              <div className="space-y-1 text-xs">
                <Link
                  href={`/events${params.mode ? `?mode=${params.mode}` : ""}`}
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    !params.type
                      ? "bg-sky-50 text-sky-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  All Events ({conferencesRes.total + workshopsRes.total + webinarsRes.total})
                </Link>
                <Link
                  href={`/events?type=CONFERENCE${params.mode ? `&mode=${params.mode}` : ""}`}
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    params.type === "CONFERENCE"
                      ? "bg-sky-50 text-sky-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Conferences ({conferencesRes.total})
                </Link>
                <Link
                  href={`/events?type=WORKSHOP${params.mode ? `&mode=${params.mode}` : ""}`}
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    params.type === "WORKSHOP"
                      ? "bg-sky-50 text-sky-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Workshops ({workshopsRes.total})
                </Link>
                <Link
                  href={`/events?type=WEBINAR${params.mode ? `&mode=${params.mode}` : ""}`}
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    params.type === "WEBINAR"
                      ? "bg-sky-50 text-sky-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Webinars ({webinarsRes.total})
                </Link>
              </div>
            </div>

            {/* Attendance Mode Filter */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Attendance Mode
              </h3>
              <div className="space-y-1 text-xs">
                {["ONLINE", "OFFLINE", "HYBRID"].map((m) => {
                  const isSelected = params.mode === m;
                  return (
                    <Link
                      key={m}
                      href={`/events?mode=${m}${params.type ? `&type=${params.type}` : ""}`}
                      className={`block px-2.5 py-1.5 rounded-lg transition ${
                        isSelected
                          ? "bg-sky-50 text-sky-800 font-bold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {m === "ONLINE" ? "Virtual / Online" : m === "OFFLINE" ? "In-Person" : "Hybrid"}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Events Grid */}
          <main className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-600">
                Showing {allEvents.length} academic event{allEvents.length !== 1 ? "s" : ""}
              </span>
            </div>

            {allEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  No events found matching your filter
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting the event format or attendance mode.
                </p>
                <div className="pt-2">
                  <Link
                    href="/events"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-sky-700 text-white text-xs font-semibold hover:bg-sky-800 transition"
                  >
                    Clear All Filters
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {allEvents.map((item) => {
                  if (item.content_type === "CONFERENCE") {
                    return <ConferenceCard key={item.id} conference={item} />;
                  }
                  return <EventCard key={item.id} event={item} />;
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
