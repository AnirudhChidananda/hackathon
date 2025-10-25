// "use client";

// import * as React from "react";
// import { TrendingUp } from "lucide-react";
// import { Label, Pie, PieChart } from "recharts";

// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// export const description = "A donut chart with text";

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "var(--chart-1)",
//   },
//   safari: {
//     label: "Safari",
//     color: "var(--chart-2)",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "var(--chart-3)",
//   },
//   edge: {
//     label: "Edge",
//     color: "var(--chart-4)",
//   },
//   other: {
//     label: "Other",
//     color: "var(--chart-5)",
//   },
// } satisfies ChartConfig;

// export function RadialChart({ todayEntries, allHabits }: { todayEntries: any; allHabits: any }) {
//   const totalVisitors = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
//   }, []);

//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Pie Chart - Donut with Text</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
//           <PieChart>
//             <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//             <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
//                         <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
//                           {totalVisitors.toLocaleString()}
//                         </tspan>
//                         <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
//                           Visitors
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 leading-none font-medium">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
//       </CardFooter>
//     </Card>
//   );
// }

// xxxxxxx11123121312312312357128312312sadasdbsadbjsa

// "use client";

// import { Label, Pie, PieChart } from "recharts";
// import { Card, CardContent } from "@/components/ui/card";
// import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { useEffect, useState } from "react";

// const chartConfig = {
//   progress: {
//     label: "progress",
//   },
//   safari: {
//     label: "Pending",
//     color: "#1A2A4F",
//   },
//   firefox: {
//     label: "Completed",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig;

// const chartDataList = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];

// export function RadialChart({ todayEntries, allHabits }: { todayEntries: any; allHabits: any }) {
//   const [chartData, setChartData] = useState<any[]>(chartDataList);
//   useEffect(() => {
//     if (todayEntries && todayEntries.length > 0 && allHabits && allHabits.length > 0) {
//       const completedHabits = todayEntries.filter((entry: any) => entry.completed).length;
//       const totalHabits = allHabits.length;
//       setChartData([
//         { browser: "safari", progress: totalHabits - completedHabits, fill: "var(--color-safari)" },
//         { browser: "firefox", progress: completedHabits, fill: "var(--color-firefox)" },
//       ]);
//     }
//   }, [todayEntries, allHabits]);
//   return (
//     <CardContent className="flex-1 pb-0">
//       <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
//         <PieChart>
//           <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//           <Pie data={chartData} dataKey="progress" nameKey="browser" innerRadius={60}>
//             <Label
//               content={({ viewBox }) => {
//                 // const todayCompleted = todayEntries?.filter((entry: any) => entry.completed)?.length || 0;
//                 const todayCompleted = 0;
//                 const totalHabits = allHabits?.length || 0;
//                 if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                   return (
//                     <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
//                       <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
//                         {todayCompleted}/{allHabits.length.toLocaleString()}
//                       </tspan>
//                       <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground mt-1">
//                         {todayCompleted === 0 ? "Start Now!" : todayCompleted === totalHabits ? "Completed!" : "Today's progress"}
//                       </tspan>
//                     </text>
//                   );
//                 }
//               }}
//             />
//           </Pie>
//         </PieChart>
//       </ChartContainer>
//     </CardContent>
//   );
// }

// xxxxxxxxxxxxxxxxxxx
"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  // const [chartData, setChartData] = useState<any[]>(chartDataa);
  // useEffect(() => {
  //   if (todayEntries && todayEntries.length > 0 && allHabits && allHabits.length > 0) {
  //     const completedHabits = todayEntries.filter((entry: any) => entry.completed).length;
  //     const totalHabits = allHabits.length;
  //     setChartData([
  //       { habits: "Pending", progress: totalHabits - completedHabits, fill: "var(--color-safari)" },
  //       { habits: "Completed", progress: completedHabits, fill: "var(--color-firefox)" },
  //     ]);
  //   }
  // }, [todayEntries, allHabits]);
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
            data={chartDataa}
            dataKey="progress"
            nameKey="habits"
            innerRadius={60}
            strokeWidth={5}
            activeIndex={0}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => <Sector {...props} outerRadius={outerRadius + 10} />}
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
