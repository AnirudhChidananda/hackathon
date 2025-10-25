"use client";

import { useState } from "react";

interface OnboardingGoalsProps {
  userData: any;
  onNext: (data?: any) => void;
}

export function OnboardingGoals({ userData, onNext }: OnboardingGoalsProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(userData.goals || []);

  const goalOptions = [
    { id: "health", label: "Improve Health", icon: "💪" },
    { id: "mindfulness", label: "Mindfulness", icon: "🧘" },
    { id: "productivity", label: "Boost Productivity", icon: "⚡" },
    { id: "learning", label: "Learn & Grow", icon: "📚" },
    { id: "fitness", label: "Get Fit", icon: "🏃" },
    { id: "sleep", label: "Better Sleep", icon: "😴" },
  ];

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  };

  const handleNext = () => {
    onNext({ goals: selectedGoals });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">What are your goals?</h2>
        <p className="text-muted-foreground">Select one or more areas you want to focus on</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {goalOptions.map((goal) => (
          <button
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selectedGoals.includes(goal.id) ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="text-2xl mb-2">{goal.icon}</div>
            <p className="font-semibold text-sm text-foreground">{goal.label}</p>
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedGoals.length === 0}
        className="w-full py-3 px-4 rounded-xl bg-secondary text-secondary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-semibold"
      >
        Continue with {selectedGoals.length} goal{selectedGoals.length !== 1 ? "s" : ""}
      </button>
    </div>
  );
}
