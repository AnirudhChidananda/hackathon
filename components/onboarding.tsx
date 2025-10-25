"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { OnboardingWelcome } from "./onboarding-welcome";
import { OnboardingGoals } from "./onboarding-goals";
import { OnboardingHabits } from "./onboarding-habits";
import { OnboardingFrequency } from "./onboarding-frequency";
import { OnboardingComplete } from "./onboarding-complete";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    goals: [] as string[],
    habits: [] as string[],
    frequency: "daily" as string,
  });

  const steps = [
    { component: OnboardingWelcome, title: "Welcome" },
    { component: OnboardingGoals, title: "Your Goals" },
    { component: OnboardingHabits, title: "Create Habits" },
    { component: OnboardingFrequency, title: "Set Frequency" },
    { component: OnboardingComplete, title: "All Set" },
  ];

  const CurrentStep = steps[step].component;

  const handleNext = (data?: Partial<typeof userData>) => {
    if (data) {
      setUserData({ ...userData, ...data });
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Save onboarding completion to localStorage
      localStorage.setItem("onboardingComplete", "true");
      localStorage.setItem("userData", JSON.stringify(userData));
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Progress Bar */}
      <div className="h-1 bg-muted">
        <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Step {step + 1} of {steps.length}
          </p>
          <CurrentStep userData={userData} onNext={handleNext} />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="flex-1 py-3 px-4 rounded-xl border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => handleNext()}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-semibold"
          >
            {step === steps.length - 1 ? "Get Started" : "Next"}
            {step < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
