"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashChart({
  chartData,
}: {
  chartData: ChartDataType[];
}) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    // Convert "DD-MM-YYYY" to "YYYY-MM-DD" for correct parsing
    const [day, month, year] = item.date.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    const date = new Date(formattedDate);

    console.log("Database date:", date);

    const todaysDate = new Date();
    console.log("Today's date:", todaysDate);

    const daysToSubtract = timeRange === "7d" ? 7 : 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysToSubtract);

    console.log("Start date:", startDate);

    return date >= startDate;
  });

  console.log("Filtered data", filteredData);

  return (
    <Card className="@container/card bg-gray-800 border border-gray-800">
      <CardHeader className="relative">
        <CardTitle className="text-gray-300">Courses Sold</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total for the last 1 month
          </span>
          <span className="@[540px]/card:hidden text-gray-400">
            Last 1 month
          </span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40 bg-transparent text-gray-300"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-gray-800 text-gray-400">
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                // Ensure correct date parsing by converting "DD-MM-YYYY" to "YYYY-MM-DD"
                const [day, month, year] = value.split("-");
                const formattedDate = `${year}-${month}-${day}`;
                const date = new Date(formattedDate);

                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    // Ensure correct date parsing by converting "DD-MM-YYYY" to "YYYY-MM-DD"
                    const [day, month, year] = value.split("-");
                    const formattedDate = `${year}-${month}-${day}`;
                    const date = new Date(formattedDate);

                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="courses_sold"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
