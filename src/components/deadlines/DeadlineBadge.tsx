import { calculateDeadline } from "@/lib/utils/deadline";
import { cn } from "@/lib/utils/cn";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";

interface DeadlineBadgeProps {
  deadline: string | Date | null | undefined;
  showIcon?: boolean;
  className?: string;
}

export function DeadlineBadge({ deadline, showIcon = true, className }: DeadlineBadgeProps) {
  const info = calculateDeadline(deadline);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border transition-colors",
        info.badgeClass,
        className
      )}
      title={`Deadline status: ${info.label}`}
    >
      {showIcon && (
        <>
          {info.state === "urgent" || info.state === "today" ? (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          ) : info.state === "passed" ? (
            <Clock className="w-3.5 h-3.5 shrink-0 opacity-70" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
          )}
        </>
      )}
      <span>{info.label}</span>
    </span>
  );
}
