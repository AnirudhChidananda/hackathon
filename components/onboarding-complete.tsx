"use client";

interface OnboardingCompleteProps {
  userData: any;
  onNext: (data?: any) => void;
}

export function OnboardingComplete({ userData, onNext }: OnboardingCompleteProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl mb-4">🎉</div>

      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">You're all set!</h2>
        <p className="text-muted-foreground">Your MindTrack journey is about to begin</p>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
        <div className="text-left">
          <p className="text-sm text-muted-foreground mb-1">Your Setup</p>
          <div className="space-y-2">
            <p className="text-foreground">
              <span className="font-semibold">{userData.goals?.length || 0}</span> goal
              {userData.goals?.length !== 1 ? "s" : ""}
            </p>
            <p className="text-foreground">
              <span className="font-semibold">{userData.habits?.length || 0}</span> habit
              {userData.habits?.length !== 1 ? "s" : ""}
            </p>
            <p className="text-foreground">
              <span className="font-semibold capitalize">{userData.frequency}</span> tracking
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Start tracking today and build consistency. Remember, every small step counts!</p>
        <div className="flex gap-2 text-2xl justify-center">
          <span>💪</span>
          <span>🎯</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
}
