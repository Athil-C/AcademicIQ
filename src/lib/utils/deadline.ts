import { DeadlineInfo } from "@/types";

/**
 * Calculates academic opportunity deadline status and remaining duration.
 * Does not hide or delete expired content; provides clear semantic cues.
 */
export function calculateDeadline(deadlineDate: string | Date | null | undefined): DeadlineInfo {
  if (!deadlineDate) {
    return {
      state: "active",
      remainingDays: 999,
      label: "Open / Rolling Deadline",
      badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    };
  }

  const target = new Date(deadlineDate);
  const now = new Date();

  // Reset to midnight for fair day-based calculation
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const diffMs = targetMidnight - nowMidnight;
  const remainingDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (remainingDays < 0) {
    const daysAgo = Math.abs(remainingDays);
    return {
      state: "passed",
      remainingDays,
      label: daysAgo === 1 ? "Deadline passed (yesterday)" : `Deadline passed (${daysAgo}d ago)`,
      badgeClass: "bg-slate-100 text-slate-600 border-slate-300 font-medium",
    };
  }

  if (remainingDays === 0) {
    return {
      state: "today",
      remainingDays: 0,
      label: "Closing today",
      badgeClass: "bg-amber-100 text-amber-900 border-amber-300 animate-pulse font-semibold",
    };
  }

  if (remainingDays <= 5) {
    return {
      state: "urgent",
      remainingDays,
      label: remainingDays === 1 ? "1 day remaining" : `${remainingDays} days remaining`,
      badgeClass: "bg-amber-50 text-amber-800 border-amber-300 font-medium",
    };
  }

  return {
    state: "active",
    remainingDays,
    label: `${remainingDays} days remaining`,
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-300 font-medium",
  };
}

/**
 * Formats standard academic dates (e.g., "15 October 2026")
 */
export function formatAcademicDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return "Date TBD";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return String(dateString);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(dateString);
  }
}
