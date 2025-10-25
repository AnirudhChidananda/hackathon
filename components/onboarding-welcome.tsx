"use client";

interface OnboardingWelcomeProps {
  userData: any;
  onNext: (data?: any) => void;
}

export function OnboardingWelcome({ userData, onNext }: OnboardingWelcomeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Welcome to MindTrack</h2>
        <p className="text-lg text-muted-foreground">Build consistent daily habits and transform your wellness journey</p>
      </div>

      <div className="space-y-4">
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-semibold text-foreground mb-1">Track Your Progress</h3>
          <p className="text-sm text-muted-foreground">Monitor daily habits and build streaks</p>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-semibold text-foreground mb-1">Visualize Growth</h3>
          <p className="text-sm text-muted-foreground">See your progress through analytics and trends</p>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="text-3xl mb-2">🎉</div>
          <h3 className="font-semibold text-foreground mb-1">Stay Motivated</h3>
          <p className="text-sm text-muted-foreground">Celebrate milestones and maintain consistency</p>
        </div>
      </div>

      <div className="bg-secondary/20 rounded-2xl p-4 border border-secondary/30">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Let's get started!</span> We'll help you set up your first habits in just a few steps.
        </p>
      </div>
    </div>
  );
}
