"use client";

import { useEffect, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { isEqual, isBefore } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { SmileIcon } from "lucide-react";
import { moodIcons } from "@/lib/dummy-data";

interface CalendarDayProps {
  day: number;
  stats: { completed: number; total: number } | undefined;
  isToday: boolean;
  dateStr: string;
  allHabitLogs: Doc<"habit_logs">[] | [];
  allMoodLogs: Doc<"mood_logs">[] | [];
  allhabits: Doc<"habits">[] | [];
}

export function CalendarDay({ day, stats, isToday, dateStr, allHabitLogs, allMoodLogs, allhabits }: CalendarDayProps) {
  const { user } = useUser();
  const [habitData, setHabitData] = useState<any>();
  const [moodData, setMoodData] = useState<any>();
  const total = stats?.total || 0;

  useEffect(() => {
    if (allHabitLogs) {
      // setHabitData()
      const dateLog = allHabitLogs.find((log) => isEqual(new Date(log.date), new Date(dateStr)));
      const moodLog = allMoodLogs.find((log) => isEqual(new Date(log.date), new Date(dateStr)));

      if (moodLog) {
        console.log("moodLog1212", moodLog);
        setMoodData(moodLog);
      }

      if (dateLog) {
        const percentage = Math.round((dateLog?.habitList.filter((log) => log.completed).length / dateLog?.habitList.length) * 100);
        const data = {
          count: dateLog?.habitList.filter((log) => log.completed).length,
          total: dateLog?.habitList.length,
          percentage: Math.round((dateLog?.habitList.filter((log) => log.completed).length / dateLog?.habitList.length) * 100),
          active: true,
          complete: percentage === 100 ? true : false,
          date: dateLog?.date,
        };
        if (data.count > 0) {
          setHabitData(data);
        }
      }
    }
  }, [allHabitLogs, dateStr, user]);
  return (
    <>
      {isEqual(new Date(habitData?.date), new Date(dateStr)) || isEqual(new Date(moodData?.date), new Date(dateStr)) ? (
        <button
          className={` aspect-square rounded-lg font-semibold text-sm transition-all hover:scale-105 flex items-center justify-center relative  ${
            isToday ? "ring-2 ring-primary" : ""
          } ${habitData?.complete ? "text-green-500 bg-green-500/30 ring-green-500/30" : habitData?.active ? "bg-blue-500/30 text-blue-400" : "bg-muted"}`}
          title={`${moodData?.mood ? `${moodData?.mood}:` : ""} ${habitData?.count}/${habitData?.total} habits`}
        >
          <span className="opacity-70">{day}</span>
          {habitData?.total > 0 && (
            <div className="absolute bottom-1 right-1 text-sm font-bold ">
              {habitData?.active ? `${habitData?.count}/${habitData?.total}` : `0/0`}
            </div>
          )}
          {moodData?.mood && (
            <div className="absolute z-10 top-1 left-1 text-xl font-bold opacity-70 text-orange-600">
              {moodIcons.find((m) => m.id === moodData?.mood)?.emoji}
            </div>
          )}
        </button>
      ) : (
        <button
          className={`aspect-square rounded-lg font-semibold text-sm transition-all hover:scale-105 flex items-center justify-center relative  ${
            isToday ? "ring-2 ring-primary" : ""
          } bg-muted`}
          title={`${dateStr}: 0/${allhabits?.length} habits`}
        >
          <span className="opacity-70">{day}</span>
          {total > 0 && (
            <div className="absolute bottom-1 right-1 text-sm font-bold opacity-70">
              {isBefore(new Date(user?.createdAt ?? ""), new Date(dateStr)) ? (allhabits?.length > 0 ? `0/${allhabits?.length}` : `0/0`) : ``}
            </div>
          )}
        </button>
      )}
    </>
  );
}
