"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface OnboardingHabitsProps {
  userData: any;
  onNext: (data?: any) => void;
}

export function OnboardingHabits({ userData, onNext }: OnboardingHabitsProps) {
  const [habits, setHabits] = useState<string[]>(userData.habits || []);
  const [input, setInput] = useState("");

  const suggestedHabits = ["Drink Water", "Exercise", "Meditate", "Read", "Journal", "Sleep 8 hours", "Stretch", "Walk"];

  const addHabit = (habit: string) => {
    if (habit.trim() && !habits.includes(habit)) {
      setHabits([...habits, habit]);
      setInput("");
    }
  };

  const removeHabit = (habit: string) => {
    setHabits(habits.filter((h) => h !== habit));
  };

  const handleNext = () => {
    onNext({ habits });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Create your first habits</h2>
        <p className="text-muted-foreground">Add habits you want to track daily</p>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addHabit(input)}
          placeholder="Enter a habit..."
          className="flex-1 px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={() => addHabit(input)}
          className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Selected Habits */}
      {habits.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">Your habits ({habits.length})</p>
          <div className="space-y-2">
            {habits.map((habit) => (
              <div key={habit} className="flex items-center justify-between bg-card rounded-xl p-3 border border-border">
                <span className="text-foreground">{habit}</span>
                <button onClick={() => removeHabit(habit)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div>
        <p className="text-sm font-semibold text-muted-foreground mb-2">Suggested habits</p>
        <div className="flex flex-wrap gap-2">
          {suggestedHabits.map((habit) => (
            <button
              key={habit}
              onClick={() => addHabit(habit)}
              disabled={habits.includes(habit)}
              className="px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              + {habit}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={habits.length === 0}
        className="w-full py-3 px-4 rounded-xl bg-secondary text-secondary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-semibold"
      >
        Continue with {habits.length} habit{habits.length !== 1 ? "s" : ""}
      </button>
    </div>
  );
}
