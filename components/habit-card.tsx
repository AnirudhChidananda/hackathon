"use client";

import { habitIconOptions } from "@/lib/dummy-data";

interface Habit {
  id: number;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
}

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
  //   deleteHabit: (id: number) => void;
}

export function HabitCard({
  habit,
  onToggle,
  //  deleteHabit
}: HabitCardProps) {
  return (
    <button
      onClick={() => onToggle()}
      className={`w-full p-4 rounded-2xl border-2 transition-all ${
        habit.completed ? "bg-primary/10 border-primary glow-pulse" : "bg-card border-border hover:border-primary/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{habitIconOptions.find((icon) => icon.name === habit.icon)?.icon}</span>
          <div className="text-left">
            <p className="font-semibold text-foreground">
              {habit.name.charAt(0).toUpperCase() + (habit.name.length > 27 ? habit.name.slice(1, 25) + "..." : habit.name)}
            </p>
            <p className="text-xs text-muted-foreground">Streak: {habit.streak} days</p>
          </div>
        </div>
        <div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
            habit.completed ? "bg-primary border-primary text-primary-foreground" : "border-border"
          }`}
        >
          {habit.completed && <span>✓</span>}
        </div>
      </div>

      {/* <Trash2 onClick={() => deleteHabit(habit.id)} className="w-4 h-4 text-destructive hover:bg-destructive/30" /> */}
    </button>
  );
}
