"use client";

import { User, Settings, Share2, Plus, Trash2, CheckCircle, Circle, Edit } from "lucide-react";
import { useState } from "react";
import { useGoals } from "@/hooks/use-goals";
import { AddHabitModal } from "./add-habit-modal";
// import { addHabit } from "@/convex/habits";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { habitIconOptions } from "@/lib/dummy-data";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Badge } from "./ui/badge";
import { EditHabitModal } from "./edit-habit-modal";
import { toast } from "sonner";

export function Profile() {
  const allHabits = useQuery(api.habits.getHabits, {});
  const [habitToDelete, setHabitToDelete] = useState<Id<"habits"> | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [habitData, setHabitData] = useState<Doc<"habits"> | null>(null);
  const deleteHabit = useMutation(api.habits.deleteHabit);
  const updateHabit = useMutation(api.habits.updateHabit);

  const { goals, addGoal, deleteGoal, updateGoal } = useGoals();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleUpdate = (updates: { name: string; icon: string; description: string }) => {
    if (allHabits && habitData) {
      updateHabit({ habitId: habitData?._id, name: updates.name, icon: updates.icon, description: updates.description }).then(() => {
        toast.success("Habit updated successfully");
        setHabitData(null);
      });
      // allHabits.;
    }
  };

  const handleDelete = (habitId: Id<"habits">) => {
    console.log("habitId", habitId);
    if (habitId) {
      setHabitToDelete(habitId);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = (habitId: Id<"habits">) => {
    if (habitId) {
      deleteHabit({ habitId: habitId });
      toast.success("Habit deleted successfully");
    }
    setShowDeleteModal(false);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetValue: 7,
    category: "weekly" as const,
  });

  const handleAddGoal = () => {
    if (formData.title.trim()) {
      addGoal({
        title: formData.title,
        description: formData.description,
        targetValue: formData.targetValue,
        currentValue: 0,
        category: formData.category,
      });
      setFormData({ title: "", description: "", targetValue: 7, category: "weekly" });
      setShowAddGoal(false);
    }
  };

  // ConfirmDeleteModal component: can be reused for deleting habits, goals, etc.
  function ConfirmDeleteModal({
    habitToDelete,
    open,
    title = "Delete",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    onConfirm,
    onCancel,
    confirmText = "Delete",
    cancelText = "Cancel",
  }: {
    habitToDelete: Id<"habits"> | null;
    open: boolean;
    title?: string;
    message?: string;
    onConfirm: (habitId: Id<"habits">) => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
  }) {
    if (!open) return null;

    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-card p-8 rounded-2xl shadow-xl border border-border min-w-[320px] animate-in fade-in zoom-in">
          <h2 className="text-xl font-semibold text-destructive mb-3">{title}</h2>
          <p className="text-muted-foreground mb-6">{message}</p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground font-medium transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                if (habitToDelete) {
                  onConfirm(habitToDelete);
                  onCancel();
                }
              }}
              className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium hover:bg-destructive/80 transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {habitData === null ? (
        <>
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Plan your life</h1>
                <p className="text-lg text-muted-foreground">Manage your habits and goals </p>
              </div>
              {allHabits && allHabits?.length > 0 && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-secondary text-secondary-foreground px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  ADD NEW HABIT
                </button>
              )}
            </div>
            {/* Habits Grid */}

            {allHabits && allHabits?.length > 0 ? (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>Plan Habits</span>
                  </CardTitle>
                  <CardDescription>Organize your habits and flow through your day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allHabits?.map((habit) => {
                      // const entry = getHabitEntry(habit._id);
                      // const isCompleted = entry?.completed || false;
                      const isCompleted = false;

                      return (
                        <Card key={habit._id} className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{habitIconOptions.find((icon) => icon.name === habit.icon)?.icon}</div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{habit.name}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{habit.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Edit className="h-6 w-6 text-blue-400" onClick={() => setHabitData(habit)} />
                                <Trash2 className="h-6 w-6 text-red-400" onClick={() => handleDelete(habit._id)} />
                              </div>
                            </div>
                          </CardContent>
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
                      onClick={() => setShowAddModal(true)}
                      className="bg-secondary text-secondary-foreground px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                      ADD NEW HABITS
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add Habit Button */}

            {/* Add Habit Modal */}
            {showAddModal && <AddHabitModal onClose={setShowAddModal} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Goals Section */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-foreground text-lg">Your Goals</h3>
                    <button
                      onClick={() => setShowAddGoal(!showAddGoal)}
                      className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Add Goal Form */}
                  {showAddGoal && (
                    <div className="mb-6 p-6 bg-muted rounded-lg space-y-4">
                      <input
                        type="text"
                        placeholder="Goal title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <textarea
                        placeholder="Description (optional)"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        rows={3}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="Target value"
                          value={formData.targetValue}
                          onChange={(e) => setFormData({ ...formData, targetValue: Number.parseInt(e.target.value) })}
                          className="px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                          className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleAddGoal}
                          className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                        >
                          Add Goal
                        </button>
                        <button
                          onClick={() => setShowAddGoal(false)}
                          className="flex-1 px-4 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Goals List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goals.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8 col-span-full">No goals yet. Add one to get started!</p>
                    ) : (
                      goals.map((goal) => (
                        <div key={goal.id} className="p-6 bg-muted rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-lg">{goal.title}</p>
                              {goal.description && <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>}
                            </div>
                            <button
                              onClick={() => deleteGoal(goal.id)}
                              className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <span>
                              {goal.currentValue}/{goal.targetValue} {goal.category}
                            </span>
                            <span className="text-primary font-semibold">{Math.round((goal.currentValue / goal.targetValue) * 100)}%</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* User Card and Quick Stats */}
            <div className="w-max py-8">
              <div className="space-y-3">
                <button className="mt-4 w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:bg-muted transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-foreground font-medium">Share Progress</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EditHabitModal habitData={habitData} onUpdate={handleUpdate} onClose={() => setHabitData(null)} />
        // <HabitDetails allHabits={allHabits ?? []} habitId={selectedHabit} onBack={() => setSelectedHabit(null)} />
      )}

      <ConfirmDeleteModal
        habitToDelete={habitToDelete}
        open={showDeleteModal}
        title="Delete Habit"
        message="Are you sure you want to delete this habit? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setHabitToDelete(null);
        }}
      />
    </>
  );
}
