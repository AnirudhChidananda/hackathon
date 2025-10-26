import { Habit, HabitEntry, User, Analytics, Badge, MotivationalMessage } from "./types";

export const habitIconOptions = [
  { name: "drop", icon: "💧" },
  { name: "book", icon: "📚" },
  { name: "walk", icon: "🚶" },
  { name: "meditate", icon: "🧘" },
  { name: "lift", icon: "💪" },
  { name: "run", icon: "🏃" },
  { name: "sleep", icon: "😴" },
  { name: "goal", icon: "🎯" },
  { name: "note", icon: "📝" },
  { name: "paint", icon: "🎨" },
  { name: "music", icon: "🎵" },
  { name: "star", icon: "⭐" },
  { name: "check", icon: "✅" },
  { name: "x", icon: "❌" },
  { name: "heart", icon: "❤️" },
  { name: "social", icon: "👥" },
  { name: "focus", icon: "🔍" },
  { name: "chart", icon: "📊" },
  // { name: "sad", icon: "😢" },
  // { name: "angry", icon: "😠" },
  // { name: "confused", icon: "😕" },
  // { name: "surprised", icon: "😲" },
  // { name: "sleepy", icon: "😴" },
];

export const moodIcons = [
  { id: "exhausted", emoji: "😴", label: "Exhausted" },
  { id: "sad", emoji: "😢", label: "Sad" },
  { id: "okay", emoji: "😐", label: "Okay" },
  { id: "good", emoji: "😊", label: "Good" },
  { id: "amazing", emoji: "🤩", label: "Amazing" },
];

export const dummyUser: User = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  timezone: "America/New_York",
  preferences: {
    theme: "system",
    notifications: true,
    reminderTime: "09:00",
  },
};

export const dummyHabits: Habit[] = [
  {
    id: "1",
    name: "Morning Exercise",
    description: "30 minutes of physical activity",
    icon: "🏃‍♂️",
    color: "bg-blue-500",
    target: 1,
    unit: "session",
    category: "health",
  },
  {
    id: "2",
    name: "Meditation",
    description: "10 minutes of mindfulness",
    icon: "🧘‍♀️",
    color: "bg-purple-500",
    target: 1,
    unit: "session",
    category: "mindfulness",
  },
  {
    id: "3",
    name: "Water Intake",
    description: "Stay hydrated throughout the day",
    icon: "💧",
    color: "bg-cyan-500",
    target: 8,
    unit: "glasses",
    category: "health",
  },
  {
    id: "4",
    name: "Journaling",
    description: "Reflect on your day",
    icon: "📝",
    color: "bg-green-500",
    target: 1,
    unit: "entry",
    category: "mindfulness",
  },
  {
    id: "5",
    name: "Read Books",
    description: "Expand your knowledge",
    icon: "📚",
    color: "bg-orange-500",
    target: 30,
    unit: "minutes",
    category: "productivity",
  },
  {
    id: "6",
    name: "Social Connection",
    description: "Connect with friends or family",
    icon: "👥",
    color: "bg-pink-500",
    target: 1,
    unit: "interaction",
    category: "social",
  },
];

export const dummyEntries: HabitEntry[] = [
  // Today's entries
  { id: "1", habitId: "1", date: "2024-01-15", completed: true, value: 1, mood: "excellent" },
  { id: "2", habitId: "2", date: "2024-01-15", completed: true, value: 1, mood: "good" },
  { id: "3", habitId: "3", date: "2024-01-15", completed: false, value: 5, mood: "neutral" },
  { id: "4", habitId: "4", date: "2024-01-15", completed: true, value: 1, mood: "good" },
  { id: "5", habitId: "5", date: "2024-01-15", completed: false, value: 0, mood: "neutral" },
  { id: "6", habitId: "6", date: "2024-01-15", completed: true, value: 1, mood: "excellent" },

  // Yesterday's entries
  { id: "7", habitId: "1", date: "2024-01-14", completed: true, value: 1, mood: "good" },
  { id: "8", habitId: "2", date: "2024-01-14", completed: true, value: 1, mood: "excellent" },
  { id: "9", habitId: "3", date: "2024-01-14", completed: true, value: 8, mood: "good" },
  { id: "10", habitId: "4", date: "2024-01-14", completed: false, value: 0, mood: "neutral" },
  { id: "11", habitId: "5", date: "2024-01-14", completed: true, value: 45, mood: "good" },
  { id: "12", habitId: "6", date: "2024-01-14", completed: true, value: 1, mood: "excellent" },

  // Previous days for analytics
  { id: "13", habitId: "1", date: "2024-01-13", completed: true, value: 1, mood: "good" },
  { id: "14", habitId: "2", date: "2024-01-13", completed: false, value: 0, mood: "neutral" },
  { id: "15", habitId: "3", date: "2024-01-13", completed: true, value: 7, mood: "good" },
  { id: "16", habitId: "4", date: "2024-01-13", completed: true, value: 1, mood: "excellent" },
  { id: "17", habitId: "5", date: "2024-01-13", completed: true, value: 30, mood: "good" },
  { id: "18", habitId: "6", date: "2024-01-13", completed: false, value: 0, mood: "neutral" },
];

export const dummyAnalytics: Analytics = {
  totalHabits: 6,
  completedToday: 4,
  completionRate: 67,
  currentStreak: 3,
  longestStreak: 12,
  weeklyAverage: 78,
  monthlyTrend: "up",
};

export const dummyBadges: Badge[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first habit",
    icon: "🎯",
    earned: true,
    earnedDate: "2024-01-01",
    requirement: "Complete any habit once",
  },
  {
    id: "2",
    name: "Streak Master",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-01-10",
    requirement: "7-day streak",
  },
  {
    id: "3",
    name: "Wellness Warrior",
    description: "Complete all habits in a day",
    icon: "⚔️",
    earned: false,
    requirement: "Complete all habits in one day",
  },
  {
    id: "4",
    name: "Mindful Master",
    description: "Complete meditation 30 days in a row",
    icon: "🧘‍♂️",
    earned: false,
    requirement: "30-day meditation streak",
  },
];

export const dummyMessages: MotivationalMessage[] = [
  {
    id: "1",
    message: "Great job on your morning exercise! You're building momentum for an amazing day! 💪",
    type: "celebration",
    trigger: "exercise_completed",
  },
  {
    id: "2",
    message: "You're on a 3-day streak! Keep it up - consistency is the key to success! 🌟",
    type: "encouragement",
    trigger: "streak_milestone",
  },
  {
    id: "3",
    message: "Don't forget to stay hydrated! Your body will thank you for that extra glass of water. 💧",
    type: "reminder",
    trigger: "water_reminder",
  },
  {
    id: "4",
    message: "Ready for a new challenge? Try adding 5 more minutes to your reading time today! 📚",
    type: "challenge",
    trigger: "reading_improvement",
  },
];
