import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import DashboardComponent from "@/components/DashboardComponent";

export default async function page() {
  const { sessionClaims, getToken } = await auth();
  const token = await getToken();

  const isStudent = sessionClaims?.metadata.role === "student";
  if (isStudent) redirect("/");

  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchData = await fetch(
    `${API_END_POINT}api/updateuserdata/getDashboardDetails`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!fetchData?.status) {
    return (
      <div className="flex items-center justify-center vertical-center text-gray-400 text-4xl">
        Error While Loading Data
      </div>
    );
  }

  const finalData = await fetchData.json();

  return <DashboardComponent allDetails={finalData?.data} />;
}
