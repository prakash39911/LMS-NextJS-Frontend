import React from "react";
import StatCard from "./StatCard";
import { BookOpen, Users, IndianRupee } from "lucide-react";
import DashChart from "./DashChart";
import {
  calTotalIncomeDashboard,
  calTotalStudentsDashboard,
  dashBoardChartData,
  formatDataForPieChart,
} from "@/lib/utilityFunctions";
import PieChartComponent from "./PieChartComponent";

export default function DashboardComponent({
  allDetails,
}: {
  allDetails: DashBoardDataType[];
}) {
  const chartData = dashBoardChartData(allDetails);
  const pieChartData = formatDataForPieChart(allDetails);

  return (
    <div className=" text-white p-6 lg:vertical-center">
      <div className="mx-auto flex-col">
        <div className="flex mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">
              Teacher Dashboard
            </h1>
            <p className="text-gray-400">Welcome back, Professor!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            title="Total Courses"
            value={allDetails.length}
            color="text-blue-500"
          />
          <StatCard
            icon={Users}
            title="Total Students"
            value={calTotalStudentsDashboard(allDetails)}
            color="text-green-500"
          />
          <StatCard
            icon={IndianRupee}
            title="Total Income"
            value={`Rs.${calTotalIncomeDashboard(allDetails)}`}
            color="text-yellow-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
          <DashChart chartData={chartData} />
          <PieChartComponent pieChartData={pieChartData} />
        </div>
      </div>
    </div>
  );
}
