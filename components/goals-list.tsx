import { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Slider } from "@heroui/slider";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

export default function GoalsComponent() {
  const allGoals = useQuery(api.goals.getAllGoals, {});
  const addGoal = useMutation(api.goals.addGoal);
  const deleteGoal = useMutation(api.goals.deleteGoal);
  const updateGoal = useMutation(api.goals.updateGoal);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showEditGoal, setShowEditGoal] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState<any>(null);
  const [showDeleteGoal, setShowDeleteGoal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Id<"goals"> | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    progress: 10,
  });

  const handleAddGoal = () => {
    if (formData.title.trim()) {
      addGoal({
        title: formData.title,
        description: formData.description,
        progress: formData.progress,
        active: true,
        date: new Date().toISOString(),
      });
      setFormData({ title: "", description: "", progress: 10 });
      setShowAddGoal(false);
    }
  };

  const handleUpdateGoal = (updateData: any) => {
    const descriptionData = updateData.description ?? "";
    if (updateData) {
      updateGoal({ goalId: updateData._id, title: updateData.title, description: descriptionData, progress: updateData.progress, active: true })
        .then(() => {
          toast.success("Goal updated successfully");
          setShowEditGoal(false);
          setGoalToEdit(null);
        })
        .catch(() => {
          toast.error("Failed to update goal");
        });
    }
  };

  const handleConfirmDeleteGoal = (goalId: Id<"goals">) => {
    if (goalId) {
      deleteGoal({ goalId: goalId })
        .then(() => {
          toast.success("Goal deleted successfully");
          setShowDeleteGoal(false);
          setGoalToDelete(null);
        })
        .catch(() => {
          toast.error("Failed to delete goal");
        });
    }
  };

  // ConfirmDeleteModal component: can be reused for deleting habits, goals, etc.
  function ConfirmDeleteModal({
    goalToDelete,
    open,
    title = "Delete",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    onConfirm,
    onCancel,
    confirmText = "Delete",
    cancelText = "Cancel",
  }: {
    goalToDelete: Id<"goals"> | null;
    open: boolean;
    title?: string;
    message?: string;
    onConfirm: (goalId: Id<"goals">) => void;
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
                if (goalToDelete) {
                  onConfirm(goalToDelete);
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
    <div className="w-full">
      {/* Goals Section */}
      <div className="">
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-foreground text-lg">Your Goals</h3>
              <div className="flex text-sm text-muted-foreground  gap-2">Goals help you stay focused and motivated.</div>
            </div>

            <button
              onClick={() => setShowAddGoal(!showAddGoal)}
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              ADD NEW GOAL
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
                className="w-full px-4 py-3 bg-white dark:bg-black/50  border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                rows={3}
              />
              <div className="w-full pb-8">
                <Slider
                  classNames={{
                    track: "bg-primary/20 !rounded-lg cursor-pointer",
                    thumb: "bg-purple-100 dark:bg-black !rounded-lg border-4 border-green-500 cursor-pointer",
                    value: "text-primary",
                    base: "rounded-lg",
                    filler: "rounded-lg bg-linear-to-r from-green-50 to-green-100 dark:from-green-300 dark:to-green-500 cursor-pointer",
                    label: "text-foreground py-2",
                  }}
                  defaultValue={0}
                  value={formData.progress}
                  onChange={(value) => setFormData({ ...formData, progress: value as number })}
                  formatOptions={{ style: "percent" }}
                  label="Current Progress"
                  marks={[
                    {
                      value: 20,
                      label: "20%",
                    },
                    {
                      value: 50,
                      label: "50%",
                    },
                    {
                      value: 80,
                      label: "80%",
                    },
                  ]}
                  maxValue={100}
                  minValue={0}
                  step={10}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-4 py-3 bg-muted hover:bg-indigo-950 text-muted-foreground rounded-lg  transition-colors font-medium cursor-pointer border-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGoal}
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer"
                >
                  Add Goal
                </button>
              </div>
            </div>
          )}

          {showEditGoal && (
            <div className="mb-6 p-6 bg-muted rounded-lg space-y-4">
              <input
                type="text"
                placeholder="Goal title"
                value={goalToEdit?.title}
                onChange={(e) => setGoalToEdit({ ...goalToEdit, title: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-black/50  border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Description"
                value={goalToEdit?.description}
                onChange={(e) => setGoalToEdit({ ...goalToEdit, description: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                rows={3}
              />
              <div className="w-full pb-8">
                <Slider
                  classNames={{
                    track: "bg-primary/20 !rounded-lg cursor-pointer",
                    thumb: "bg-purple-100 dark:bg-black !rounded-lg border-4 border-green-500 cursor-pointer",
                    value: "text-primary",
                    base: "rounded-lg",
                    filler: "rounded-lg bg-linear-to-r from-green-50 to-green-100 dark:from-green-300 dark:to-green-500 cursor-pointer",
                    label: "text-foreground py-2",
                  }}
                  defaultValue={0}
                  value={goalToEdit?.progress}
                  onChange={(value) => {
                    setGoalToEdit({ ...goalToEdit, progress: value as number });
                  }}
                  formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
                  label="Current Progress"
                  marks={[
                    {
                      value: 20,
                      label: "20%",
                    },
                    {
                      value: 50,
                      label: "50%",
                    },
                    {
                      value: 80,
                      label: "80%",
                    },
                  ]}
                  maxValue={100}
                  minValue={0}
                  step={10}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowEditGoal(false);
                    setGoalToEdit(null);
                  }}
                  className="flex-1 px-4 py-3 bg-muted hover:bg-indigo-950 text-muted-foreground rounded-lg  transition-colors font-medium cursor-pointer border-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateGoal(goalToEdit)}
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer"
                >
                  Update Goal
                </button>
              </div>
            </div>
          )}

          {/* {goalToEdit && <EditGoalModal goalToEdit={goalToEdit} onUpdate={handleUpdateGoal} onClose={() => setGoalToEdit(null)} />} */}

          {/* Goals List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allGoals && allGoals?.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8 col-span-full">No goals yet. Add one to get started!</p>
            ) : (
              allGoals &&
              allGoals.map((goal) => (
                <div key={goal._id} className="p-6 bg-background rounded-lg border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="capitalize text-foreground font-bold text-lg">{goal.title}</p>
                      {goal.description && <p className="text-xs text-muted-foreground font-extrabold mt-1">{goal.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setShowEditGoal(true);
                          setGoalToEdit(goal);
                        }}
                        className="p-2 text-foreground hover:bg-foreground/10 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteGoal(true);
                          setGoalToDelete(goal._id);
                        }}
                        className="p-2 text-foreground hover:bg-foreground/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive cursor-pointer" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end text-sm  text-foreground font-extrabold mb-3">
                    {/* <span>{goal.progress}/100</span> */}
                    <span className="text-primary font-semibold">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-white dark:bg-background rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2 transition-all" style={{ width: `${goal.progress}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        goalToDelete={goalToDelete}
        open={showDeleteGoal}
        onConfirm={handleConfirmDeleteGoal}
        onCancel={() => setShowDeleteGoal(false)}
      />
    </div>
  );
}
