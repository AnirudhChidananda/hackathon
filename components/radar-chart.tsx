"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A radar chart with dots";

const chartData = [
  { month: "amazing", desktop: 5 },

  { month: "sad", desktop: 3 },
  { month: "okay", desktop: 4 },
  { month: "exhausted", desktop: 2 },

  { month: "good", desktop: 5 },
];

const chartConfig = {
  desktop: {
    label: "Mood",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartRadarDots() {
  return (
    <div className="">
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
