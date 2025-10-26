"use client";

import AIHabitsPage from "./AI-habits";
import AIMeditationPage from "./AI-meditation";
import AIMotivationPage from "./AImotivation";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "@/components/animate-ui/components/radix/tabs";

function AIWellnessCoachPage() {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden p-6">
      <Tabs defaultValue="habits">
        <TabsList className="mb-4 border-b border-border bg-primary/10">
          <TabsTrigger className="text-sm font-semibold px-4 cursor-pointer" value="habits">
            Habits & Goals Coach
          </TabsTrigger>
          <TabsTrigger className="text-sm font-semibold px-4 cursor-pointer" value="meditation">
            Meditation Coach
          </TabsTrigger>
          <TabsTrigger className="text-sm font-semibold px-4 cursor-pointer" value="motivation">
            Motivation Coach
          </TabsTrigger>
        </TabsList>
        <TabsContents className="py-6">
          <TabsContent value="habits" className="flex flex-col gap-6">
            <AIHabitsPage />
          </TabsContent>
          <TabsContent value="meditation" className="flex flex-col gap-6">
            <AIMeditationPage />
          </TabsContent>
          <TabsContent value="motivation" className="flex flex-col gap-6">
            <AIMotivationPage />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  );
}

export default AIWellnessCoachPage;
