"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { habitIconOptions } from "@/lib/dummy-data";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

interface AddHabitModalProps {
  onClose: (show: boolean) => void;
}

export function AddHabitModal({ onClose }: AddHabitModalProps) {
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("star");
  const { user } = useUser();
  const createHabit = useMutation(api.habits.addHabit);

  const handleAdd = async () => {
    if (habitName.trim()) {
      await createHabit({ name: habitName, icon: selectedIcon, createdDate: new Date().toISOString(), description: habitDescription })
        .then(() => {
          setHabitName("");
          setSelectedIcon("star");
          onClose(false);
          toast.success("Habit added successfully");
        })
        .catch((error) => {
          console.error("Error adding habit", error);
          toast.error("Error adding habit");
        });
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="w-full bg-card rounded-t-3xl p-6 border-t border-border animate-in slide-in-from-bottom">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Add New Habit</h2>
          <button onClick={() => onClose(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Icon Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-3">Choose Icon</label>
          <div className="grid grid-cols-6 gap-2">
            {habitIconOptions.map((icon) => (
              <button
                key={icon.name}
                onClick={() => setSelectedIcon(icon.name)}
                className={`p-3 rounded-xl text-2xl transition-all ${
                  selectedIcon === icon.name ? "bg-primary/20 ring-2 ring-primary " : "bg-muted hover:bg-muted/80"
                }`}
              >
                {icon.icon}
              </button>
            ))}
          </div>
        </div>
        {/* Habit Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">Habit Name</label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            // onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            placeholder="e.g., Morning Jog"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">Habit Description</label>
          <textarea
            value={habitDescription}
            onChange={(e) => setHabitDescription(e.target.value)}
            // onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            placeholder="e.g., I want to jog for 30 minutes in the morning to improve my health"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        </div>

        {/* Preview */}
        <div className="bg-muted rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Preview</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl">{habitIconOptions.find((icon) => icon.name === selectedIcon)?.icon}</span>
            <span className="text-lg font-semibold text-foreground">
              {habitName || "Insert new habit name"} {!habitName && <span className="text-red-500 font-bold ml-1">*</span>}
            </span>{" "}
          </div>
          <span className="  text-foreground">{habitDescription || "Insert new habit description"}</span>
          {!habitDescription && <span className="text-red-500 font-bold ml-1">*</span>}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onClose(false)}
            className="flex-1 py-3 px-4 rounded-xl border border-border text-foreground hover:bg-muted transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!habitName.trim() || !habitDescription.trim()}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-semibold"
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}
