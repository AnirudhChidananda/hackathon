"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Plus, Settings2 } from "lucide-react";
import { habitIconOptions } from "@/lib/dummy-data";
import { RadialChart } from "@/components/radial-chart";
import { ChartRadarDots } from "@/components/radar-chart";
import { BorderBeam } from "@/components/ui/border-beam";
import { MoodPicker } from "./mood-picker";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { startOfToday, getDay } from "date-fns";
import { useMutation } from "convex/react";
import { ShineBorder } from "@/components/ui/shine-border";
import { toast } from "sonner";
import GoalsComponent from "./goals-list";
import { AddHabitModal } from "./add-habit-modal";

export default function Dashboard({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [allHabits, setAllHabits] = useState<any[]>([]);
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const start = startOfToday();
  const fetchHabits = useQuery(api.habits.getHabits, {});
  const todayLogs = useQuery(api.habit_logs.getTodayHabitLogs, { date: start.toISOString() });
  const createHabitLog = useMutation(api.habit_logs.addHabitLog);
  const updateHabitLog = useMutation(api.habit_logs.updateHabitLog);

  const { user } = useUser();

  const todayEntries = todayLogs?.habitList ?? [];

  useEffect(() => {
    if (fetchHabits) {
      setAllHabits(fetchHabits);
    }
  }, [fetchHabits]);

  const toggleHabitCheck = (habitId: string, completed: boolean) => {
    if (allHabits && allHabits.length > 0) {
      const newEntries: any[] = [];

      if (todayLogs && todayEntries?.length > 0) {
        todayEntries.forEach((log: any) => {
          if (log.habitId === habitId) {
            newEntries.push({
              habitId: log.habitId,
              habitName: log.habitName,
              icon: log.icon,
              completed: completed,
            });
          } else {
            newEntries.push({
              habitId: log.habitId,
              habitName: log.habitName,
              icon: log.icon,
              completed: log.completed,
            });
          }
        });

        updateHabitLog({
          habitList: newEntries,
          habitLogId: todayLogs._id,
        })
          .then(() => {
            toast.success("Activity logged successfully");
          })
          .catch((error) => {
            toast.error("Failed to log habit", {
              description: error.message,
            });
          });
      } else {
        allHabits.forEach((habit) => {
          if (habit._id === habitId) {
            newEntries.push({
              habitId: habit._id,
              habitName: habit.name,
              icon: habit.icon,
              completed: completed,
            });
          } else {
            newEntries.push({
              habitId: habit._id,
              habitName: habit.name,
              icon: habit.icon,
              completed: false,
            });
          }
        });
        createHabitLog({
          habitList: newEntries,
          date: start.toISOString(),
          day: getDay(start).toString(),
        })
          .then(() => {
            toast.success("Activity logged successfully");
          })
          .catch((error) => {
            toast.error("Failed to log habit", {
              description: error.message,
            });
          });
      }
    }
  };

  const completedToday = todayEntries?.filter((entry: any) => entry.completed).length;
  const completionRate = allHabits?.length ? Math.round((completedToday / allHabits.length) * 100) : 0;

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user?.firstName}! 👋</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Let's make today amazing with your wellness habits</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="flex flex-col md:flex-row gap-6 items-center ">
          <div className="flex items-centermd:flex-row gap-4">
            <div className="w-[250px] rounded-2xl">
              <RadialChart todayEntries={todayEntries} allHabits={allHabits} />
            </div>
            {/* <div className="w-[300px] rounded-2xl">
              <ChartRadarDots />
            </div> */}
          </div>

          <div className="relative rounded-2xl">
            <MoodPicker start={start} />
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5"]} />
          </div>
        </div>
        <div className="flex w-max mb-4">{/* Mood Picker */}</div>

        {/* Motivational Message */}
      </div>
      <div className="p-6">
        {/* Header with Theme Toggle */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Today's Check-in</h1>
            <p className="text-lg text-muted-foreground">Build your best version, one habit at a time</p>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage("manage")}
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Settings2 className="w-5 h-5" />
              Manage Habits and Goals
            </button>
          </div>
        </div>
        {showAddHabitModal && <AddHabitModal onClose={setShowAddHabitModal} />}
        {/* Today's Habits */}
        {allHabits && allHabits?.length > 0 ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex flex-row  w-full items-center gap-2">
                  <div>
                    <span>Today's Habits</span>
                    <Badge variant="secondary">{completionRate}% Complete</Badge>
                    <div className="flex flex-col gap-4 items-center justify-center"></div>
                  </div>
                  {/* <button
                    onClick={() => setShowAddHabitModal(true)}
                    className="bg-secondary text-secondary-foreground px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                    ADD NEW HABITS
                  </button> */}
                </div>
              </CardTitle>
              <CardDescription>Check off your habits as you complete them throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allHabits?.map((habit) => {
                  const log = todayEntries?.find((log: any) => log.habitId === habit._id);
                  const isCompleted = log?.completed || false;

                  return (
                    <Card
                      key={habit._id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md relative ${
                        isCompleted
                          ? "hover:bg-gray-50 dark:hover:bg-gray-800 bg-linear-to-r from-green-50 to-green-100 dark:from-green-800 dark:to-green-900/20"
                          : "hover:bg-linear-to-r from-green-100 to-green-50 border-green-200 dark:from-green-900/20 dark:to-green-800 dark:bg-green-900/20 dark:border-green-800"
                      }`}
                      onClick={() => {
                        toggleHabitCheck(habit._id, !isCompleted);
                      }}
                    >
                      <CardContent className="p-4 ">
                        <div className="flex items-center justify-between ">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{habitIconOptions.find((icon) => icon.name === habit.icon)?.icon}</div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white !strikethrough">{habit.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{habit.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <CheckCircle className="h-6 w-6 text-green-500 " />
                            ) : (
                              <Circle className="h-6 w-6 text-green-200 animate-pulse" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                      {!isCompleted && (
                        <BorderBeam duration={10} delay={4} size={200} borderWidth={2} className="from-transparent via-green-500 to-transparent" />
                      )}
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent>
              <div className="flex flex-col gap-4 items-center justify-center">
                <div className="text-center text-gray-500">You currently have no habits set up</div>
                <button
                  onClick={() => setShowAddHabitModal(true)}
                  className="bg-secondary text-secondary-foreground px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  ADD NEW HABITS
                </button>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Top Section: Mood and Stats */}
        <div className="mb-8">
          <GoalsComponent />
        </div>

        <Card className="bg-linear-to-r from-blue-200 dark:from-transparent via-purple-300 dark:via-purple-800 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🌟</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-purple-100">
                  {completionRate >= 80 ? "You're crushing it today!" : "You're doing great!"}
                </h3>
                <p className="text-foreground dark:text-purple-100">
                  {completionRate >= 80
                    ? "Amazing progress! Keep up the momentum and finish strong! 💪"
                    : "Every habit you complete is a step towards a healthier, happier you. Keep going! 🚀"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Completion Progress Bar */}
        {/* <div className="bg-card rounded-2xl p-6 mb-8 border border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">Daily Progress</span>
          <span className="text-sm font-bold text-primary">
            {completedCount}/{habits.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-4">
          <div
            className="bg-linear-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div> */}
      </div>
    </div>
  );
}
