"use client";

import { Edit, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getDay } from "date-fns";
import { toast } from "sonner";
import { log } from "console";
import { moodIcons } from "@/lib/dummy-data";

export function MoodPicker({ start }: { start: Date }) {
  const [isLoading, setIsLoading] = useState(false);
  const addMoodLog = useMutation(api.mood_logs.addMoodLog);
  const todayMoodLogs = useQuery(api.mood_logs.getTodayMoodLogs, { date: start.toISOString() });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [currentMood, setCurrentMood] = useState<string | null>(null);

  const handleAddMoodLog = () => {
    setIsLoading(true);

    if (!currentMood) {
      setIsLoading(false);
      toast.error("Please select a mood");
      return;
    } else {
      addMoodLog({
        mood: currentMood,
        note: journalEntry,
        date: start.toISOString(),
        day: getDay(start).toString(),
      })
        .then(() => {
          setIsLoading(false);
          setIsModalOpen(false);
          setJournalEntry("");
          toast.success("Mood logged successfully");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Failed to log mood", {
            description: error.message,
          });
        });
    }
  };

  useEffect(() => {
    if (todayMoodLogs) {
      setCurrentMood(todayMoodLogs.mood || null);
      setJournalEntry(todayMoodLogs.note || "");
    }
  }, [todayMoodLogs]);

  return (
    <div className=" rounded-2xl px-8 pt-7 border border-border">
      <div className="text-sm font-medium text-muted-foreground mb-4">
        {todayMoodLogs ? (
          <span>Amazing work! Your journal entry for this day is done</span>
        ) : (
          <p>How are you feeling today? Let's reflect on your day with a journal entry.</p>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {moodIcons.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setIsModalOpen(true);
              setCurrentMood(m.id);
            }}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all w-[100px] cursor-pointer ${
              currentMood === m.id ? "bg-primary/20 scale-110" : "hover:bg-neutral-200 dark:hover:bg-muted"
            } ${todayMoodLogs && todayMoodLogs.mood === m.id ? "opacity-50 border border-primary" : ""}`}
            title={m.label}
          >
            <span className="text-3xl leading-none">{m.emoji}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{m.label}</span>
          </button>
        ))}
      </div>
      <div className="text-sm font-medium text-muted-foreground mb-4 justify-end flex pt-4">
        {todayMoodLogs && (
          <span className="flex items-center cursor-pointer" onClick={() => setIsModalOpen(true)}>
            Update your journal entry <Edit className="size-4 cursor-pointer ml-1 mt-1" />
          </span>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white dark:bg-indigo-950/95 rounded-xl shadow-xl p-6 w-full max-w-md mx-2 relative">
            <div className="flex items-center justify-end">
              <X
                className="size-4 cursor-pointer"
                onClick={() => {
                  setIsModalOpen(false);
                  if (!todayMoodLogs) {
                    setCurrentMood(null);
                    setJournalEntry("");
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold ">{todayMoodLogs && "Update"} Journal Entry</h3>

              <span className="text-3xl leading-none">{moodIcons.find((m) => m.id === currentMood)?.emoji}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              You seem to be feeling <span className="text-primary dark:text-purple-200 font-bold">{currentMood}</span> today!. Let's reflect on your
              day to organise your thought process.
            </p>
            <textarea
              className="w-full rounded-lg border border-border bg-muted px-3 py-2 mb-4 resize-none text-base focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your thoughts here..."
              rows={6}
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
            />
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  if (!todayMoodLogs) {
                    setCurrentMood(null);
                  }
                }}
                className="px-4 py-1 rounded-md text-sm bg-muted text-muted-foreground hover:bg-primary/10 transition-all cursor-pointer"
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleAddMoodLog();
                  // Optionally handle submit here:
                  // e.g. save to server or localStorage, then close modal

                  // Optionally, you might call a prop or callback
                }}
                className="px-4 py-1 rounded-md text-sm bg-primary text-white hover:bg-primary/90 transition-all cursor-pointer"
                type="button"
                disabled={isLoading || journalEntry.trim().length === 0}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
