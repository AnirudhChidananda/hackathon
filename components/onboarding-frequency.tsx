"use client";

import { useState } from "react";

interface OnboardingFrequencyProps {
  userData: any;
  onNext: (data?: any) => void;
}

export function OnboardingFrequency({ userData, onNext }: OnboardingFrequencyProps) {
  const [frequency, setFrequency] = useState(userData.frequency || "daily");

  const frequencyOptions = [
    { id: "daily", label: "Daily", description: "Every day", icon: "📅" },
    { id: "weekdays", label: "Weekdays", description: "Monday to Friday", icon: "💼" },
    { id: "weekends", label: "Weekends", description: "Saturday & Sunday", icon: "🎉" },
    { id: "custom", label: "Custom", description: "Choose specific days", icon: "⚙️" },
  ];

  const handleNext = () => {
    onNext({ frequency });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">How often do you want to track?</h2>
        <p className="text-muted-foreground">Choose your preferred tracking frequency</p>
      </div>

      <div className="space-y-3">
        {frequencyOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setFrequency(option.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              frequency === option.id ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{option.icon}</span>
              <div>
                <p className="font-semibold text-foreground">{option.label}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-accent/20 rounded-2xl p-4 border border-accent/30">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Pro tip:</span> You can change this anytime in your profile settings.
        </p>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-3 px-4 rounded-xl bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity font-semibold"
      >
        Continue
      </button>
    </div>
  );
}
