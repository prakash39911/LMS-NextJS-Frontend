"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  course_name: {
    label: "Course",
  },
} satisfies ChartConfig;

export default function PieChartComponent({
  pieChartData,
}: {
  pieChartData: PieChartDataType[];
}) {
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const pieDataWithColors = pieChartData.map((entry, index) => ({
    ...entry,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <Card className="flex flex-col bg-gray-800 border border-gray-800 text-gray-300">
      <CardHeader className="items-center pb-0">
        <CardTitle>Courses & Income</CardTitle>
        <CardDescription className="text-gray-400">Overall</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[340px] pb-0 [&_.recharts-pie-label-text]:fill-white"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={pieDataWithColors}
              dataKey="totalIncome"
              nameKey="course_name"
              outerRadius={110}
              innerRadius={50}
              paddingAngle={4}
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
