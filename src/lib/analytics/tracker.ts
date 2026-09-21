// ==============================================================================
// AcademIQ — Analytics & Metrics Abstraction
// Non-invasive, extensible tracking for scholarly downloads and engagement
// ==============================================================================

export type AnalyticEvent =
  | { type: "PAGE_VIEW"; path: string; title?: string }
  | { type: "PAPER_DOWNLOAD"; paperId: string; title: string; doi?: string }
  | { type: "CFP_CLICK"; cfpId: string; title: string; deadline?: string }
  | { type: "EXTERNAL_LINK_CLICK"; contentId: string; url: string; label: string }
  | { type: "SEARCH_QUERY"; query: string; resultsCount: number };

export function trackEvent(event: AnalyticEvent) {
  if (typeof window === "undefined") return;

  try {
    // 1. In-memory/Session log for admin analytics display
    const sessionLogs = JSON.parse(sessionStorage.getItem("academiq_analytics") || "[]");
    sessionLogs.unshift({
      ...event,
      timestamp: new Date().toISOString(),
    });
    sessionStorage.setItem("academiq_analytics", JSON.stringify(sessionLogs.slice(0, 100)));

    // 2. Extensible hook for Google Analytics / Plausible / Matomo if configured
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", event.type, event);
    }
  } catch {
    // Fail silently without disrupting scholar user experience
  }
}
