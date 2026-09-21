import { FullContentItem } from "@/types";

export function generateScholarlyArticleSchema(item: FullContentItem) {
  const paper = item.research_paper;
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: item.title,
    description: item.short_description,
    datePublished: paper?.publication_date || item.published_at || item.created_at,
    author: item.authors?.map((a) => ({
      "@type": "Person",
      name: a.name,
      affiliation: a.affiliation ? { "@type": "Organization", name: a.affiliation } : undefined,
    })) || [],
    publisher: {
      "@type": "Organization",
      name: paper?.publisher || item.organization?.name || "AcademIQ Research Network",
    },
    sameAs: paper?.doi ? `https://doi.org/${paper.doi}` : undefined,
  };
}

export function generateEventSchema(item: FullContentItem) {
  const conf = item.conference || item.cfp;
  const workshop = item.workshop || item.webinar;

  const startDate = item.conference?.start_date || item.cfp?.conference_start || workshop?.date;
  const endDate = item.conference?.end_date || item.cfp?.conference_end || workshop?.date;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: item.title,
    description: item.short_description,
    startDate: startDate,
    endDate: endDate || startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      (item.cfp?.mode === "ONLINE" || item.conference?.mode === "ONLINE" || item.workshop?.mode === "ONLINE")
        ? "https://schema.org/OnlineEventAttendanceMode"
        : (item.cfp?.mode === "HYBRID" || item.conference?.mode === "HYBRID")
        ? "https://schema.org/MixedEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: item.organization?.name || item.cfp?.organizing_institution || "Academic Host",
      url: item.organization?.website,
    },
  };
}

export function generateBreadcrumbsSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
