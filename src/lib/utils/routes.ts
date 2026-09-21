import { ContentType, FullContentItem } from "@/types";

export function getContentTypeRoute(type: ContentType): string {
  switch (type) {
    case "RESEARCH_PAPER":
      return "/research-papers";
    case "CFP":
      return "/cfps";
    case "CONFERENCE":
      return "/conferences";
    case "OPPORTUNITY":
      return "/opportunities";
    case "FUNDING":
      return "/funding";
    case "FELLOWSHIP":
      return "/fellowships";
    case "WORKSHOP":
      return "/workshops";
    case "WEBINAR":
      return "/webinars";
    case "ARTICLE":
      return "/articles";
    case "RESOURCE":
      return "/resources";
    default:
      return "/research-papers";
  }
}

export function getContentPath(item: { content_type: ContentType; slug: string }): string {
  const base = getContentTypeRoute(item.content_type);
  return `${base}/${item.slug}`;
}
