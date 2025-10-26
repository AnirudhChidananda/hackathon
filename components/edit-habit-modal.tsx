"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { habitIconOptions } from "@/lib/dummy-data";

interface EditHabitModalProps {
  habitData: Doc<"habits"> | null;
  onUpdate: (updates: { name: string; icon: string; description: string }) => void;
  onClose: () => void;
}

export function EditHabitModal({ habitData, onUpdate, onClose }: EditHabitModalProps) {
  const [habitName, setHabitName] = useState(habitData?.name ?? "");
  const [habitDescription, setHabitDescription] = useState(habitData?.description ?? "");
  const [selectedIcon, setSelectedIcon] = useState(habitData?.icon ?? "");

  const handleUpdate = () => {
    if (habitName.trim()) {
      onUpdate({
        name: habitName,
        icon: selectedIcon,
        description: habitDescription,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="w-full bg-card rounded-t-3xl p-6 border-t border-border animate-in slide-in-from-bottom">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Edit Habit</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Icon Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-3">Icon</label>
          <div className="grid grid-cols-6 gap-2">
            {habitIconOptions.map((icon) => (
              <button
                key={icon.name}
                onClick={() => setSelectedIcon(icon.name)}
                className={`p-3 rounded-xl text-2xl transition-all ${
                  selectedIcon === icon.name ? "bg-primary/20 ring-2 ring-primary" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {icon.icon}
              </button>
            ))}
          </div>
        </div>
        {/* Habit Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">Habit Name</label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Habit Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">Habit Description</label>
          <textarea
            value={habitDescription}
            onChange={(e) => setHabitDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 py-3 px-4 rounded-xl border border-border text-foreground hover:bg-muted transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={!habitName.trim()}
            className="cursor-pointer flex-1 py-3 px-4 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
