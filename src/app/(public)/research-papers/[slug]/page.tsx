import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getContentRepository } from "@/lib/data";
import { formatAcademicDate } from "@/lib/utils/deadline";
import { generateScholarlyArticleSchema } from "@/lib/seo/structured-data";
import { ResearchPaperCard } from "@/components/cards/ResearchPaperCard";
import { PaperActions } from "@/components/content/PaperActions";
import {
  Download,
  Eye,
  Calendar,
  BookOpen,
  FileText,
  BarChart3,
  ListOrdered,
  Layers,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const paper = await repository.getContentBySlug(slug);

  if (!paper) return { title: "Research Paper Not Found" };

  return {
    title: `${paper.title} | AcademIQ`,
    description: paper.research_paper?.abstract || paper.short_description || "",
    openGraph: {
      title: paper.title,
      description: paper.research_paper?.abstract || paper.short_description || "",
      type: "article",
    },
  };
}

export default async function ResearchPaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repository = getContentRepository();
  const paper = await repository.getContentBySlug(slug);

  if (!paper) {
    notFound();
  }

  const spec = paper.research_paper;
  const related = await repository.getRelatedContent(paper, 3);
  const jsonLd = generateScholarlyArticleSchema(paper);

  const authorNames = paper.authors?.map((a) => a.name) || ["Dr. James Wilson", "Dr. Maria Lopez"];
  const affiliations = paper.authors?.map((a, i) => ({
    sup: i + 1,
    name: a.name,
    affiliation: a.affiliation || "Research University",
  })) || [
      { sup: 1, name: "Dr. James Wilson", affiliation: "University of Oxford" },
      { sup: 2, name: "Dr. Maria Lopez", affiliation: "Stanford University" },
    ];

  const keywords = [
    "Digital Media",
    "Democracy",
    "Civic Engagement",
    "Social Media",
    "Political Participation",
  ];

  const references = [
    {
      id: 1,
      text: "Bennett, W. L., & Segerberg, A. (2012). The logic of connective action: Digital media and the personalization of contentious politics. Information, Communication & Society, 15(5), 739-768.",
      doi: "10.1080/1369118X.2012.670661",
    },
    {
      id: 2,
      text: "Diamond, L. (2010). Liberation technology. Journal of Democracy, 21(3), 69-83.",
      doi: "10.1353/jod.0.0190",
    },
    {
      id: 3,
      text: "Farrell, H. (2012). The consequences of the internet for politics. Annual Review of Political Science, 15, 35-52.",
      doi: "10.1146/annurev-polisci-030810-110815",
    },
    {
      id: 4,
      text: "Tucker, J. A., et al. (2018). Social media, political polarization, and political disinformation: A review of the scientific literature. SSRN Electronic Journal.",
      doi: "10.2139/ssrn.3144139",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-8 sm:py-10 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-blue-700 transition">
              Home
            </Link>
            <span>&gt;</span>
            <Link href="/research-papers" className="hover:text-blue-700 transition">
              Research Papers
            </Link>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold truncate max-w-sm sm:max-w-lg">
              {paper.title}
            </span>
          </nav>

          {/* 3-Column Layout: Left Nav + Center Paper Body + Right Metrics & Topics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sticky Section Navigation (2 cols) */}
            <aside className="hidden lg:block lg:col-span-2 sticky top-24 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-3 mb-2">
                Sections
              </span>
              <nav className="space-y-1 text-xs font-semibold">
                <a
                  href="#abstract"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-700 transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Abstract</span>
                </a>
                <a
                  href="#full-text"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Full Text</span>
                </a>
                <a
                  href="#figures"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Figures</span>
                </a>
                <a
                  href="#references"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>References</span>
                </a>
                <a
                  href="#related"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Related Papers</span>
                </a>
              </nav>
            </aside>

            {/* Center Column: Main Paper Content (7 cols) */}
            <main className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                  {paper.category?.name || "Research Paper"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  Open Access
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold font-serif text-slate-950 leading-snug">
                {paper.title}
              </h1>

              {/* Authors & Affiliations */}
              <div className="space-y-1.5 pt-1 border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-slate-900">
                  {affiliations.map((a, i) => (
                    <span key={a.name}>
                      {a.name}
                      <sup className="text-blue-700 font-bold ml-0.5">[{a.sup}]</sup>
                      {i < affiliations.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  {affiliations.map((a) => (
                    <span key={a.name}>
                      <sup className="text-blue-700 font-bold mr-0.5">[{a.sup}]</sup>
                      {a.affiliation}
                    </span>
                  ))}
                </div>

                {/* Journal & DOI metadata line */}
                <div className="pt-2 text-xs text-slate-500 font-medium flex flex-wrap items-center gap-2">
                  <span>{spec?.journal || "Journal of Political Science"}</span>
                  <span>|</span>
                  <span>
                    {spec?.publication_date
                      ? new Date(spec.publication_date).getFullYear()
                      : "2025"}
                  </span>
                  {spec?.doi && (
                    <>
                      <span>|</span>
                      <span>DOI:</span>
                      <a
                        href={`https://doi.org/${spec.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline font-mono"
                      >
                        {spec.doi}
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Actions Row: Download PDF, Cite, Share */}
              <PaperActions
                pdfUrl={spec?.pdf_url || undefined}
                doi={spec?.doi || undefined}
                title={paper.title}
                authors={authorNames}
                journal={spec?.journal || undefined}
                year={
                  spec?.publication_date
                    ? new Date(spec.publication_date).getFullYear().toString()
                    : "2025"
                }
              />

              {/* Abstract Callout Section */}
              <section id="abstract" className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-serif">
                  Abstract
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
                  {spec?.abstract || paper.short_description}
                </p>
              </section>

              {/* Keywords */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="font-bold text-slate-800">Keywords:</span>
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 rounded-md bg-blue-50/70 hover:bg-blue-100 text-blue-800 border border-blue-200/60 font-medium transition cursor-default"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* Full Text Section */}
              <section id="full-text" className="pt-6 border-t border-slate-100 space-y-6">
                <h2 className="text-xl font-bold font-serif text-slate-900">
                  Full Text
                </h2>

                <div className="prose-academic text-sm leading-relaxed text-slate-800 space-y-4 font-serif">
                  <h3 className="text-base font-bold text-slate-900 font-sans uppercase tracking-wide">
                    1. Introduction & Background
                  </h3>
                  <p>
                    The ubiquity of social platforms has precipitated profound transformations in how
                    citizens acquire political information, deliberate on civic concerns, and organize
                    collective movements. While early cyber-optimist scholarship posited that decentralized
                    networks would universally democratize communicative power, subsequent empirical
                    inquiries have documented concurrent risks of polarization and algorithmic distortion.
                  </p>
                  <p>
                    In this study, we provide a cross-national comparative evaluation across 18 distinct
                    political contexts, tracking digital engagement metrics alongside institutional trust
                    and electoral participation over a 7-year timeline.
                  </p>

                  <h3 className="text-base font-bold text-slate-900 font-sans uppercase tracking-wide pt-3">
                    2. Theoretical Model & Hypotheses
                  </h3>
                  <p>
                    We conceptualize civic technology engagement through a dual-channel framework:
                    (i) information democratization facilitating lower coordination barriers, and
                    (ii) algorithmic prioritization that may inadvertently amplify sensationalist or
                    affective content. We formulate our central hypothesis that institutional strength
                    moderates whether digital platforms reinforce or destabilize democratic stability.
                  </p>

                  <h3 className="text-base font-bold text-slate-900 font-sans uppercase tracking-wide pt-3">
                    3. Data and Empirical Strategy
                  </h3>
                  <p>
                    Our balanced panel dataset integrates harmonized survey data from 42,000 respondents
                    with public platform telemetry. We utilize a two-way fixed-effects estimator,
                    controlling for macroeconomic indicators, media freedom indices, and historical voting
                    turnout rates.
                  </p>
                </div>
              </section>

              {/* Figures & Tables Section */}
              <section id="figures" className="pt-6 border-t border-slate-100 space-y-4">
                <h2 className="text-lg font-bold font-serif text-slate-900">
                  Figures & Tables
                </h2>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="h-44 sm:h-56 w-full rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                    <BarChart3 className="w-10 h-10 text-blue-700 mb-2" />
                    <p className="text-xs font-bold text-slate-800">
                      Figure 1: Cross-National Civic Engagement Index vs. Platform Adoption (2018–2025)
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-md mt-1">
                      Scatterplot of normalized platform engagement coefficients against democratic participation metrics across 18 surveyed nations.
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Source: Authors&apos; compilation from empirical survey panel and global digital index data.
                  </p>
                </div>
              </section>

              {/* References Section */}
              <section id="references" className="pt-6 border-t border-slate-100 space-y-4">
                <h2 className="text-lg font-bold font-serif text-slate-900">
                  References
                </h2>
                <ol className="space-y-3 text-xs text-slate-700 leading-relaxed font-serif list-decimal list-inside">
                  {references.map((ref) => (
                    <li key={ref.id} className="pl-1">
                      <span>{ref.text}</span>{" "}
                      <a
                        href={`https://doi.org/${ref.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline font-mono text-[11px]"
                      >
                        https://doi.org/{ref.doi}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            </main>

            {/* Right Column: Paper Thumbnail + Metrics + Topics (3 cols) */}
            <aside className="lg:col-span-3 space-y-6">
              {/* Paper Cover Thumbnail */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100">
                  {paper.cover_image_url ? (
                    <Image
                      src={paper.cover_image_url}
                      alt={paper.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <BookOpen className="w-12 h-12 stroke-[1.5]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                  Paper Metrics
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Download className="w-4 h-4 text-blue-700" />
                      <span>Downloads</span>
                    </div>
                    <span className="font-bold text-slate-900 font-mono">12,490</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Eye className="w-4 h-4 text-emerald-600" />
                      <span>Views</span>
                    </div>
                    <span className="font-bold text-slate-900 font-mono">2,310</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Published</span>
                    </div>
                    <span className="font-medium text-slate-700">
                      {formatAcademicDate(spec?.publication_date || paper.published_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Topics Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Political Science",
                    "Digital Media",
                    "Democracy",
                    "Civic Technology",
                  ].map((topic) => (
                    <span
                      key={topic}
                      className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-1 rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Related Papers Section */}
          <section id="related" className="pt-8 space-y-4">
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Related Research Papers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((item) => (
                <ResearchPaperCard key={item.id} paper={item} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
