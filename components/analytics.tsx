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

export function Analytics() {
  const [entries, setEntries] = useState<HabitEntry[]>(dummyEntries);
  const today = new Date().toISOString().split("T")[0];

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        <Card>
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedToday}/{dummyHabits.length}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dummyAnalytics.currentStreak} days</p>
              </div>
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weekly Average</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dummyAnalytics.weeklyAverage}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Best Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dummyAnalytics.longestStreak} days</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-6 h-6 text-accent" />
            <span className="text-sm text-muted-foreground">Longest Streak</span>
          </div>
          <p className="text-4xl font-bold text-foreground">{analytics.longestStreak}</p>
          <p className="text-xs text-muted-foreground mt-2">days</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-secondary" />
            <span className="text-sm text-muted-foreground">Avg Completion</span>
          </div>
          <p className="text-4xl font-bold text-foreground">{analytics.averageCompletion}%</p>
          <p className="text-xs text-muted-foreground mt-2">this week</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Total Habits</span>
          </div>
          <p className="text-4xl font-bold text-foreground">{analytics.totalHabits}</p>
          <p className="text-xs text-muted-foreground mt-2">active</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-secondary" />
            <span className="text-sm text-muted-foreground">Best Habit</span>
          </div>
          <p className="text-4xl font-bold text-foreground">{analytics.bestHabit ? `${analytics.bestHabit.completionRate}%` : "N/A"}</p>
          <p className="text-xs text-muted-foreground mt-2">completion</p>
        </div>
      </div>

      {/* Weekly Stats and 30-Day Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Stats */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <h3 className="font-semibold text-foreground mb-6 text-lg">Weekly Completion Rate</h3>
          <div className="space-y-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={day} className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground w-12">{day}</span>
                <div className="flex-1 bg-muted rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${analytics.weeklyStats[i]}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-foreground w-12 text-right">{analytics.weeklyStats[i]}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Trend */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <h3 className="font-semibold text-foreground mb-6 text-lg">30-Day Trend</h3>
          <div className="flex items-end gap-1 h-48">
            {analytics.monthlyTrend.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                style={{ height: `${Math.max(value, 5)}%` }}
                title={`Day ${i + 1}: ${value}%`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">Last 30 days completion trend</p>
        </div>
      </div>

      {/* Habit Performance */}
      {/* {analytics.habitPerformance.length > 0 && (
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h3 className="font-semibold text-foreground mb-6 text-lg">Habit Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analytics.habitPerformance.map((habit) => (
              <div key={habit.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{habitIconOptions.find((icon) => icon.name === habit.icon)?.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {habit.name.charAt(0).toUpperCase() + (habit.name.length > 27 ? habit.name.slice(1, 25) + "..." : habit.name)}
                    </p>
                    <p className="text-xs text-muted-foreground">{habit.completedDays} days</p>
                  </div>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${habit.completionRate}%` }}
                  />
                </div>
                <p className="text-sm font-bold text-primary mt-2">{habit.completionRate}%</p>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Insights */}
      <div className="bg-card rounded-2xl p-8 border border-border">
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
      </div>
    </div>
  );
}
