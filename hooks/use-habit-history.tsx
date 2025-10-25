"use client";

import { useState, useEffect } from "react";

export interface HabitHistory {
  [date: string]: {
    [habitId: number]: boolean;
  };
}

export function useHabitHistory() {
  const [history, setHistory] = useState<HabitHistory>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedHistory = localStorage.getItem("habitHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        setHistory({});
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("habitHistory", JSON.stringify(history));
    }
  }, [history, isLoading]);

  const recordHabitCompletion = (date: string, habitId: number, completed: boolean) => {
    setHistory((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [habitId]: completed,
      },
    }));
  };

  const getDateCompletion = (date: string) => {
    return history[date] || {};
  };

  const getMonthStats = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const stats: { [day: number]: { completed: number; total: number } } = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = new Date(year, month, day).toISOString().split("T")[0];
      const dayHistory = history[dateStr] || {};
      const completed = Object.values(dayHistory).filter(Boolean).length;
      const total = Object.keys(dayHistory).length || 1;

      stats[day] = { completed, total };
    }

    return stats;
  };

  return {
    history,
    isLoading,
    recordHabitCompletion,
    getDateCompletion,
    getMonthStats,
  };
}
