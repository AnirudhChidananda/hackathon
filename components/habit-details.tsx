"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, Edit2, Trash2, TrendingUp } from "lucide-react";
import { useHabitHistory } from "@/hooks/use-habit-history";
import { EditHabitModal } from "./edit-habit-modal";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { habitIconOptions } from "@/lib/dummy-data";

interface HabitDetailsProps {
  habit: Doc<"habits">;
  onBack: () => void;
}

export function HabitDetails({ habit, onBack }: HabitDetailsProps) {
  const deleteHabit = useMutation(api.habits.deleteHabit);
  const updateHabit = useMutation(api.habits.updateHabit);
  const { history } = useHabitHistory();
  const [showEditModal, setShowEditModal] = useState(false);

  // Calculate statistics
  const last30Days = useMemo(() => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      // const isCompleted = history[dateStr]?.[habit._id] || false;
      const isCompleted = false;
      days.push({ date: dateStr, completed: isCompleted });
    }
    return days;
  }, [history, habit]);

  const completedDays = last30Days.filter((d) => d.completed).length;
  const completionRate = Math.round((completedDays / 30) * 100);
  const longestStreak = useMemo(() => {
    let current = 0;
    let longest = 0;
    for (const day of last30Days) {
      if (day.completed) {
        current++;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    }
    return longest;
  }, [last30Days]);

  const handleDelete = () => {
    if (confirm(`Delete "${habit?.name}"? This action cannot be undone.`)) {
      deleteHabit({ habitId: habit._id });
      onBack();
    }
  };

  const handleUpdate = (updates: Partial<Doc<"habits">>) => {
    updateHabit({ habitId: habit._id, name: habit.name, icon: habit.icon, description: habit.description });
    setShowEditModal(false);
  };

  if (!habit) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-6">
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <p className="text-muted-foreground">Habit not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <div className="flex gap-2">
          <button onClick={() => setShowEditModal(true)} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Edit habit">
            <Edit2 className="w-5 h-5 text-muted-foreground" />
          </button>
          <button onClick={handleDelete} className="p-2 hover:bg-destructive/20 rounded-lg transition-colors" title="Delete habit">
            <Trash2 className="w-5 h-5 text-destructive" />
          </button>
        </div>
      </div>

      {/* Habit Header */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-6">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{habitIconOptions.find((icon) => icon.name === habit.icon)?.icon}</span>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-1">{habit.name}</h1>
            <p className="text-sm text-muted-foreground capitalize">{habit.description}</p>
          </div>
          {/* <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
              habit.completed ? "bg-primary border-primary text-primary-foreground" : "border-border"
            }`}
          >
            {habit.completed && <span>✓</span>}
          </div> */}
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-2xl p-4 border border-border text-center">
          <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
          <p className="text-2xl font-bold text-primary">0</p>
          <p className="text-xs text-muted-foreground mt-1">days</p>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border text-center">
          <p className="text-xs text-muted-foreground mb-1">Longest Streak</p>
          <p className="text-2xl font-bold text-secondary">{longestStreak}</p>
          <p className="text-xs text-muted-foreground mt-1">days</p>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border text-center">
          <p className="text-xs text-muted-foreground mb-1">30-Day Rate</p>
          <p className="text-2xl font-bold text-accent">{completionRate}%</p>
          <p className="text-xs text-muted-foreground mt-1">completed</p>
        </div>
      </div>

      {/* 30-Day Heatmap */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Last 30 Days</h3>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {last30Days.map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg transition-all ${day.completed ? "bg-primary" : "bg-muted"} hover:scale-110 cursor-pointer`}
              title={`${day.date}: ${day.completed ? "Completed" : "Not completed"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted" />
            <span>Not completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span>Completed</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-6">
        <h3 className="font-semibold text-foreground mb-4">Statistics</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Completions</span>
            <span className="font-semibold text-foreground">{completedDays} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Completion Rate</span>
            <span className="font-semibold text-foreground">{completionRate}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Created</span>
            <span className="font-semibold text-foreground">{new Date(habit.createdDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Days Active</span>
            <span className="font-semibold text-foreground">
              {Math.floor((Date.now() - new Date(habit.createdDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </span>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && <EditHabitModal habit={habit} onUpdate={handleUpdate} onClose={() => setShowEditModal(false)} />}
    </div>
  );
}
