"use client";

import { useState, useEffect } from "react";

export interface Habit {
  id: number;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
  lastCompletedDate: string | null;
  createdDate: string;
  frequency: string;
}

const DEFAULT_HABITS: Habit[] = [
  {
    id: 1,
    name: "Water Intake",
    icon: "💧",
    completed: false,
    streak: 5,
    lastCompletedDate: null,
    createdDate: new Date().toISOString(),
    frequency: "daily",
  },
  {
    id: 2,
    name: "Reading",
    icon: "📚",
    completed: true,
    streak: 12,
    lastCompletedDate: new Date().toISOString(),
    createdDate: new Date().toISOString(),
    frequency: "daily",
  },
  {
    id: 3,
    name: "Walking",
    icon: "🚶",
    completed: false,
    streak: 3,
    lastCompletedDate: null,
    createdDate: new Date().toISOString(),
    frequency: "daily",
  },
  {
    id: 4,
    name: "Meditation",
    icon: "🧘",
    completed: false,
    streak: 8,
    lastCompletedDate: null,
    createdDate: new Date().toISOString(),
    frequency: "daily",
  },
];

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load habits from localStorage on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch {
        setHabits(DEFAULT_HABITS);
      }
    } else {
      setHabits(DEFAULT_HABITS);
    }
    setIsLoading(false);
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  }, [habits, isLoading]);

  const toggleHabit = (id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id) {
          const today = new Date().toDateString();
          const lastCompleted = habit.lastCompletedDate ? new Date(habit.lastCompletedDate).toDateString() : null;
          const isConsecutive = lastCompleted === today ? false : lastCompleted === new Date(Date.now() - 86400000).toDateString();

          return {
            ...habit,
            completed: !habit.completed,
            streak: !habit.completed ? (isConsecutive ? habit.streak + 1 : 1) : Math.max(0, habit.streak - 1),
            lastCompletedDate: !habit.completed ? new Date().toISOString() : habit.lastCompletedDate,
          };
        }
        return habit;
      })
    );
  };

  const addHabit = (name: string, icon: string, frequency = "daily") => {
    const newHabit: Habit = {
      id: Math.max(...habits.map((h) => h.id), 0) + 1,
      name,
      icon,
      completed: false,
      streak: 0,
      lastCompletedDate: null,
      createdDate: new Date().toISOString(),
      frequency,
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const updateHabit = (id: number, updates: Partial<Habit>) => {
    setHabits(habits.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  };

  return {
    habits,
    isLoading,
    toggleHabit,
    addHabit,
    deleteHabit,
    updateHabit,
  };
}
