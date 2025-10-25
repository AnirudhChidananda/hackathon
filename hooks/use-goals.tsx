"use client";

import { useState, useEffect } from "react";

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  category: "daily" | "weekly" | "monthly";
  createdAt: string;
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("mindtrack-goals");
    if (stored) {
      try {
        setGoals(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse goals:", e);
      }
    }
  }, []);

  const saveGoals = (newGoals: Goal[]) => {
    setGoals(newGoals);
    if (mounted) {
      localStorage.setItem("mindtrack-goals", JSON.stringify(newGoals));
    }
  };

  const addGoal = (goal: Omit<Goal, "id" | "createdAt">) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveGoals([...goals, newGoal]);
    return newGoal;
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    saveGoals(goals.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  const deleteGoal = (id: string) => {
    saveGoals(goals.filter((g) => g.id !== id));
  };

  return { goals, addGoal, updateGoal, deleteGoal };
}
