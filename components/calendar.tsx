"use client";

import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useHabits } from "@/hooks/use-habits";
import { useHabitHistory } from "@/hooks/use-habit-history";
import { CalendarDay } from "./calendar-day";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getWeekOfMonth, getDay } from "date-fns";

// const getInsights = () => {
//   const insights = [];

//   if (analytics.averageCompletion >= 80) {
//     insights.push("You're crushing it! Keep up the amazing consistency.");
//   } else if (analytics.averageCompletion >= 60) {
//     insights.push("Great progress! You're building strong habits.");
//   } else if (analytics.averageCompletion >= 40) {
//     insights.push("You're on the right track. Keep pushing forward.");
//   } else {
//     insights.push("Every day is a new opportunity. Start small and build momentum.");
//   }

//   if (analytics.longestStreak >= 30) {
//     insights.push("Your longest streak is impressive! You're a habit master.");
//   } else if (analytics.longestStreak >= 14) {
//     insights.push("You've built solid streaks. Keep the momentum going.");
//   }

//   if (analytics.bestHabit && analytics.bestHabit.completionRate === 100) {
//     insights.push(`${analytics.bestHabit.name} is your strongest habit!`);
//   }

//   return insights;
// };

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const allhabits = useQuery(api.habits.getHabits, {});
  const allHabitLogs = useQuery(api.habit_logs.getAllHabitLogs, {});
  const allMoodLogs = useQuery(api.mood_logs.getAllMoodLogs, {});
  // const { habits } = useHabits();
  const { getMonthStats } = useHabitHistory();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthStats = getMonthStats(currentMonth.getFullYear(), currentMonth.getMonth());

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === currentMonth.getFullYear() && today.getMonth() === currentMonth.getMonth();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Progress Calendar</h1>
        <p className="text-lg text-muted-foreground">Track your consistency over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl p-8 border border-border">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-8">
              <button onClick={previousMonth} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Previous month">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-semibold text-foreground">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Next month">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Month Completion Stats */}
            {/* <div className="mb-8 pb-8 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Month Completion</span>
                <span className="text-2xl font-bold text-primary">{monthCompletion}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-linear-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${monthCompletion}%` }}
                />
              </div>
            </div> */}

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-3">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map((day) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const dateStr = date.toISOString();
                const stats = monthStats[day];
                const isToday = isCurrentMonth && day === today.getDate();

                return (
                  <CalendarDay
                    key={day}
                    day={day}
                    stats={stats}
                    isToday={isToday}
                    dateStr={dateStr}
                    allHabitLogs={allHabitLogs ?? []}
                    allMoodLogs={allMoodLogs ?? []}
                    allhabits={allhabits ?? []}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Weekly Breakdown Sidebar */}
        <div className="bg-card rounded-2xl p-8 border border-border h-fit">
          <h3 className="font-semibold text-foreground mb-6 text-lg">Weekly Habit Breakdown</h3>
          <div className="space-y-4">
            {Array.from({ length: Math.ceil(daysInMonth / 7) }).map((_, weekIndex) => {
              // const weekStart = weekIndex * 7 + 1;
              // const weekEnd = Math.min(weekStart + 6, daysInMonth);
              // const weekDays = Array.from({ length: weekEnd - weekStart + 1 }, (_, i) => weekStart + i);
              // const weekCompletion = weekDays.reduce((sum, day) => {
              //   const stats = monthStats[day];
              //   return sum + (stats && stats.completed > 0 ? 1 : 0);
              // }, 0);

              const filterLogs = allHabitLogs?.filter((log) => {
                // console.log("getWeekOfMonth(new Date(log.date))", getWeekOfMonth(new Date(log.date)));
                if (log?.habitList.find((habit) => habit.completed)) {
                  return getWeekOfMonth(new Date(log.date)) === weekIndex + 1;
                }
              });

              let completionRate = 0;

              if (filterLogs && filterLogs?.length > 0) {
                completionRate = Math.round((filterLogs?.length / 7) * 100);
              }

              return (
                <div key={`week-${weekIndex}`} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Week {weekIndex + 1}</span>
                    <span className="text-sm font-bold text-primary">{completionRate}%</span>
                  </div>
                  {/* <div className="flex gap-1">
                    {weekDays.map((day) => {
                      const stats = monthStats[day];
                      const hasCompletion = stats && stats.completed > 0;

                      return (
                        <div
                          key={day}
                          className={`flex-1 h-2 rounded-full transition-all ${hasCompletion ? "bg-primary" : "bg-border"}`}
                          title={`Day ${day}: ${filterLogs?.length || 0}/${stats?.total || 0}`}
                        />
                        //   {weekStart}
                        // </div>
                      );
                    })}
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="bg-card rounded-2xl p-8 border border-border">
        <h3 className="font-semibold text-foreground mb-6 text-lg flex items-center gap-2">
          <Trophy className="w-6 h-6 text-accent" />
          Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getInsights().map((insight, i) => (
            <div key={i} className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-foreground">✨ {insight}</p>
            </div>
          ))}
        </div>
      </div> */}
      </div>
    </div>
  );
}
