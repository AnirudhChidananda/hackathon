"use client";

import { useEffect, useState } from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A donut chart with an active sector";

const chartDataa = [
  { habits: "Pending", progress: 1, fill: "var(--color-chrome)" },
  { habits: "Completed", progress: 1, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "progress",
  },
  safari: {
    label: "Pending",
    color: "#1A2A4F",
  },
  firefox: {
    label: "Completed",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RadialChart({ todayEntries, allHabits }: { todayEntries: any; allHabits: any }) {
  const [chartData, setChartData] = useState<any[]>(chartDataa);
  useEffect(() => {
    if (todayEntries && todayEntries.length > 0 && allHabits && allHabits.length > 0) {
      const completedHabits = todayEntries.filter((entry: any) => entry.completed).length;
      const totalHabits = allHabits.length;
      setChartData([
        { habits: "Pending", progress: totalHabits - completedHabits, fill: "var(--color-safari)" },
        { habits: "Completed", progress: completedHabits, fill: "var(--color-firefox)" },
      ]);
    }
  }, [todayEntries, allHabits]);
  return (
    // <Card className="flex flex-col">
    // <CardHeader className="items-center pb-0">
    //   <CardTitle>Pie Chart - Donut Active</CardTitle>
    //   <CardDescription>January - June 2024</CardDescription>
    // </CardHeader>
    <div>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="progress"
            nameKey="habits"
            innerRadius={60}
            strokeWidth={5}
            activeIndex={1}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => <Sector {...props} outerRadius={outerRadius + 5} />}
          >
            <Label
              content={({ viewBox }) => {
                const todayCompleted = todayEntries?.filter((entry: any) => entry.completed)?.length || 0;
                // const todayCompleted = 0;
                const totalHabits = allHabits?.length || 0;
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {todayCompleted}/{allHabits.length.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground mt-1">
                        {todayCompleted === 0 ? "Start Now!" : todayCompleted === totalHabits ? "Completed!" : "Today's progress"}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
