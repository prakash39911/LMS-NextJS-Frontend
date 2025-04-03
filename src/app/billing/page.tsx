import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function page() {
  const { sessionClaims, getToken } = await auth();
  const isTeacher = sessionClaims?.metadata.role === "teacher";
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = await getToken();

  if (isTeacher) redirect("/");

  const fetchedData = await fetch(
    `${API_END_POINT}api/updateuserdata/getPurchaseDetails`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const finalData = await fetchedData.json();

  return (
    <div className="flex gap-5 flex-col items-center p-10">
      <div className="mx-auto text-4xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-700">
        Billing
      </div>
      <div>
        <DataTable columns={columns} data={finalData?.data} />
      </div>
    </div>
  );
}
