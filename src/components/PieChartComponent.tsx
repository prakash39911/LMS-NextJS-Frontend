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

  const CustomTooltipContent = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    return (
      <div className="bg-gray-700 p-3 rounded-lg border border-gray-600 shadow-lg">
        <div className="flex flex-col gap-2">
          <p className=" text-gray-300">Course Name</p>
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: data.fill }}
            />
            <p className="font-semibold text-white">{data.course_name}</p>
          </div>
        </div>
        <p className="text-gray-300 mt-2">
          Income: <span className="text-white ml-1">Rs.{data.totalIncome}</span>
        </p>
      </div>
    );
  };

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
            <ChartTooltip content={<CustomTooltipContent />} />
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
