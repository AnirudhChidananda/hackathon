"use client";

import { useState, useEffect } from "react";
import Dashboard from "@/components/dashboard";
import { Calendar } from "@/components/calendar";
import { Analytics } from "@/components/analytics";
import { Profile } from "@/components/profile";
import { Sidebar } from "@/components/sidebar";
import { Onboarding } from "@/components/onboarding";
import AIWellnessCoachPage from "@/components/Ai";
import DashNav from "@/components/DashNav";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    if (onboardingComplete === "true") {
      setShowOnboarding(false);
    }

    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   if (sidebarPage) {
  //     setCurrentPage(sidebarPage);
  //   }
  // }, [sidebarPage]);

  function handlePageChange(page: string) {
    setCurrentPage(page);
    localStorage.setItem("sidebarPage", page);
  }

  if (isLoading) {
    return null;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard setCurrentPage={handlePageChange} />;
      case "calendar":
        return <Calendar />;
      case "analytics":
        return <Analytics />;
      case "manage":
        return <Profile />;
      case "welness":
        return <AIWellnessCoachPage />;
      default:
        return <Dashboard setCurrentPage={handlePageChange} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content Area */}
      <main className="ml-0 sm:ml-0 md:ml-0 lg:ml-64 flex-1  overflow-y-auto">
        <DashNav currentPage={currentPage} onPageChange={handlePageChange} />
        {renderPage()}
      </main>
    </div>
  );
}
