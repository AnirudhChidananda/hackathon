"use client";

interface CalendarDayProps {
  day: number;
  stats: { completed: number; total: number } | undefined;
  isToday: boolean;
  dateStr: string;
}

export function CalendarDay({ day, stats, isToday, dateStr }: CalendarDayProps) {
  const completed = stats?.completed || 0;
  const total = stats?.total || 0;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  let bgColor = "bg-muted";
  if (percentage === 100 && total > 0) {
    bgColor = "bg-primary";
  } else if (percentage >= 50 && total > 0) {
    bgColor = "bg-secondary";
  } else if (percentage > 0) {
    bgColor = "bg-accent";
  }

  return (
    <button
      className={`aspect-square rounded-lg font-semibold text-sm transition-all hover:scale-105 flex items-center justify-center relative ${bgColor} ${
        isToday ? "ring-2 ring-primary" : ""
      } ${percentage === 100 && total > 0 ? "text-primary-foreground" : "text-foreground"}`}
      title={`${dateStr}: ${completed}/${total} habits`}
    >
      <span>{day}</span>
      {total > 0 && (
        <div className="absolute bottom-1 right-1 text-xs font-bold opacity-70">
          {completed}/{total}
        </div>
      )}
    </button>
  );
}
