"use client";

import { Home, Calendar, BarChart3, User, Command, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { useClerk } from "@clerk/nextjs";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { signOut } = useClerk();
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "manage", label: "Habits & Goals", icon: User },
    { id: "calendar", label: "Streaks Calendar", icon: Calendar },
    { id: "analytics", label: "Performance", icon: BarChart3 },
    { id: "welness", label: "AI Wellness Coach", icon: Command },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo/Header */}

      <div className=" border-b border-sidebar-border flex flex-row items-center justify-between">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-sidebar-foreground">MindTrack</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">Wellness Tracker</p>
        </div>

        <div className="p-4  space-y-3 w-full flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/20"
              }`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4">
        <Button variant="outline" className="w-full cursor-pointer" onClick={() => signOut()}>
          <LogOut className="w-5 h-5 text-amber-200" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
