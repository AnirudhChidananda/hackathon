"use client";

import { Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { AddHabitModal } from "./add-habit-modal";
// import { addHabit } from "@/convex/habits";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { habitIconOptions } from "@/lib/dummy-data";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { EditHabitModal } from "./edit-habit-modal";
import { toast } from "sonner";
import GoalsComponent from "./goals-list";

export function Profile() {
  const allHabits = useQuery(api.habits.getHabits, {});

  const [habitToDelete, setHabitToDelete] = useState<Id<"habits"> | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [habitData, setHabitData] = useState<Doc<"habits"> | null>(null);
  const deleteHabit = useMutation(api.habits.deleteHabit);
  const updateHabit = useMutation(api.habits.updateHabit);

  // const { goals, addGoal, deleteGoal, updateGoal } = useGoals();
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
  });

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

            <GoalsComponent />
            {/* User Card and Quick Stats */}
            {/* <div className="w-max py-8">
              <div className="space-y-3">
                <button className="mt-4 w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:bg-muted transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-foreground font-medium">Share Progress</span>
                </button>
              </div>
            </div> */}
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
