"use client";

import { Trophy, Flame, TrendingUp, Target, Calendar } from "lucide-react";
import { useHabits } from "@/hooks/use-habits";
import { useHabitHistory } from "@/hooks/use-habit-history";
import { useMemo } from "react";
import { habitIconOptions } from "@/lib/dummy-data";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { dummyHabits, dummyEntries, dummyAnalytics } from "@/lib/dummy-data";
import { HabitEntry } from "@/lib/types";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { startOfToday } from "date-fns";

export function Analytics({ thisWeeksProgress }: { thisWeeksProgress: number }) {
  const start = startOfToday();
  const todayLogs = useQuery(api.habit_logs.getTodayHabitLogs, { date: start.toISOString() });

  const allHabits = useQuery(api.habits.getHabits, {});
  const [entries, setEntries] = useState<HabitEntry[]>(dummyEntries);
  const today = new Date().toISOString().split("T")[0];

  const todayTotalEntries = todayLogs?.habitList ?? [];
  const completedHabits = todayTotalEntries.filter((entry: any) => entry.completed).length;
  const totalHabits = todayTotalEntries.length;

  const { habits } = useHabits();
  const { history } = useHabitHistory();

  const analytics = useMemo(() => {
    if (habits.length === 0) {
      return {
        totalHabits: 0,
        averageCompletion: 0,
        longestStreak: 0,
        bestHabit: null,
        weeklyStats: Array(7).fill(0),
        monthlyTrend: Array(30).fill(0),
        habitPerformance: [],
      };
    }

    const longestStreak = Math.max(...habits.map((h) => h.streak), 0);

    const habitPerformance = habits.map((habit) => {
      let completedDays = 0;
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        if (history[dateStr]?.[habit.id]) {
          completedDays++;
        }
      }
      return {
        id: habit.id,
        name: habit.name,
        icon: habit.icon,
        completionRate: Math.round((completedDays / 30) * 100),
        completedDays,
      };
    });

    const bestHabit = habitPerformance.reduce((best, current) => (current.completionRate > best.completionRate ? current : best));

    const weeklyStats = Array(7)
      .fill(0)
      .map((_, dayIndex) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - dayIndex));
        const dateStr = date.toISOString().split("T")[0];
        const dayHistory = history[dateStr] || {};
        const completed = Object.values(dayHistory).filter(Boolean).length;
        return habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0;
      });

    const monthlyTrend = Array(30)
      .fill(0)
      .map((_, dayIndex) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - dayIndex));
        const dateStr = date.toISOString().split("T")[0];
        const dayHistory = history[dateStr] || {};
        const completed = Object.values(dayHistory).filter(Boolean).length;
        return habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0;
      });

    const averageCompletion = Math.round(weeklyStats.reduce((a, b) => a + b, 0) / Math.max(weeklyStats.length, 1));

    return {
      totalHabits: habits.length,
      averageCompletion,
      longestStreak,
      bestHabit,
      weeklyStats,
      monthlyTrend,
      habitPerformance,
    };
  }, [habits, history]);

  const getInsights = () => {
    const insights = [];

    if (analytics.averageCompletion >= 80) {
      insights.push("You're crushing it! Keep up the amazing consistency.");
    } else if (analytics.averageCompletion >= 60) {
      insights.push("Great progress! You're building strong habits.");
    } else if (analytics.averageCompletion >= 40) {
      insights.push("You're on the right track. Keep pushing forward.");
    } else {
      insights.push("Every day is a new opportunity. Start small and build momentum.");
    }

    if (analytics.longestStreak >= 30) {
      insights.push("Your longest streak is impressive! You're a habit master.");
    } else if (analytics.longestStreak >= 14) {
      insights.push("You've built solid streaks. Keep the momentum going.");
    }

    if (analytics.bestHabit && analytics.bestHabit.completionRate === 100) {
      insights.push(`${analytics.bestHabit.name} is your strongest habit!`);
    }

    return insights;
  };
  const todayEntries = entries.filter((entry) => entry.date === today);

  const completedToday = todayEntries.filter((entry) => entry.completed).length;
  const completionRate = Math.round((completedToday / dummyHabits.length) * 100);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Your Insights</h1>
        <p className="text-lg text-muted-foreground">See your progress and achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div className=" flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {completedHabits}/{totalHabits}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={Math.round((completedHabits / totalHabits) * 100)} className="mt-2" />
          </CardContent>
        </Card>

        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className=" flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week's Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{thisWeeksProgress}%</p>
                <p className="text-xs text-muted-foreground mt-2">completed</p>
              </div>
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card> */}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className=" flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Habits</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{allHabits?.length || 0}</p>
                <p className="text-xs text-muted-foreground mt-2">active</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className=" flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Best Streak</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-xs text-muted-foreground mt-2">days</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Insights */}
      <div className="bg-card rounded-2xl p-8 border border-border">
        <h3 className="font-semibold text-foreground mb-6 text-lg flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Take a step in the right direction
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getInsights().map((insight, i) => (
            <div key={i} className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-foreground">✨ {insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
