export interface Habit {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  target: number;
  unit: string;
  category: "health" | "mindfulness" | "productivity" | "social";
}

export interface HabitEntry {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  value: number;
  notes?: string;
  mood?: "excellent" | "good" | "neutral" | "poor" | "terrible";
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  timezone: string;
  preferences: {
    theme: "light" | "dark" | "system";
    notifications: boolean;
    reminderTime: string;
  };
}

export interface Analytics {
  totalHabits: number;
  completedToday: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  weeklyAverage: number;
  monthlyTrend: "up" | "down" | "stable";
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  requirement: string;
}

export interface MotivationalMessage {
  id: string;
  message: string;
  type: "encouragement" | "celebration" | "reminder" | "challenge";
  trigger: string;
}
