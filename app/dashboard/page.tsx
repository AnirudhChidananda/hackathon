"use client";

import { useState, useEffect } from "react";
import Dashboard from "@/components/dashboard";
import { Calendar } from "@/components/calendar";
import { Analytics } from "@/components/analytics";
import { Profile } from "@/components/profile";
import { Sidebar } from "@/components/sidebar";
import { Onboarding } from "@/components/onboarding";
import AIWellnessCoachPage from "@/app/meditation/page";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(getToken({ template: "convex" }));
  // const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    if (onboardingComplete === "true") {
      setShowOnboarding(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case "calendar":
        return <Calendar />;
      case "analytics":
        return <Analytics />;
      case "manage":
        return <Profile />;
      case "welness":
        return <AIWellnessCoachPage />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 overflow-y-auto">{renderPage()}</main>
    </div>
  );
}
