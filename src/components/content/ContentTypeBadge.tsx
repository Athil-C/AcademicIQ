import { ContentType } from "@/types";
import { cn } from "@/lib/utils/cn";
import {
  FileText,
  Megaphone,
  Calendar,
  Compass,
  Coins,
  Award,
  BookOpen,
  Video,
  Layers,
  Sparkles,
} from "lucide-react";

interface ContentTypeBadgeProps {
  type: ContentType;
  className?: string;
  showIcon?: boolean;
}

const TYPE_CONFIG: Record<
  ContentType,
  { label: string; icon: typeof FileText; classes: string }
> = {
  RESEARCH_PAPER: {
    label: "Research Paper",
    icon: FileText,
    classes: "bg-indigo-50 text-indigo-800 border-indigo-200",
  },
  CFP: {
    label: "Call for Papers",
    icon: Megaphone,
    classes: "bg-blue-50 text-blue-800 border-blue-200 font-semibold",
  },
  CONFERENCE: {
    label: "Conference",
    icon: Calendar,
    classes: "bg-sky-50 text-sky-800 border-sky-200",
  },
  OPPORTUNITY: {
    label: "Opportunity",
    icon: Compass,
    classes: "bg-teal-50 text-teal-800 border-teal-200",
  },
  FUNDING: {
    label: "Research Grant",
    icon: Coins,
    classes: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  FELLOWSHIP: {
    label: "Fellowship",
    icon: Award,
    classes: "bg-purple-50 text-purple-800 border-purple-200",
  },
  WORKSHOP: {
    label: "Workshop",
    icon: Layers,
    classes: "bg-amber-50 text-amber-800 border-amber-200",
  },
  WEBINAR: {
    label: "Webinar",
    icon: Video,
    classes: "bg-orange-50 text-orange-800 border-orange-200",
  },
  ARTICLE: {
    label: "Scholarly Article",
    icon: BookOpen,
    classes: "bg-slate-100 text-slate-800 border-slate-200",
  },
  RESOURCE: {
    label: "Research Resource",
    icon: Sparkles,
    classes: "bg-rose-50 text-rose-800 border-rose-200",
  },
};

export function ContentTypeBadge({ type, className, showIcon = true }: ContentTypeBadgeProps) {
  const config = TYPE_CONFIG[type] || {
    label: type,
    icon: FileText,
    classes: "bg-slate-100 text-slate-800 border-slate-200",
  };
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.classes,
        className
      )}
    >
      {showIcon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{config.label}</span>
    </span>
  );
}
